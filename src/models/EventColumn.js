export default class EventColumn {
  constructor() {
    this.currentEvent = undefined;
  }

  setCurrentEvent(evt) {
    this.currentEvent = evt;
  }

  renderRow() {
    if (this.currentEvent === undefined) {
      return <td>Inicio</td>;
    }

    return <td>{this.currentEvent.getName()}</td>;
  }

  renderFirstRowHeader() {
    return (
      <th key={"eventsColumn"} rowSpan="2">
        Eventos
      </th>
    );
  }
}
