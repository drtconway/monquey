import * as Categories from './categories';

export interface BaseTransaction {
    date: Date,
    payee: string,
    outgoing: number,
    incoming: number,
    note?: string,
    reconciled: boolean,
    split: boolean,
};

export interface SimpleTransaction extends BaseTransaction {
    split: false,
    category: Categories.Category
};

export interface SplitTransaction extends BaseTransaction {
    split: true,
    splits: {category: Categories.Category, incoming: number, outgoing: number, note: string}[]
};

export type Transaction = SimpleTransaction | SplitTransaction;

export function makeTransaction() : Transaction {
    let tx : SimpleTransaction = {
        date: new Date(),
        payee: "",
        outgoing: 0,
        incoming: 0,
        reconciled: false,
        split: false,
        category: []
    };
    return tx;
}