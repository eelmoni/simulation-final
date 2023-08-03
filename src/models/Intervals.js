export default class Intervals {
  constructor() {
    this.one = [0, 0.59];
    this.second = [0.6, 0.99];
  }

  setClock(num) {
    this.currentValue = num;
  }

  // Gets random number between 0 and 0.99
  getRandomNumber() {
    return Math.random();
  }

  renderFirstRowHeader() {
    return (
      <th key={"clock"} rowSpan="2">
        Reloj
      </th>
    );
  }
}
