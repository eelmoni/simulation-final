import { Grid, Button, Text, Input, Spacer, Badge } from "@nextui-org/react";
import { useForm } from "react-hook-form";

import {
  UNIFORM,
  NEGATIVE_EXPONENTIAL,
  NORMAL_BOX_MULLER,
} from "../models/distributions/names";

/**
  llegada_cliente	"Exp. Negativa x = - u . Ln(1-RND) u = 5"
  llegada_cliente_para_retirar	"Distri. Normal u = 5 σ = 2"
  fin_atencion_restaurar	"Uniforme x= 2 + RND . 8"
  fin_atencion_modificar	"Uniforme x= 1 + RND . 5"
  fin_atencion_cliente	"Exp. Negativa x = - u . Ln(1-RND) u = 0,25"
*/

export const VariablesForm = ({ onSimulationInit }) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    onSimulationInit({
      events: {
        llegada_cliente: {
          isInitEvent: true,
          name: 'llegada_cliente',
          distributionName: NEGATIVE_EXPONENTIAL,
          distributionParams: {
            mu: data.llegada_cliente_media,
          },
          secondHeaders: ["RND", "Tiempo", "Prox. llegada"],
        },
        fin_atencion_restaurar: {
          name: 'fin_atencion_restaurar',
          distributionName: UNIFORM,
          distributionParams: {
            a: data.fin_atencion_restaurar_A,
            b: data.fin_atencion_restaurar_B,
          },
          secondHeaders: ["RND", "Tiempo", "Fin atención"],
        },
        fin_atencion_modificar: {
          name: 'fin_atencion_modificar',
          distributionName: UNIFORM,
          distributionParams: {
            a: data.fin_atencion_modificar_A,
            b: data.fin_atencion_modificar_B,
          },
          secondHeaders: ["RND", "Tiempo", "Fin atención"],
        },
        fin_atencion_cliente: {
          name: 'fin_atencion_cliente',
          distributionName: NEGATIVE_EXPONENTIAL,
          distributionParams: {
            mu: data.fin_atencion_cliente_media,
          },
          secondHeaders: ["RND", "Tiempo", "Fin atención"],
        },
        llegada_cliente_para_retirar: {
          name: 'llegada_cliente_para_retirar',
          distributionName: NORMAL_BOX_MULLER,
          distributionParams: {
            mu: data.llegada_cliente_para_retirar_media,
            sigma: data.llegada_cliente_para_retirar_desviacion,
          },
          secondHeaders: ["RND1", "RND2", "Tiempo", "Prox llegada"],
        },
      },
      simulationParams: {
        cantidad_simulaciones: data.cantidad_simulaciones,
        cantidad_simulaciones_a_mostrar: data.cantidad_simulaciones_a_mostrar,
        numero_de_fila_inicial_a_mostrar: data.numero_de_fila_inicial_a_mostrar,
      },
    });
  };

  return (
    <Grid.Container gap={2} justify="center">
      <Grid xs={12} direction="column">
        <Text h3 weight="bold">
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
        </Text>
        <Text>Determinar:</Text>
        <Text>
          ¿Cuánto tiempo está cada instrumento (en promedio) en el taller.?
        </Text>
        <Text>¿Tiene el luthier tiempo de descanso? ¿Qué porcentaje?</Text>
        <Text>
          ¿Qué porcentaje de tiempo de ocupación utiliza para atender a los
          clientes?
        </Text>
      </Grid>
      <Grid xs={12}>
        <Text h3 weight="bold">
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
        <Input
          label="Media (μ)"
          placeholder="μ"
          {...register("llegada_cliente_media", {
            required: true,
            maxLength: 20,
          })}
        />
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
        <Input
          label="A"
          placeholder="A"
          {...register("fin_atencion_restaurar_A", {
            required: true,
            maxLength: 20,
          })}
        />
        <Spacer x={1} />
        <Input
          label="B"
          placeholder="B"
          {...register("fin_atencion_restaurar_B", {
            required: true,
            maxLength: 20,
          })}
        />
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
        <Input
          label="Media (μ)"
          placeholder="μ"
          {...register("fin_atencion_cliente_media", {
            required: true,
            maxLength: 20,
          })}
        />
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
        <Input
          label="A"
          placeholder="A"
          {...register("fin_atencion_modificar_A", {
            required: true,
            maxLength: 20,
          })}
        />
        <Spacer x={1} />
        <Input
          label="B"
          placeholder="B"
          {...register("fin_atencion_modificar_B", {
            required: true,
            maxLength: 20,
          })}
        />
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
        <Input
          label="Media (μ)"
          placeholder="μ"
          {...register("llegada_cliente_para_retirar_media", {
            required: true,
            maxLength: 20,
          })}
        />
        <Spacer x={1} />
        <Input
          label="Desviación (σ)"
          placeholder="σ"
          {...register("llegada_cliente_para_retirar_desviacion", {
            required: true,
            maxLength: 20,
          })}
        />
      </Grid>
      <Grid xs={6}></Grid>
      <Grid xs={12}>
        <Text h3 weight="bold">
          Parámetros de la simulación
        </Text>
      </Grid>
      <Grid xs={12} alignItems="center">
        <Input
          label="Cantidad de simulaciones"
          placeholder="Cantidad de simulaciones"
          {...register("cantidad_simulaciones", {
            required: true,
            maxLength: 20,
          })}
        />
        <Spacer x={1} />
        <Input
          label="Cantidad de simulaciones a mostrar"
          placeholder="Cantidad de simulaciones a mostrar"
          {...register("cantidad_simulaciones_a_mostrar", {
            required: true,
            maxLength: 20,
          })}
        />
        <Spacer x={1} />
        <Input
          label="Número de fila inicial a mostrar"
          placeholder="Número de fila inicial"
          {...register("numero_de_fila_inicial_a_mostrar", {
            required: true,
            maxLength: 20,
          })}
        />
        <Spacer x={1} />
        <Button onPress={handleSubmit(onSubmit)} color="warning" size="xl">
          Iniciar simulación
        </Button>
      </Grid>
    </Grid.Container>
  );
};
