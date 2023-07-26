import { UNIFORM } from "./names";

export default class Uniform {
  constructor({ a, b, values }) {
    this.a = a;
    this.b = b;
    this.values = values || undefined;
    this.lastIndexUsed = 0;
  }

  // Gets distribution name
  getDistributionName() {
    return UNIFORM;
  }

  // Gets random number between 0 and 0.99
  getRandomNumber() {
    if (this.values && this.values.length) {
      let RND = this.values[this.lastIndexUsed];
      this.lastIndexUsed = this.lastIndexUsed + 1;

      return RND;
    }

    return Math.random();
  }

  // Calculate distribution value
  calculateDistribution() {
    const RND = this.getRandomNumber();

    return this.a + RND * (this.b - this.a);
  }
}
