import pubsub from "pubsub.js";

import { D } from "./distributions/index";

export default class SimulationEvent {
  constructor({
    distributionName,
    name,
    distributionParams,
    secondHeaders,
    isInitEvent = false,
  }) {
    if (!distributionName) {
      throw new Error("distributionName cannot be empty");
    }

    if (!name) {
      throw new Error("name cannot be empty");
    }

    this.distribution = new D[distributionName](distributionParams);
    this.name = name;
    this.secondHeaders = secondHeaders;
    this.distributionParams = distributionParams;
    this.isInitEvent = isInitEvent;
    this.NEXT_VALUE = undefined;
  }

  createEventChannel() {
    pubsub.subscribe(this.name, () => {
      console.log('Evento disparado', this.name);
    });
  }

  // Gets event name
  getName() {
    return this.name;
  }

  // Calculate and gets next distribution value
  calculateNextValue({ clockTime }) {
    const x = this.distribution.calculateDistribution();

    this.NEXT_VALUE = x + clockTime;
  }

  renderFirstRowHeader() {
    return (
      <th key={`event${this.name}`} colSpan={this.secondHeaders.length}>
        {this.name}
      </th>
    );
  }

  renderSecondRowHeader() {
    return (
      <>
        {this.secondHeaders.map((h, index) => (
          <th key={`${index}event${this.name}`}>{h}</th>
        ))}
      </>
    );
  }

  renderRow() {
    const distributionRow = this.distribution.renderRow();

    return (
      <>
        {distributionRow}
        <td>{this.NEXT_VALUE}</td>
      </>
    );
  }
}
