import React, { useEffect, useRef } from "react";
import jstat from "jstat";
import Chart from "chart.js/auto";

function GraficoVersion3({ lambda, k }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!lambda || !k) return;

    const poissonData = [];
    for (let i = 0; i <= k; i++) {
      poissonData.push(jstat.poisson.pdf(i, lambda));
    }

    // Configurar el gráfico
    const ctx = document.getElementById("chart2").getContext("2d");
    const config = {
      type: "bar",
      data: {
        labels: Array.from({ length: k + 1 }, (_, i) => i.toString()),
        datasets: [
          {
            label: "Probabilidad de llegada de paquetes",
            data: poissonData,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
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
  }, [k, lambda]);

  if (!lambda || !k) return null;

  return <canvas ref={chartRef} id="chart2"></canvas>;
}

export default GraficoVersion3;
