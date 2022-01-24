import * as OFX from "../../src/lib/ofx";

import * as mocha from "mocha";
import * as chai from "chai";
const expect = chai.expect;

import { readFileSync } from "fs";
import * as path from "path";

describe("load OFX1 data", () => {
    let ofx = new OFX.OFX1();
    it("load", () => {
        ofx.load(path.join(__dirname, "../data/transactions-ofx1.ofx"));
    });
});