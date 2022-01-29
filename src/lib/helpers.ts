import {
  Random,
  LogNormal,
  Geometric,
  Exponential,
  Distribution,
} from "./random";
import {
  CategoryTree,
  Category,
  defaultIncomeCategories,
  defaultExpenditureCategories,
  categoryList,
} from "./categories";
import { SimpleTransaction, Transaction } from "./transaction";

export class TransactionMaker {
  rng: Random;
  seen: Set<string>;
  cats: Category[];
  incs: Category[];
  payees: { [label: string]: string[] };
  last: Date;
  payeeDist: Distribution;
  timeDist: Distribution;
  spendDist: Distribution;
  incomeDist: Distribution;

  private readonly names: string[] = [
    "Zeus",
    "Jupiter",
    "Hera",
    "Juno",
    "Poseidon",
    "Neptune",
    "Cronos",
    "Saturn",
    "Uranus,",
    "Aphrodite",
    "Venus",
    "Hades",
    "Pluto",
    "Hephaistos",
    "Vulcan",
    "Demeter",
    "Ceres",
    "Apollo",
    "Athena",
    "Minerva",
    "Artemis",
    "Diana",
    "Ares",
    "Mars",
    "Hermes",
    "Mercury",
    "Dionysus",
    "Bacchus",
    "Persephone",
    "Eros",
    "Cupid",
    "Gaia",
  ];

  private adjs: string[] = [
    "Admiring",
    "Adoring",
    "Affectionate",
    "Agitated",
    "Amazing",
    "Angry",
    "Awesome",
    "Beautiful",
    "Blissful",
    "Bold",
    "Boring",
    "Brave",
    "Busy",
    "Charming",
    "Clever",
    "Cool",
    "Compassionate",
    "Competent",
    "Condescending",
    "Confident",
    "Cranky",
    "Crazy",
    "Dazzling",
    "Determined",
    "Distracted",
    "Dreamy",
    "Eager",
    "Ecstatic",
    "Elastic",
    "Elated",
    "Elegant",
    "Eloquent",
    "Epic",
    "Exciting",
    "Fervent",
    "Festive",
    "Flamboyant",
    "Focused",
    "Friendly",
    "Frosty",
    "Funny",
    "Gallant",
    "Gifted",
    "Goofy",
    "Gracious",
    "Great",
    "Happy",
    "Hardcore",
    "Heuristic",
    "Hopeful",
    "Hungry",
    "Infallible",
    "Inspiring",
    "Interesting",
    "Intelligent",
    "Jolly",
    "Jovial",
    "Keen",
    "Kind",
    "Laughing",
    "Loving",
    "Lucid",
    "Magical",
    "Mystifying",
    "Modest",
    "Musing",
    "Naughty",
    "Nervous",
    "Nice",
    "Nifty",
    "Nostalgic",
    "Objective",
    "Optimistic",
    "Peaceful",
    "Pedantic",
    "Pensive",
    "Practical",
    "Priceless",
    "Quirky",
    "Quizzical",
    "Recursing",
    "Relaxed",
    "Reverent",
    "Romantic",
    "Sad",
    "Serene",
    "Sharp",
    "Silly",
    "Sleepy",
    "Stoic",
    "Strange",
    "Stupefied",
    "Suspicious",
    "Sweet",
    "Tender",
    "Thirsty",
    "Trusting",
    "Unruffled",
    "Upbeat",
    "Vibrant",
    "Vigilant",
    "Vigorous",
    "Qizardly",
    "Qonderful",
    "Xenodochial",
    "Youthful",
    "Zealous",
    "Zen",
  ];

  constructor(seed: number) {
    this.rng = new Random(seed);
    this.seen = new Set<string>();
    this.cats = [...categoryList([], defaultExpenditureCategories)];
    this.incs = [...categoryList([], defaultIncomeCategories)];
    this.payees = {};
    this.last = new Date("2020-01-01");
    this.payeeDist = new Geometric(0.4);
    this.timeDist = new Exponential(1);
    this.spendDist = new LogNormal(3.5, 1.3);
    this.incomeDist = new LogNormal(7, 1.3);
  }

  makeLots(n : number) : Transaction[] {
    let txs : Transaction[] = [];
    for (let i = 0; i < n; ++i) {
        txs.push(this.make());
    }
    return txs;
  }

  make(): Transaction {
    let b: boolean = this.rng.random() < 0.85;
    let cat = this.rng.choose(b ? this.cats : this.incs);
    let tx: SimpleTransaction = {
      split: false,
      date: this.date(),
      payee: this.payee(cat),
      outgoing: b ? this.spend() : 0,
      incoming: b ? 0 : this.earn(),
      category: cat,
      reconciled: false,
    };
    return tx;
  }

  spend(): number {
    let x = 1 + this.spendDist.get(this.rng);
    return Math.floor(x * 100) / 100;
  }

  earn(): number {
    let x = 100 + this.incomeDist.get(this.rng);
    console.log(`x = ${x}`);
    return Math.floor(x);
  }

  date(): Date {
    let delta = this.timeDist.get(this.rng);
    this.last = new Date(this.last.getTime() + delta * 24 * 60 * 60 * 1000);
    return new Date(
      Date.UTC(
        this.last.getFullYear(),
        this.last.getMonth(),
        this.last.getDate()
      )
    );
  }

  payee(cat: Category): string {
    let lab = cat.join(": ");
    if (!(lab in this.payees)) {
      this.payees[lab] = [];
    }

    let payeelist = this.payees[lab];

    let n = this.payeeDist.get(this.rng);
    if (n < payeelist.length) {
      return payeelist[n];
    } else {
      let p = this.makePayee();
      payeelist.push(p);
      return p;
    }
  }

  makePayee(): string {
    for (let n = 0; n < 100; ++n) {
      let nm: string =
        this.rng.choose(this.names) +
        " " +
        this.rng.choose(this.adjs) +
        " Pty Ltd";
      if (!this.seen.has(nm)) {
        this.seen.add(nm);
        return nm;
      }
    }
    throw new Error(`name pool exhausted! (${this.names.length*this.adjs.length})`);
  }
}
