import { Grid, Button, Text, Input, Spacer, Badge } from "@nextui-org/react";

/**
  llegada_cliente	"Exp. Negativa x = - u . Ln(1-RND) u = 5"
  llegada_cliente_para_retirar	"Distri. Normal u = 5 σ = 2"
  fin_atencion_restaurar	"Uniforme x= 2 + RND . 8"
  fin_atencion_modificar	"Uniforme x= 1 + RND . 5"
  fin_atencion_cliente	"Exp. Negativa x = - u . Ln(1-RND) u = 0,25"
*/

export const VariablesForm = () => {
  return (
    <Grid.Container gap={2} justify="center">
      <Grid xs={12} direction="column">
        <Text
          h3
          css={{
            textGradient: "45deg, $blue600 -20%, $blue500 50%",
          }}
          weight="bold"
        >
          Enunciado
        </Text>
        <Text>
          Un Luthier restaura y modifica diversos instrumentos, los clientes
          llegan al taller con una distribución exponencial negativa con media
          de 5 hs, estos le entregan sus instrumentos para restaurar (U[2,10] en
          horas) o para que sean modificados (U[1,6] en horas) con
          probabilidades de 60% y 40% respectivamente. Luego de dejar su
          instrumento, cada músico regresa luego de un tiempo con distribución
          normal (5, 2), para retirar el PROPIO, y si no está disponible,
          volverá luego de un tiempo con la misma distribución. La atención de
          cada músico que se acerca al taller le lleva al luthier un tiempo
          medio de 15 minutos (exp. neg.). Si el lutier está ocupado cuando
          llega el músico interrumpe su tarea para atenderlo y luego continúa.
          <Text>Determinar:</Text>
          <Text>
            ¿Cuánto tiempo está cada instrumento (en promedio) en el taller.?
          </Text>
          <Text>¿Tiene el luthier tiempo de descanso? ¿Qué porcentaje?</Text>
          <Text>
            ¿Qué porcentaje de tiempo de ocupación utiliza para atender a los
            clientes?
          </Text>
        </Text>
      </Grid>
      <Grid xs={12}>
        <Text
          h3
          css={{
            textGradient: "45deg, $blue600 -20%, $blue500 50%",
          }}
          weight="bold"
        >
          Eventos
        </Text>
      </Grid>
      <Grid xs={6}>
        <div>
          <Text h4 weight="bold">
            llegada_cliente
          </Text>
          <Badge size="xs" color="error">
            Exp. Negativa
          </Badge>
        </div>
        <Spacer x={1} />
        <Input label="Media (μ)" placeholder="μ" />
      </Grid>
      <Grid xs={6}>
        <div>
          <Text h4 weight="bold">
            fin_atencion_restaurar
          </Text>
          <Badge size="xs" color="success">
            {"Uniforme (A,B)"}
          </Badge>
        </div>
        <Spacer x={1} />
        <Input label="A" placeholder="A" />
        <Spacer x={1} />
        <Input label="B" placeholder="B" />
      </Grid>
      <Grid xs={6}>
        <div>
          <Text h4 weight="bold">
            fin_atencion_cliente
          </Text>
          <Badge size="xs" color="error">
            Exp. Negativa
          </Badge>
        </div>
        <Spacer x={1} />
        <Input label="Media (μ)" placeholder="μ" />
      </Grid>
      <Grid xs={6}>
        <div>
          <Text h4 weight="bold">
            fin_atencion_modificar
          </Text>
          <Badge size="xs" color="success">
            {"Uniforme (A,B)"}
          </Badge>
        </div>
        <Spacer x={1} />
        <Input label="A" placeholder="A" />
        <Spacer x={1} />
        <Input label="B" placeholder="B" />
      </Grid>
      <Grid xs={6}>
        <div>
          <Text h4 weight="bold">
            llegada_cliente_para_retirar
          </Text>
          <Badge size="xs" color="primary">
            Normal Box-Muller
          </Badge>
        </div>
        <Spacer x={1} />
        <Input label="Media (μ)" placeholder="μ" />
        <Spacer x={1} />
        <Input label="Desviación (σ)" placeholder="σ" />
      </Grid>
      <Grid xs={6} alignItems="center">
        <Button color="gradient" size="sm">
          Iniciar simulación
        </Button>
      </Grid>
      <Grid xs={6}></Grid>
    </Grid.Container>
  );
};
