import { readFileSync } from "fs";

export interface Transaction {
    TRNTYPE: string,
    DTPOSTED: Date,
    DTUSER?: Date,
    DTAVAIL?: Date,
    TRNAMT: number,
    LOANPMTINFO?: string,
    FITID: string,
    NAME: string
};

export class OFX1 {
    headers: {[name: string]: string};

    constructor() {
        this.headers = {};
    }

    load(fileName: string) {
        let lines = readFileSync(fileName).toString('utf-8').split(/[\r]?\n/);

        let i = 0;
        while (i < lines.length && lines[i] != "") {
            if (lines[i] == '') {
                continue;
            }
            if (lines[i].startsWith('<')) {
                break;
            }
            const hdrRE = /([^:]+):(.*)/;
            let m = hdrRE.exec(lines[i]);
            if (!m) {
                throw new Error(`${fileName}:${i+1}: unable to parse header: "${lines[i]}"`);
            }
            this.headers[m[1]] = m[2];
            i += 1;
        }

        let transactions: any[] = [];

        let cur : null | {[name:string]:(string|Date|number)} = null;

        for (; i < lines.length; i += 1) {
            if (lines[i] == '') {
                continue;
            }
            const tagRE = /<([/]?)([^>]+)>(.*)/;
            let m = tagRE.exec(lines[i]);
            if (!m) {
                throw new Error(`${fileName}:${i+1}: unable to parse line: "${lines[i]}"`);
            }
            let isEnd : boolean = (m[1] == '/');
            let tag = m[2];
            let dat = m[3];
            switch (tag) {
                case 'STMTTRN': {
                    if (isEnd) {
                        transactions.push(cur);
                        cur = null;
                    } else {
                        cur = {};
                    }
                    break;
                }
                case 'DTPOSTED':
                case 'DTUSER':
                case 'DTAVAIL': {
                    if (cur != null) {
                        cur[tag] = this.makeDate(dat);
                        break;
                    }
                }
                case 'TRNAMT': {
                    if (cur != null) {
                        cur[tag] = this.makeNumber(dat);
                    }
                    break;
                }
                default: {
                    if (cur != null) {
                        cur[tag] = dat;
                    }
                    break;
                }
            }
        }
    }

    makeDate(txt: string) : Date {
        const basicRE = /(\d\d\d\d)(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)/;
        let m = basicRE.exec(txt);
        if (m) {
            return new Date(Number(m[1]), Number(m[2])-1, Number(m[3]), Number(m[4]), Number(m[5]), Number(m[6]));
        }
        throw new Error(`could not parse date: ${txt}`);
    }

    makeNumber(txt: string) : number {
        let x = Number(txt);
        if (Number.isFinite(x)) {
            return x;
        }
        throw new Error(`could not convert to number: ${txt}`);
    }
}
