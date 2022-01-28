export class Random {
  private J: number;
  private j: number;
  private state: Uint32Array;

  constructor(seed: number) {
    this.J = 8;
    this.j = 0;
    this.state = new Uint32Array(this.J);
    for (let i = 0; i < this.J; ++i) {
      this.state[i] = seed + i;
    }
    for (let i = 0; i < 4 * this.J; ++i) {
      this.hash();
    }
  }

  bits(): number {
    return this.hash();
  }

  random(): number {
    let k = this.hash();
    let x = 0;
    for (let i = 0; i < 31; ++i) {
      x += k & 1;
      x = x / 2.0;
      k >>= 1;
    }
    return x;
  }

  between(lo: number, hi: number): number {
    let r = hi - lo;
    let u = this.random();
    return Math.floor(lo + r * u);
  }

  choose<T>(items: T[]): T {
    let i = this.between(0, items.length);
    return items[i];
  }

  shuffle<T>(items: T[]): T[] {
    const N = items.length;
    for (let i = 0; i < N; ++i) {
      let j = this.between(0, N);
      if (i != j) {
        let t = items[i];
        items[i] = items[j];
        items[j] = t;
      }
    }
    return items;
  }

  private hash() {
    this.state[this.j] *= 0xcc9e2d51;
    this.state[this.j] =
      (this.state[this.j] << 15) | (this.state[this.j] >> 17);
    this.state[this.j] *= 0x1b873593;
    let k = this.state[this.j];
    this.j = (this.j + 1) % this.J;
    this.state[this.j] ^= k;
    this.state[this.j] ^= this.state[this.j] >> 16;
    this.state[this.j] *= 0x85ebca6b;
    this.state[this.j] ^= this.state[this.j] >> 13;
    this.state[this.j] *= 0xc2b2ae35;
    this.state[this.j] ^= this.state[this.j] >> 16;
    return this.state[this.j];
  }
}

export interface Distribution {
  get(rng: Random): number;
}

export class Normal implements Distribution {
  mu: number;
  sigma: number;
  private saved: number[];

  constructor(mu: number, sigma: number) {
    this.mu = mu;
    this.sigma = sigma;
    this.saved = [];
  }

  get(rng: Random): number {
    if (this.saved.length == 0) {
      let u = 2 * rng.random() - 1;
      let v = 2 * rng.random() - 1;
      let w = u * u + v * v;
      while (w > 1) {
        u = 2 * rng.random() - 1;
        v = 2 * rng.random() - 1;
        w = u * u + v * v;
      }
      let z = Math.sqrt((-2 * Math.log(w)) / w);
      this.saved.push(this.mu + this.sigma * u * z);
      this.saved.push(this.mu + this.sigma * v * z);
    }
    return this.saved.pop() || Infinity;
  }
}

export class LogNormal implements Distribution {
    private norm : Normal;

    constructor(mu: number, sigma: number) {
        this.norm = new Normal(mu, sigma);
    }

  get(rng: Random): number {
    return Math.exp(this.norm.get(rng));
  }
}

export class Exponential implements Distribution {
  private lambda : number;

  constructor(lambda : number) {
    this.lambda = lambda;
  }

  get(rng: Random): number {
    return -Math.log(rng.random()) / this.lambda;
  }
}

export class Geometric implements Distribution {
  private logQ : number;

  constructor(p : number) {
    this.logQ = Math.log(1 - p);
  }

  get(rng : Random) : number {
    return Math.floor(Math.log(rng.random())/this.logQ);
  }
}