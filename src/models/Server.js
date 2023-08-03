import React from "react";

export default class Server {
  constructor({ state, name }) {
    if (!state) {
      throw new Error("state cannot be empty");
    }

    if (!name) {
      throw new Error("name cannot be empty");
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

  static LIBRE = "libre";
  static OCUPADO_ATENDIENDO = "ocupado_atendiendo";
  static OCUPADO_RESTAURANDO = "ocupado_restaurando";
  static OCUPADO_MODIFICANDO = "ocupado_modificando";

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

  renderFirstRowHeader() {
    return (
      <th key={`${this.name}`} colSpan={8}>
        {this.name}
      </th>
    );
  }

  renderSecondRowHeader() {
    return (
      <React.Fragment key={"secondHeaderServer"}>
        <th key={`server-estado`}>Estado</th>
        <th key={`server-hioa`}>Hora inicio ocupado atendiendo</th>
        <th key={`server-atoa`}>Acumulador tiempo ocupado atendiendo</th>
        <th key={`server-hio`}>Hora inicio ocupado</th>
        <th key={`server-ato`}>Acumulador tiempo ocupado</th>
        <th key={`server-hil`}>Hora inicio libre</th>
        <th key={`server-atl`}>Acumulador tiempo libre</th>
        <th key={`server-trdromdi`}>
          Tiempo remanente de R o M de instrumento
        </th>
      </React.Fragment>
    );
  }

  renderRow() {
    return (
      <React.Fragment key={"rerverDataRow"}>
        <td key={`server-estado`}>{this.state}</td>
        <td key={`server-hioa`}>{this.horaInicioOcupadoAtendiendo}</td>
        <td key={`server-atoa`}>{this.acumuladorTiempoOcupadoAtendiendo}</td>
        <td key={`server-hio`}>{this.horaInicioOcupado}</td>
        <td key={`server-ato`}>{this.acumuladorTiempoOcupado}</td>
        <td key={`server-hil`}>{this.horaInicioLibre}</td>
        <td key={`server-atl`}>{this.acumuladorTiempoLibre}</td>
        <td key={`server-trdromdi`}>
          {this.tiempoRemanenteDeRoMDeInstrumento}
        </td>
      </React.Fragment>
    );
  }
}
