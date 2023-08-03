import { useForm } from "react-hook-form";
import { Input, Button, Spacer } from "@nextui-org/react";

export default function LeyLittleForm({ onFormSubmit }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let finalLambda = data.lambda;
    let finalMU = data.mu;

    if (data.cantidadPaquetes) {
      finalLambda = data.cantidadPaquetes;
    }

    if (data.tiempoProcesamiento) {
      finalMU = (60 * 1) / data.tiempoProcesamiento;
    }

    onFormSubmit({
      cantidadPaquetes: parseInt(data.cantidadPaquetes, 10),
      cantidadServidores: parseInt(data.cantidadServidores, 10),
      lambda: parseFloat(finalLambda),
      mu: parseFloat(finalMU),
      tiempoProcesamiento: parseFloat(data.tiempoProcesamiento),
      nivelConfianza: parseFloat(data.nivelConfianza),
    });
  };

  return (
    <form
      onSubmit={(evt) => {
        evt.preventDefault();
      }}
    >
      <Input
        label="Lambda (λ)"
        variant="outline"
        fullWidth
        {...register("lambda", { pattern: /^\d+(\.\d+)?$/ })}
        // error={Boolean(errors.lambda)}
        helperText={
          errors.lambda ? "Este campo es requerido y debe ser un número." : ""
        }
      />
      <Spacer y={1} />
      <Input
        label="Mu (μ)"
        variant="outline"
        fullWidth
        {...register("mu", { pattern: /^\d+(\.\d+)?$/ })}
        // error={Boolean(errors.mu)}
        helperText={
          errors.mu ? "Este campo es requerido y debe ser un número." : ""
        }
      />
      <Spacer y={1} />
      <Input
        label="Cantidad de Servidores (s)"
        variant="outline"
        fullWidth
        {...register("cantidadServidores", {
          pattern: /^[0-9]+$/,
        })}
        // error={Boolean(errors.cantidadServidores)}
        helperText={
          errors.cantidadServidores
            ? "Este campo es requerido y debe ser un número."
            : ""
        }
      />
      <Spacer y={1} />
      <Input
        label="Cantidad de Paquetes por Minuto (minutos)"
        variant="outline"
        fullWidth
        {...register("cantidadPaquetes", {
          pattern: /^[0-9]+$/,
        })}
        // error={Boolean(errors.cantidadPaquetes)}
        helperText={
          errors.cantidadPaquetes
            ? "Este campo es requerido y debe ser un número."
            : ""
        }
      />
      <Spacer y={1} />
      <Input
        label="Tiempo para procesar un Paquete de Información (segundos)"
        variant="outline"
        fullWidth
        {...register("tiempoProcesamiento", {
          pattern: /^\d+(\.\d+)?$/,
        })}
        // error={Boolean(errors.tiempoProcesamiento)}
        helperText={
          errors.tiempoProcesamiento
            ? "Este campo es requerido y debe ser un número."
            : ""
        }
      />
      <Spacer y={1} />
      <Input
        label="Nivel de confianza (%)"
        variant="outline"
        fullWidth
        {...register("nivelConfianza", {
          pattern: /^\d+(\.\d+)?$/,
        })}
        // error={Boolean(errors.tiempoProcesamiento)}
        helperText={
          errors.nivelConfianza
            ? "Este campo es requerido y debe ser un número."
            : ""
        }
      />
      <Spacer y={2} />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        onPress={handleSubmit(onSubmit)}
      >
        Calcular
      </Button>
    </form>
  );
}
