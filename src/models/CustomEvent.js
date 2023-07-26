import D from "./distributions/index";

export default class CustomEvent {
  constructor({ distributionName, name, distributionParams }) {
    if (!distributionName) {
      throw new Error('distributionName cannot be empty');
    }

    if (!name) {
      throw new Error('name cannot be empty');
    }

    this.distribution = new D[this.distributionName](distributionParams);
    this.name = name;
  }

  // Gets event name
  getName() {
    return this.name;
  }

  // Calculate and gets next distribution value
  getNextValue() {
    return this.distribution.calculateDistribution();
  }
}
