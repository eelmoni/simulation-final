import { isPair } from "../../utils";
import { NORMAL_BOX_MULLER } from "./names";

export default class Normal {
  constructor({ sigma, mu, values }) {
    this.mu = mu || undefined;
    this.sigma = sigma || undefined;
    this.values = values || undefined;
    this.lastIndexUsed = 0;
    this.useCOS = true;
    this.counter = 1;
    this.RND1 = undefined;
    this.RND2 = undefined;
  }

  // Gets distribution name
  getDistributionName() {
    return NORMAL_BOX_MULLER;
  }

  // Gets two random number between 0 and 0.99
  getRandomNumber() {
    // 1
    // 2 los mismos
    // 3
    // 4 los mismos
    if (!!this.RND1 && !!this.RND2 && isPair(this.counter)) {
      this.counter = this.counter + 1;

      return [this.RND1, this.RND2];
    }

    if (this.values && this.values.length) {
      this.RND1 = this.values[this.lastIndexUsed];
      this.RND2 = this.values[this.lastIndexUsed + 1];

      this.lastIndexUsed = this.lastIndexUsed + 2;
    } else {
      this.RND1 = Math.random();
      this.RND2 = Math.random();
    }

    this.counter = this.counter + 1;

    return [this.RND1, this.RND2];
  }

  // Calculate distribution value
  calculateDistribution() {
    const [RND1, RND2] = this.getRandomNumber();
    let x = undefined;

    if (this.useCOS) {
      x =
        Math.sqrt(-2 * Math.log(RND1)) *
          Math.cos(2 * Math.PI * RND2) *
          this.sigma +
        this.mu;
      this.useCOS = false;
    } else {
      x =
        Math.sqrt(-2 * Math.log(RND1)) *
          Math.sin(2 * Math.PI * RND2) *
          this.sigma +
        this.mu;
      this.useCOS = true;
    }

    return x;
  }
}
