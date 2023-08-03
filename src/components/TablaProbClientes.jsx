import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Grid } from "@nextui-org/react";

function TablaProbClientes({ RO, cantidadClientes }) {
  // Generar filas y calcular los valores de P(N<k) y P(N>=k)
  const filas = [];
  for (let i = 0; i < cantidadClientes; i++) {
    const P_N_k = 1 - Math.pow(RO, i);
    const P_N_ge_k = Math.pow(RO, i);

    filas.push(
      <tr key={i}>
        <td>{i}</td>
        <td>p{i}</td>
        <td>{P_N_ge_k}</td>
        <td>{P_N_k}</td>
      </tr>
    );
  }

  const chartRef = useRef(null);

  useEffect(() => {
    if (!RO || !cantidadClientes) return;

    const labels = [];
    const dataP_N_ge_k = [];
    const dataP_N_k = [];

    for (let i = 0; i < cantidadClientes; i++) {
      const P_N_ge_k = Math.pow(RO, i);
      const P_N_k = 1 - Math.pow(RO, i);

      labels.push(`p${i}`);
      dataP_N_ge_k.push(P_N_ge_k.toFixed(4));
      dataP_N_k.push(P_N_k.toFixed(4));
    }

    const ctx = chartRef.current.getContext("2d");
    const config = {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "P(N>=k)",
            data: dataP_N_ge_k,
            borderColor: "blue",
            backgroundColor: "rgba(0, 0, 255, 0.2)",
          },
          {
            label: "P(N<k)",
            data: dataP_N_k,
            borderColor: "green",
            backgroundColor: "rgba(0, 0, 255, 0.2)",
          }
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            suggestedMax: 1,
          },
        },
      },
    };

    // Crear el gráfico y guardar la referencia
    const chart = new Chart(ctx, config);

    // Limpiar el gráfico al desmontar el componente
    return () => {
      chart.destroy();
    };
  }, [RO, cantidadClientes]);

  if (!RO || !cantidadClientes) return null;

  return (
    <>
      <Grid xs={12} md={6}>
        <table>
          <thead>
            <tr>
              <th>{"n"}</th>
              <th>{"Pn"}</th>
              <th>{"P(N>=k)"}</th>
              <th>{"P(N<k)"}</th>
            </tr>
          </thead>
          <tbody>{filas}</tbody>
        </table>
      </Grid>
      <Grid xs={12} md={6}>
        <canvas ref={chartRef}></canvas>
      </Grid>
    </>
  );
}

export default TablaProbClientes;
