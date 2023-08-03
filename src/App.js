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

import {
  zScoreForConfidence,
  calculateRO,
  calculateL,
  calculateLQ,
  calculateW,
  calculateWQ,
} from "./utils";
import GraficoDistribucionNormal from "./components/GraficoDistribucionNormal";

function App() {
  const [info, setInfo] = React.useState({});
  const [rows, setRows] = React.useState([]);

  const handleSimulationInit = (data) => {
    console.log(data);
    const {
      cantidadPaquetes,
      cantidadServidores,
      lambda,
      mu,
      tiempoProcesamiento,
      nivelConfianza,
    } = data;

    const RO = calculateRO({ lambda, s: cantidadServidores, mu });
    const L = calculateL({ RO });
    const LQ = calculateLQ({ RO });
    const W = calculateW({ RO, mu });
    const WQ = calculateWQ({ RO, mu });

    const Z = zScoreForConfidence(nivelConfianza);
    const capacidadTemporalAlmacenamiento = Math.ceil(Z);

    console.log({ RO, L, LQ, W, WQ, Z, capacidadTemporalAlmacenamiento });
    setInfo({
      RO,
      L,
      LQ,
      W,
      WQ,
      Z,
      capacidadTemporalAlmacenamiento,
      nivelConfianza,
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
    if (!info.nivelConfianza || !info.LQ || !info.capacidadTemporalAlmacenamiento) return null;

    const roundedLQ = Math.ceil(info.LQ);

    return (
      <>
      <Text size={"$2xl"}>
        {`Sin tomar en cuenta el nivel de confianza, la capacidad de almacenamiento temporal es de ${roundedLQ} paquete/s.`}
      </Text>
      <Spacer y={1} />
      <Text size={"$2xl"}>
        {`Para un nivel de confianza ${info.nivelConfianza}%, la capacidad de almacenamiento temporal es de ${info.capacidadTemporalAlmacenamiento} paquete/s. Este valor es calculado a partir del valor Z de una distribución estándar Normal de media cero y desviación 1.`}
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
          <Grid xs={12} md={4}>
            <LeyLittleTable
              L={info.L}
              LQ={info.LQ}
              W={info.W}
              WQ={info.WQ}
              RO={info.RO}
            />
          </Grid>
          <Grid xs={12} md={4} direction="column">
            <Text h4>Conclusiones</Text>
            <Spacer y={1} />
            <ROText />
            <Spacer y={1} />
            <NivelDeConfianzaText />
          </Grid>
          <Grid xs={12} md={12}>
            <GraficoDistribucionNormal zScore={info.Z} nivelConfianza={info.nivelConfianza} />
          </Grid>
        </Grid.Container>
      </Container>
    </NextUIProvider>
  );
}

export default App;
