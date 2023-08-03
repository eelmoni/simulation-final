import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import pubsub from "pubsub.js";

import Simulation from "./models/Simulation.js";
import { VariablesForm } from "./components/VariablesForm.jsx";
import { pubSubEventNames } from "./utils";

import "./App.css";

function App() {
  // Table components:
  const [firstRowHeaders, setFirstRowHeaders] = React.useState([]);
  const [secondRowHeaders, setSecondRowHeaders] = React.useState([]);
  const [rows, setRows] = React.useState([]);

  const sim = React.useMemo(() => {
    return new Simulation();
  }, []);

  const handleSimulationInit = (data) => {
    pubsub.publish("init", [data]);
  };

  React.useEffect(() => {
    const initSimSubscriber = pubsub.subscribe("init", (data) => {
      sim.execute(data);
    });

    return () => {
      pubsub.unsubscribe(initSimSubscriber);
    };
  }, [sim]);

  React.useEffect(() => {
    const s = pubsub.subscribe(pubSubEventNames.renderHeaders, (fh, sh) => {
      setFirstRowHeaders(fh);
      setSecondRowHeaders(sh);
    });

    return () => {
      pubsub.unsubscribe(s);
    };
  }, []);

  React.useEffect(() => {
    const s = pubsub.subscribe(pubSubEventNames.renderRow, (r) => {
      console.log('R', r);
      let newCopy = [...rows];
      newCopy.push(r);

      setRows(newCopy);
    });

    return () => {
      pubsub.unsubscribe(s);
    };
  }, [rows]);

  // console.log('FIRST: ', firstRowHeaders);
  console.log('ROWS: ', rows);

  return (
    <NextUIProvider>
      <VariablesForm onSimulationInit={handleSimulationInit} />
      <table>
        <thead key="thead">
          <tr key="1">
            {firstRowHeaders}
            {/* <th rowspan="2">Eventos</th>
            <th rowspan="2">Reloj</th>
            <th colspan="3">Llegada cliente</th>
            <th colspan="3">TERCERO</th> */}
          </tr>
          <tr key="2">
            {secondRowHeaders}
            {/* <th>RND</th>
            <th>Tiempo</th>
            <th>Proxima Llegada</th>
            <th>3</th>
            <th>3</th>
            <th>3</th> */}
          </tr>
        </thead>
        <tbody key="tbody">
          {rows.map((r) => {
            return (<tr>{r}</tr>);
          })}
          {/* <tr>
            <td>event</td>
            <td>reloj</td>
            <td>rnd</td>
            <td>tiempo</td>
            <td>prox</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
          </tr>
          <tr>
            <td>event</td>
            <td>reloj</td>
            <td>rnd</td>
            <td>tiempo</td>
            <td>prox</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
          </tr> */}
        </tbody>
      </table>
    </NextUIProvider>
  );
}

export default App;

/**
 * cantidad de simulaciones (filas)
 * cantidad de lineas que se van a mostrar y a partir de que linea se van a mostrar
 */
