import React, { useEffect, useRef } from "react";
import jstat from "jstat";
import Chart from "chart.js/auto";

// Función para calcular la densidad de probabilidad de la distribución normal
const calcularDensidadNormal = (x, media, desviacion) => {
  return (
    (1 / (desviacion * Math.sqrt(2 * Math.PI))) *
    Math.exp(-0.5 * ((x - media) / desviacion) ** 2)
  );
};

// Función para calcular el intervalo de confianza basado en valores Z
const calcularIntervaloConfianza = (nivelConfianza, media, desviacion) => {
  const probabilidad = (1 + nivelConfianza / 100) / 2;
  const zValue = jstat.normal.inv(probabilidad, 0, 1);
  const margenError = zValue * desviacion;
  const limiteInferior = media - margenError;
  const limiteSuperior = media + margenError;
  return [limiteInferior, limiteSuperior];
};

function GraficoVersion2() {
  const chartRef = useRef(null);

  useEffect(() => {
    // Parámetros ajustables
    const nivelConfianza = 95; // 95% de confianza
    const media = 100;
    const desviacion = 15;

    // Crear datos para la distribución normal y el intervalo de confianza
    const step = 0.5;
    const xValues = [];
    const yNormalValues = [];
    const yConfianzaValues = [];
    const intervaloConfianza = calcularIntervaloConfianza(
      nivelConfianza,
      media,
      desviacion
    );
    for (
      let i = media - 4 * desviacion;
      i < media + 4 * desviacion;
      i += step
    ) {
      xValues.push(i);
      yNormalValues.push(calcularDensidadNormal(i, media, desviacion));

      // Calcular valores para la región de confianza
      if (i >= intervaloConfianza[0] && i <= intervaloConfianza[1]) {
        yConfianzaValues.push(calcularDensidadNormal(i, media, desviacion));
      } else {
        yConfianzaValues.push(null);
      }
    }

    // Configurar el gráfico
    const ctx = document.getElementById("chart2").getContext("2d");
    const config = {
      type: "line",
      data: {
        labels: xValues,
        datasets: [
          {
            label: `Distribución Normal\nMedia=${media}, Desviación=${desviacion}`,
            data: yNormalValues,
            fill: false,
            borderColor: "blue",
          },
          {
            label: `Intervalo de Confianza ${nivelConfianza}%`,
            data: yConfianzaValues,
            fill: "+1",
            backgroundColor: "rgba(0, 128, 0, 0.2)",
            borderColor: "transparent",
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: `Distribución Normal y Intervalo de Confianza ${nivelConfianza}%`,
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Valores",
            },
          },
          y: {
            title: {
              display: true,
              text: "Densidad de Probabilidad",
            },
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
  }, []);

  return <canvas ref={chartRef} id="chart2"></canvas>;
}

export default GraficoVersion2;
