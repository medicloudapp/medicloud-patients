"use server";
import { registerSchema, verifySchema } from "@/schemas/auth";
import { checkEmail, signUp } from "@/modules/auth/services/auth";
import * as z from "zod";

export const createAccount = async (values: z.infer<typeof registerSchema>) => {
  // Validar los campos con Zod
  const validatedFields = registerSchema.safeParse(values);

  // Si la validación falla, retornar un error
  if (!validatedFields.success) {
    console.error("Error de validación:", validatedFields.error);
    return { error: "Los datos ingresados no son válidos", details: validatedFields.error.errors };
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
      return { error: "Error al crear la cuenta. Por favor, intente nuevamente" };
    }

    console.log("Respuesta del servidor:", response);

    if (!response.id) {
      console.error("Estructura de respuesta inválida:", response);
      return { error: "Error en la respuesta del servidor. Por favor, intente más tarde" };
    }

    // Retornar éxito con el ID y la respuesta completa
    return {
      success: "Cuenta creada exitosamente",
      id: response.id,
      data: response,
    };
  } catch (error) {
    // Capturar y registrar errores
    console.error("Error en el registro:", error);

    // Retornar un mensaje de error genérico con detalles
    return {
      error: "Ha ocurrido un error durante el registro. Por favor, intente nuevamente",
      details: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};

export const verifyEmail = async (values: z.infer<typeof verifySchema>) => {
  // Validar los campos con Zod
  const validatedFields = verifySchema.safeParse(values);

  // Si la validación falla, retornar un error
  if (!validatedFields.success) {
    console.error("Error de validación:", validatedFields.error);
    return { error: "Código de verificación inválido", details: validatedFields.error.errors };
  }

  // Extraer los datos validados
  const { code, patientId } = validatedFields.data;

  try {
    // Llamar a la función signUp
    const response = await checkEmail(code, patientId);

    // Si no hay respuesta, retornar un error
    if (!response) {
      console.error("No se recibió respuesta del servidor");
      return { error: "Error al verificar el código de correo electrónico" };
    }

    console.log("Respuesta del servidor:", response);

    // Retornar éxito con el ID y la respuesta completa
    return {
      success: "Correo electrónico verificado exitosamente",
      data: response,
    };
  } catch (error) {
    // Capturar y registrar errores
    console.error("Error en la verificación:", error);

    // Retornar un mensaje de error genérico con detalles
    return {
      error: "Ha ocurrido un error durante la verificación. Por favor, intente nuevamente",
      details: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};
