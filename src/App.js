import * as React from "react";
import {
  NextUIProvider,
  Container,
  Grid,
  Text,
  Spacer,
} from "@nextui-org/react";

import "./App.css";
import LeyLittleForm from "./components/LeyLittleForm.jsx";
import LeyLittleTable from "./components/LeyLittleTable.jsx";
import TablaProbClientes from "./components/TablaProbClientes.jsx";

import {
  // zScoreForConfidence,
  calculateRO,
  calculateL,
  calculateLQ,
  calculateW,
  calculateWQ,
  calcularCapacidadAlmacenamientoTemporal
} from "./utils";
// import GraficoDistribucionNormal from "./components/GraficoDistribucionNormal";
// import Grafico from "./components/Grafico_Version2";
import Grafico from "./components/Grafico_Version3";

function App() {
  const [info, setInfo] = React.useState({});

  const handleSimulationInit = (data) => {
    const { cantidadServidores, lambda, mu, nivelConfianza, cantidadClientes } =
      data;

    const RO = calculateRO({ lambda, s: cantidadServidores, mu });
    const L = calculateL({ RO });
    const LQ = calculateLQ({ RO });
    const W = calculateW({ RO, mu });
    const WQ = calculateWQ({ RO, mu });

    // const Z = zScoreForConfidence(nivelConfianza);
    const capacidadTemporalAlmacenamiento = calcularCapacidadAlmacenamientoTemporal(lambda, nivelConfianza);
    // const capacidadTemporalAlmacenamiento = Math.ceil(Z);

    setInfo({
      RO,
      L,
      LQ,
      W,
      WQ,
      // Z,
      capacidadTemporalAlmacenamiento,
      nivelConfianza,
      lambda,
      mu,
      cantidadClientes,
    });
  };

  const ROText = () => {
    if (!info.RO) return null;

    if (info.RO < 1) {
      return (
        <Text size={"$2xl"}>
          El valor de ρ (rho) es menor a 1, por lo tanto el sistema se
          estabiliza.
        </Text>
      );
    }

    return (
      <Text size={"$2xl"}>
        El valor de ρ (rho) es mayor o igual a 1, por lo tanto el sistema NO se
        estabiliza.
      </Text>
    );
  };

  const NivelDeConfianzaText = () => {
    if (
      !info.nivelConfianza ||
      !info.LQ ||
      !info.capacidadTemporalAlmacenamiento
    )
      return null;

    const roundedLQ = Math.ceil(info.LQ);
    // const roundedL = Math.ceil(info.L);

    return (
      <>
        <Text size={"$2xl"}>
          {`Sin tomar en cuenta el nivel de confianza, la capacidad de almacenamiento temporal es de ${roundedLQ} paquete/s.`}
        </Text>
        <Spacer y={1} />
        <Text size={"$2xl"}>
          {`Para un nivel de confianza ${info.nivelConfianza}%, la capacidad de almacenamiento temporal es de ${info.capacidadTemporalAlmacenamiento} paquete/s.`}
        </Text>
      </>
    );
  };

  return (
    <NextUIProvider>
      <Container>
        <Grid.Container gap={2}>
        <Grid xs={12} md={12}>
            <Text h2>Enunciado</Text>
          </Grid>
          <Grid xs={12} md={12}>
            <Text size={"$2xl"}>
              Llega un promedio de 125 paquetes de información por minuto a un
              selector de vía para Internet. Se requiere un promedio de .002
              segundos para procesar un paquete de información. El selector de
              vía para Internet debe tener una memoria para almacenar los
              paquetes antes de ser procesados, cualquier paquete que llegue y
              no encuentre lugar, se pierde. Determine la capacidad
              almacenamiento temporal (en cantidad de paquetes) del selector de
              vía para no perder ningún paquete con una confianza del 99,99 %.
            </Text>
          </Grid>
          <Grid xs={12} md={4}>
            <LeyLittleForm onFormSubmit={handleSimulationInit} />
          </Grid>
          <Grid xs={12} md={8}>
            <LeyLittleTable
              L={info.L}
              LQ={info.LQ}
              W={info.W}
              WQ={info.WQ}
              RO={info.RO}
              lambda={info.lambda}
              mu={info.mu}
            />
          </Grid>
          <Grid xs={12} md={8} direction="column">
            <Text h4>Conclusiones</Text>
            <Spacer y={1} />
            <ROText />
            <Spacer y={1} />
            <NivelDeConfianzaText />
            <Spacer y={1} />
            <Grafico lambda={info.lambda} k={info.capacidadTemporalAlmacenamiento} />
            {/* <GraficoDistribucionNormal
              zScore={info.Z}
              nivelConfianza={info.nivelConfianza}
            /> */}
          </Grid>
          <Grid xs={12} md={12}>
            <TablaProbClientes
              RO={info.RO}
              cantidadClientes={info.cantidadClientes}
            />
          </Grid>
        </Grid.Container>
      </Container>
    </NextUIProvider>
  );
}

export default App;
