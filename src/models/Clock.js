export default class Clock {
  constructor() {
    this.currentValue = 0;
  }

  setClock(num) {
    this.currentValue = num;
  }

  getClockTime() {
    return this.currentValue;
  }

  renderFirstRowHeader() {
    return (<th key={'clock'} rowSpan="2">Reloj</th>);
  }

  renderRow() {
    return (<td key={'clock'}>{this.currentValue}</td>);
  }
}
