import { NEGATIVE_EXPONENTIAL } from "./names";

export default class NegativeExponential {
  constructor({ mu, lambda, values }) {
    this.mu = mu || undefined;
    this.lambda = lambda || undefined;
    this.values = values || undefined;
    this.lastIndexUsed = 0;
  }

  // Gets distribution name
  getDistributionName() {
    return NEGATIVE_EXPONENTIAL;
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
    let x = undefined;

    if (this.mu) {
      x = -this.mu * Math.log(1 - RND);
    } else if (this.lambda) {
      x = (-1 / this.lambda) * Math.log(1 - RND);
    }

    return x;
  }
}
