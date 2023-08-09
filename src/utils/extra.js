// Función para calcular la densidad de probabilidad de la distribución normal
function calcularDensidadNormal(x, media, desviacion) {
  return (1 / (desviacion * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * ((x - media) / desviacion) ** 2);
}

// Función para calcular el intervalo de confianza basado en valores Z
function calcularIntervaloConfianza(media, desviacion, nivelConfianza) {
  const zValue = jstat.normal.inv(1 - (1 - nivelConfianza) / 2, 0, 1);
  const margenError = zValue * desviacion;
  return [media - margenError, media + margenError];
}

// Parámetros ajustables
const nivelConfianza = 0.95;
const media = 0;
const desviacion = 1;

// Crear datos para la distribución normal y el intervalo de confianza
const step = 0.01;
const xValues = [];
const yNormalValues = [];
const yConfianzaValues = [];
const intervaloConfianza = calcularIntervaloConfianza(media, desviacion, nivelConfianza);
for (let i = media - 4 * desviacion; i < media + 4 * desviacion; i += step) {
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
const ctx = document.getElementById('myChart').getContext('2d');
new Chart(ctx, {
  type: 'line',
  data: {
      labels: xValues,
      datasets: [{
          label: `Distribución Normal\nMedia=${media}, Desviación=${desviacion}`,
          data: yNormalValues,
          fill: false,
          borderColor: 'blue'
      }, {
          label: `Nivel de Confianza ${nivelConfianza}`,
          data: yConfianzaValues,
          fill: '+1',
          backgroundColor: 'rgba(0, 128, 0, 0.2)',
          borderColor: 'transparent'
      }]
  },
  options: {
      title: {
          display: true,
          text: `Distribución Normal y Nivel de Confianza ${nivelConfianza}`
      },
      scales: {
          x: {
              title: {
                  display: true,
                  text: 'Valores'
              }
          },
          y: {
              title: {
                  display: true,
                  text: 'Densidad de Probabilidad'
              }
          }
      }
  }
});
