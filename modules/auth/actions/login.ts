"use server";
import { loginSchema } from "@/schemas/auth";
import * as z from "zod";
import { signIn } from "@/auth";

export const login = async (
  values: z.infer<typeof loginSchema>
): Promise<{ error?: string; success?: string }> => {  // Interface simplificada
  try {
    const validatedFields = loginSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Los datos ingresados no son válidos" };
    }

    const { document, password } = validatedFields.data;
    const response = await signIn("credentials", {
      document,
      password,
      redirect: false,
    });

    if (!response?.ok) {
      return { error: "Credenciales inválidas" };
    }

    return { success: "Inicio de sesión exitoso" };
  } catch (error) {
    console.error("Login error:", error);
    return { error: "Error en el servidor. Por favor, intente más tarde" };
  }
};