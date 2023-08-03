import React, { useEffect, useRef } from "react";
import jstat from "jstat";
import Chart from "chart.js/auto";

function GraficoDistribucionNormal({ zScore, nivelConfianza }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!zScore || !nivelConfianza) return;

    // Calcular los valores Z para los límites del intervalo de confianza
    const lowerZ = -zScore;
    const upperZ = zScore;

    const data = [];
    for (let x = -4; x <= 4; x += 0.001) {
      const pdfValue = jstat.normal.pdf(x, 0, 1);
      data.push({ x, y: pdfValue });
    }

    // Configurar y renderizar el gráfico
    const ctx = chartRef.current.getContext("2d");
    const config = {
      type: "line",
      data: {
        datasets: [
          {
            label: "Distribución Normal",
            data: data,
            borderColor: "blue",
            fill: false,
            pointRadius: 0,
          },
          {
            label: `Nivel de Confianza ${nivelConfianza}%`,
            data: data.filter(
              (point) => point.x >= lowerZ && point.x <= upperZ
            ),
            borderColor: "green",
            backgroundColor: "rgba(0, 255, 0, 0.2)",
            fill: true,
            pointRadius: 0,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: "linear",
            position: "bottom",
          },
          y: {
            beginAtZero: true,
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
  }, [nivelConfianza, zScore]);

  if (!zScore || !nivelConfianza) return null;

  return <canvas ref={chartRef} id="chart"></canvas>;
}

export default GraficoDistribucionNormal;
