import * as Helpers from "../../src/lib/helpers";

import * as mocha from "mocha";
import * as chai from "chai";
import { SimpleTransaction } from "../../src/lib/transaction";
const expect = chai.expect;

describe("test dates", () => {
  let X = new Helpers.TransactionMaker(19);
  it("make a date", () => {
    let d: Date = X.date();
    expect(d).to.be.lessThan(new Date());
  });
  it("check dates are generated in order", () => {
    let d1 = X.date();
    let d2 = X.date();
    expect(d1).to.be.lessThan(d2);
  });
});

describe("test payee", () => {
  let X = new Helpers.TransactionMaker(18);
  let cat = ["Groceries", "Supermarket"];
  it("make a payee", () => {
    let p = X.payee(cat);
    expect(p).to.eql("Artemis Kind Pty Ltd");
  });
  it("check we get repeats", () => {
    let seen: { [payee: string]: number } = {};
    for (let i = 0; i < 20; ++i) {
      let p: string = X.payee(cat);
      if (!(p in seen)) {
        seen[p] = 0;
      }
      seen[p] += 1;
    }
    const expected: { [payee: string]: number } = {
      "Hades Modest Pty Ltd": 8,
      "Artemis Kind Pty Ltd": 6,
      "Neptune Cranky Pty Ltd": 4,
      "Artemis Tender Pty Ltd": 1,
      "Ceres Great Pty Ltd": 1,
    };
    expect(Object.keys(seen).sort()).to.eql(Object.keys(expected).sort());
    for (let p in expected) {
      expect(seen[p]).to.eql(expected[p]);
    }
  });
  it("make lots to get dups", () => {
    expect(() => {
      for (let i = 0; i < 4000; ++i) {
        let p = X.makePayee();
      }
    }).to.throw("name pool exhausted! (3456)");
  });
});

describe("test amounts", () => {
  let X = new Helpers.TransactionMaker(17);
  it("get a spend amount", () => {
    let x = X.spend();
    expect(x).to.eql(111.35);
  });
  it("get an earn amount", () => {
    let x1 = X.earn();
    expect(x1).to.eql(448);
    let x2 = X.earn();
    expect(x2).to.eql(838);
  });
});

describe("test simple transactions", () => {
  let X = new Helpers.TransactionMaker(17);
  it("make a transaction", () => {
    let tx = X.make();
    let expected: SimpleTransaction = {
      split: false,
      date: new Date(Date.UTC(2020, 0, 2)),
      payee: "Hades Busy Pty Ltd",
      outgoing: 4605.13,
      incoming: 0,
      category: ["Children", "Childcare"],
      reconciled: false,
    };
    expect(tx).to.eql(expected);
  });
  it("check we get income and expenses", () => {
      let earn = 0;
      let spend = 0;
      for (let i = 0; i < 100; ++i) {
          let tx = X.make();
          if (tx.incoming > 0) {
            earn += 1;
          }
          if (tx.outgoing > 0) {
              spend += 1;
          }
      }
      expect(earn).to.eql(12);
      expect(spend).to.eql(88);
  });
});
