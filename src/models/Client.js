export default class Client {
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

  static EN_COLA = 'en_cola';
  static SIENDO_ATENDIDO = 'siendo_atendido';
  static PENDIENTE_RETIRO = 'pendiente_retiro';

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
