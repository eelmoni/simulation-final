import Clock from "./Clock";
import Statistics from "./Statistics";

export default class Simulation {
  constructor() {
    this.events = [];
    this.clock = new Clock();
    this.statistics = new Statistics();
  }

  setEvent(evt) {
    this.events.push(evt);
  }

  getStatistics() {
    return this.statistics;
  }

  execute() {}
}
