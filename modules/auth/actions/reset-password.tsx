import { resetPasswordSchema } from "@/schemas/auth";
import { signUp } from "@/modules/auth/services/auth";
import * as z from "zod";

export const resetPassword = async (
  values: z.infer<typeof resetPasswordSchema>
) => {
  // Validar los campos con Zod
  const validatedFields = resetPasswordSchema.safeParse(values);

  // Si la validación falla, retornar un error
  if (!validatedFields.success) {
    console.error("Error de validación:", validatedFields.error);
    return {
      error: "Los datos ingresados no son válidos",
      details: validatedFields.error.errors,
    };
  }

  // Extraer los datos validados
  const { document, email, password } = validatedFields.data;

  try {
    // Llamar a la función signUp
    const response = await signUp(document, email, password);
    console.log({ response });
    // Si no hay respuesta, retornar un error
    if (!response) {
      console.error("No se recibió respuesta del servidor");
      return {
        error: "Error al cambiar la contraseña. Por favor, intente nuevamente",
      };
    }

    console.log("Respuesta del servidor:", response);

    if (!response.id) {
      console.error("Estructura de respuesta inválida:", response);
      return {
        error:
          "Error en la respuesta del servidor. Por favor, intente más tarde",
      };
    }

    // Retornar éxito con el ID y la respuesta completa
    return {
      success: "Contraseña cambiada con éxito",
      id: response.id,
      data: response,
    };
  } catch (error) {
    // Capturar y registrar errores
    console.error("Error en el Cambio de contraseña:", error);

    // Retornar un mensaje de error genérico con detalles
    return {
      error:
        "Ha ocurrido un error durante el Cambio de contraseña. Por favor, intente nuevamente",
      details: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};
