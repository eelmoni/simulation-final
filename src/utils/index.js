import pubsub from "pubsub.js";
import jstat from "jstat";

export const RESTAURAR = "restaurar";
export const MODIFICAR = "modificar";

/**
 fin_atencion_restaurar	"Uniforme x= 2 + RND . 8"	0 - 0,59
 fin_atencion_modificar	"Uniforme x= 1 + RND . 5"	0,60 - 0,99
*/

const intervals = {
  first: { from: 0, to: 0.59 },
  second: { from: 0.6, to: 0.99 },
};

export const getClientServiceType = () => {
  const RND = Math.random();
  let serviceType = undefined;

  if (RND >= intervals.first.from && RND <= intervals.first.to) {
    serviceType = RESTAURAR;
  } else if (RND >= intervals.second.from && RND <= intervals.second.to) {
    serviceType = MODIFICAR;
  }

  return serviceType;
};

export const isPair = (number) => {
  return number % 2 === 0;
};

export const pubSubEventNames = {
  renderHeaders: "renderHeaders",
  renderRow: "renderRow",
};

export const asyncPubsub = pubsub.newInstance({
  async: true,
});

// Función para calcular el valor Z basado en un nivel de confianza en porcentaje
export const zScoreForConfidence = (confidence) => { // roundedL, roundedLQ
  // El nivel de confianza debe estar entre 0 y 100
  if (confidence < 0 || confidence > 100) {
    throw new Error("El nivel de confianza debe estar entre 0 y 100.");
  }

  // Calcula el valor Z usando la función inversa de la distribución normal estándar
  const p = (1 + confidence / 100) / 2; // Calcula la probabilidad acumulativa correspondiente
  const zScore = jstat.normal.inv(p, 0, 1);

  return zScore;
};

export const calculateRO = ({ lambda, s, mu }) => {
  return lambda / (s * mu);
};

export const calculateL = ({ RO }) => {
  return RO / (1 - RO);
};

export const calculateLQ = ({ RO }) => {
  return (RO * RO) / (1 - RO);
};

export const calculateW = ({ RO, mu }) => {
  return 1 / (mu * (1 - RO));
};

export const calculateWQ = ({ RO, mu }) => {
  return RO / (mu * (1 - RO));
};

// const calcularIntervaloConfianza = (nivelConfianza, media, desviacion) => {
//   // Convertir el nivel de confianza a probabilidad
//   const probabilidad = (1 + nivelConfianza / 100) / 2;

//   // Calcular el valor Z correspondiente a la probabilidad
//   const zValue = jstat.normal.inv(probabilidad, 0, 1);

//   // Calcular el margen de error
//   const margenError = zValue * desviacion;

//   // Calcular el intervalo de confianza
//   const limiteInferior = media - margenError;
//   const limiteSuperior = media + margenError;

//   return [limiteInferior, limiteSuperior];
// }

/**
  P(X=k)=((e^−λ)⋅λ^k)/k!
  ​P(X=k) es la probabilidad de que lleguen k paquetes en un minuto dado.
  λ es la tasa promedio de llegada de paquetes por minuto (en este caso, 125 paquetes).
  k es el número de paquetes que queremos calcular la probabilidad.
  e es la base del logaritmo natural
 */

export const calcularCapacidadAlmacenamientoTemporal = (lambda, confidence) => {
  let decimalConfidence = confidence / 100;
  let k = 0;
  let cumulativeProbability = 0;

  while (cumulativeProbability < decimalConfidence) {
    cumulativeProbability = jstat.poisson.cdf(k, lambda);
    k++;
  }

  // console.log("Capacidad de almacenamiento temporal:", {lambda, confidence, k: k - 1, decimalConfidence});
  return k - 1;
}
