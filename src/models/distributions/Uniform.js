import { UNIFORM } from "./names";

export default class Uniform {
  constructor({ a, b, values }) {
    this.a = a;
    this.b = b;
    this.values = values || undefined;
    this.lastIndexUsed = 0;
    this.RND = undefined;
    this.X = undefined;
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
    const x = this.a + RND * (this.b - this.a);

    this.RND = RND;
    this.X = x;

    return x;
  }

  renderRow() {
    return (
      <>
        <td>{this.RND}</td>
        <td>{this.X}</td>
      </>
    );
  }
}
