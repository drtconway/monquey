import * as Categories from "../../src/lib/categories";

import * as mocha from "mocha";
import * as chai from "chai";
const expect = chai.expect;

describe("category tree tests", () => {
    let t : Categories.CategoryTree = {};

    it("empty category tree", () => {
        expect(t).to.eql({});
        expect([...Categories.categoryList([], t)]).to.eql([]);
    });
    it("add first category", () => {
        Categories.addCategory(t, ["Everyday Expenses"]);
        expect(Object.keys(t).length).to.eql(1);
        expect([...Categories.categoryList([], t)]).to.eql([["Everyday Expenses"]]);
    });
    it("add second category", () => {
        Categories.addCategory(t, ["Recurring Expenses"]);
        expect(Object.keys(t).length).to.eql(2);
        expect([...Categories.categoryList([], t)]).to.eql([["Everyday Expenses"],["Recurring Expenses"]]);
    });
    it("add first sub-category", () => {
        Categories.addCategory(t, ["Everyday Expenses", "Groceries"]);
        expect(Object.keys(t).length).to.eql(2);
        expect([...Categories.categoryList([], t)]).to.eql([["Everyday Expenses"], ["Everyday Expenses", "Groceries"], ["Recurring Expenses"]]);
    });
});