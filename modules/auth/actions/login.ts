"use server";
import { loginSchema } from "@/schemas/auth";
import * as z from "zod";
import { signIn } from "@/auth";

interface LoginResponse {
  error?: string;
  success?: string;
  status: number;
}

export const login = async (values: z.infer<typeof loginSchema>): Promise<LoginResponse> => {
  try {
    const validatedFields = loginSchema.safeParse(values);

    if (!validatedFields.success) {
      return {
        error: "Los datos ingresados no son válidos",
        status: 400,
      };
    }

    const { document, password } = validatedFields.data;

    const response = await signIn("credentials", {
      document,
      password,
      redirect: false, // Prevent automatic redirect
    });

    if (!response?.ok) {
      return {
        error: "Credenciales inválidas",
        status: 401,
      };
    }

    return {
      success: "Inicio de sesión exitoso",
      status: 200,
    };

  } catch (error) {
    console.error("Login error:", error);
    return {
      error: "Error en el servidor. Por favor, intente más tarde",
      status: 500,
    };
  }
};
