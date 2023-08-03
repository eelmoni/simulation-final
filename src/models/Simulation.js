import pubsub from "pubsub.js";

import Clock from "./Clock";
import Statistics from "./Statistics";
import SimulationEvent from "./SimulationEvent";
import { pubSubEventNames } from "../utils";
import Queue from "./Queue";
import Server from "./Server";
import EventColumn from "./EventColumn";

export default class Simulation {
  constructor() {
    this.events = [];
    this.clock = new Clock();
    this.statistics = new Statistics();
    this.currentRow = 1;

    // Event Column
    this.eventColumn = new EventColumn();

    // Define Entities
    this.clients = [];
    this.instruments = [];

    // Define Queues
    this.queu_clientes = new Queue({ name: "cola_clientes" });
    this.queu_restaurar = new Queue({ name: "cola_restaurar" });
    this.queu_modificar = new Queue({ name: "cola_modificar" });

    // Define Server
    this.server = new Server({ state: Server.LIBRE, name: "Luthier" });
  }

  setEvent(evt) {
    this.events.push(evt);
  }

  getStatistics() {
    return this.statistics;
  }

  execute(data) {
    const { events, simulationParams } = data;

    // Init events objets
    this.events = Object.values(events).map((evt) => {
      return new SimulationEvent(evt);
    });

    // Build first row headers
    const firstRowHeaders = [
      this.eventColumn.renderFirstRowHeader(),
      this.clock.renderFirstRowHeader(),
    ];

    // Build second row headers
    const secondRowHeaders = [];

    this.events.forEach((evt) => {
      evt.createEventChannel();
      firstRowHeaders.push(evt.renderFirstRowHeader());
      secondRowHeaders.push(evt.renderSecondRowHeader());
    });

    firstRowHeaders.push(this.queu_clientes.renderFirstRowHeader());
    firstRowHeaders.push(this.queu_restaurar.renderFirstRowHeader());
    firstRowHeaders.push(this.queu_modificar.renderFirstRowHeader());

    firstRowHeaders.push(this.server.renderFirstRowHeader());
    secondRowHeaders.push(this.server.renderSecondRowHeader());

    pubsub.publish(pubSubEventNames.renderHeaders, [
      firstRowHeaders,
      secondRowHeaders,
    ]);

    const initEvent = this.events.filter((evt) => {
      return evt.isInitEvent === true;
    })[0];

    const {
      cantidad_simulaciones,
      cantidad_simulaciones_a_mostrar,
      numero_de_fila_inicial_a_mostrar,
    } = simulationParams;

    while (this.currentRow <= cantidad_simulaciones) {
      let simulationRow = [];

      if (this.currentRow === 1) {
        simulationRow.push(this.eventColumn.renderRow());
        simulationRow.push(this.clock.renderRow());

        this.events.forEach(evt => {
          if (evt.isInitEvent === true) {
            evt.calculateNextValue({ clockTime: this.clock.getClockTime() });
          }
        });

        this.events.forEach(evt => {
          simulationRow.push(evt.renderRow());
        });

        simulationRow.push(this.queu_clientes.renderRow());
        simulationRow.push(this.queu_restaurar.renderRow());
        simulationRow.push(this.queu_modificar.renderRow());

        simulationRow.push(this.server.renderRow());
      } else {
        simulationRow.push(this.eventColumn.renderRow());
        simulationRow.push(this.clock.renderRow());
      }

      console.log('RENDER ROW', this.currentRow);
      pubsub.publish(pubSubEventNames.renderRow, [simulationRow]);

      this.currentRow++;
    }
  }
}

// En cada vuelta del ciclo
/*
  - Calculo tiempo reloj
*/

// llegada_cliente
/**
 si Server está libre:
  - Calcular la distribucion de llegada cliente
  - Calcular la distribucion de fin atencion cliente
 sino, si Server está ocupado:
  - 

*/


/**
 - 1 Instancia columna evento
 - 1 Instancia Reloj
 - 1 instancia por cada evento
 - 1 instancia por cada cola
 - 1 instancia del objeto que encapsula intervalos
 - 1 instancia de Servidor
 - 1 instancia de estadisticas
 - N instancias de Entidades
 */