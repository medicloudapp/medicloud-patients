"use server";
import { registerSchema, verifySchema } from "@/schemas/auth";
import { checkEmail, signUp } from "@/modules/auth/services/auth";
import * as z from "zod";

export const createAccount = async (values: z.infer<typeof registerSchema>) => {
  // Validar los campos con Zod
  const validatedFields = registerSchema.safeParse(values);

  // Si la validación falla, retornar un error
  if (!validatedFields.success) {
    console.error("Validation error:", validatedFields.error);
    return { error: "Invalid fields", details: validatedFields.error.errors };
  }

  // Extraer los datos validados
  const { document, email, password } = validatedFields.data;

  try {
    // Llamar a la función signUp
    const response = await signUp(document, email, password);
    console.log({ response });
    // Si no hay respuesta, retornar un error
    if (!response) {
      console.error("No response received from signUp");
      return { error: "Error creating account" };
    }

    // Registrar en consola la respuesta del servidor
    console.log("Response from signUp:", response);

    // Verificar si la respuesta tiene la estructura esperada
    if (!response.id) {
      console.error("Invalid response structure:", response);
      return { error: "Invalid response from server" };
    }

    // Retornar éxito con el ID y la respuesta completa
    return {
      success: "Account created successfully",
      id: response.id,
      data: response, // Retornar la respuesta completa
    };
  } catch (error) {
    // Capturar y registrar errores
    console.error("Registration error:", error);

    // Retornar un mensaje de error genérico con detalles
    return {
      error: "Something went wrong during registration",
      details: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const verifyEmail = async (values: z.infer<typeof verifySchema>) => {
  // Validar los campos con Zod
  const validatedFields = verifySchema.safeParse(values);

  // Si la validación falla, retornar un error
  if (!validatedFields.success) {
    console.error("Validation error:", validatedFields.error);
    return { error: "Invalid fields", details: validatedFields.error.errors };
  }

  // Extraer los datos validados
  const { code, patientId } = validatedFields.data;

  try {
    // Llamar a la función signUp
    const response = await checkEmail(code, patientId);

    // Si no hay respuesta, retornar un error
    if (!response) {
      console.error("No response received from signUp");
      return { error: "Error verifying email code" };
    }

    // Registrar en consola la respuesta del servidor
    console.log("Response from signUp:", response);

    // Retornar éxito con el ID y la respuesta completa
    return {
      success: "Email verification completed successfully",
      data: response,
    };
  } catch (error) {
    // Capturar y registrar errores
    console.error("Verification error:", error);

    // Retornar un mensaje de error genérico con detalles
    return {
      error: "Something went wrong during Verification",
      details: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
