export default class Server {
  constructor({ state, name }) {
    if (!state) {
      throw new Error('state cannot be empty');
    }

    if (!name) {
      throw new Error('name cannot be empty');
    }

    this.state = state;
    this.name = name;
    this.horaInicioOcupadoAtendiendo = 0;
    this.acumuladorTiempoOcupadoAtendiendo = 0;
    this.horaInicioOcupado = 0;
    this.acumuladorTiempoOcupado = 0;
    this.horaInicioLibre = 0;
    this.acumuladorTiempoLibre = 0;
    this.tiempoRemanenteDeRoMDeInstrumento = 0;
  }

  static LIBRE = 'libre';
  static OCUPADO_ATENDIENDO = 'ocupado_atendiendo';
  static OCUPADO_RESTAURANDO = 'ocupado_restaurando';
  static OCUPADO_MODIFICANDO = 'ocupado_modificando';

  // Gets name
  getName() {
    return this.name;
  }

  // Sets state
  setState(state) {
    this.state = state;
  }

  // Gets state
  getState() {
    return this.state;
  }
}
