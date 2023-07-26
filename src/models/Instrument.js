export default class Instrument {
  constructor({ state, name }) {
    if (!state) {
      throw new Error('state cannot be empty');
    }

    if (!name) {
      throw new Error('name cannot be empty');
    }

    this.state = state;
    this.name = name;
  }

  static EN_COLA_RESTAURAR = 'en_cola_restaurar';
  static EN_COLA_MODIFICAR = 'en_cola_modificar';
  static SIENDO_MODIFICADO = 'siendo_modificado';
  static SIENDO_RESTAURADO = 'siendo_restaurado';
  static SUSPENDIDO = 'suspendido';

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
