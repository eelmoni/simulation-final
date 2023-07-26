export default class Statistics {
  constructor() {
    this.cantidadDeInstrumentosEnTaller = 0;
    this.tiempoAcumuladoDePermanenciaDeInstrumentosEnElTaller = 0;
  }

  // Gets Statistics
  getStatistics() {
    return {
      cantidadDeInstrumentosEnTaller: this.cantidadDeInstrumentosEnTaller,
      tiempoAcumuladoDePermanenciaDeInstrumentosEnElTaller: this.tiempoAcumuladoDePermanenciaDeInstrumentosEnElTaller
    };
  }

  increaseCantidadInstrumentos() {
    this.cantidadDeInstrumentosEnTaller = this.cantidadDeInstrumentosEnTaller + 1;
  }

  increaseTiempoAcumuladoDePermanencia(num) {
    this.tiempoAcumuladoDePermanenciaDeInstrumentosEnElTaller = this.tiempoAcumuladoDePermanenciaDeInstrumentosEnElTaller + num;
  }
}
