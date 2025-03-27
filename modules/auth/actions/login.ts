"use server";
import { loginSchema } from "@/schemas/auth";
import * as z from "zod";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const login = async (
  values: z.infer<typeof loginSchema>
): Promise<{ error?: string; success?: string }> => {
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

    if (response?.error) {
      // Personaliza los mensajes de error según el código de error
      const errorMessages: Record<string, string> = {
        "CredentialsSignin": "Credenciales inválidas",
        "Invalid document": "Documento incorrecto",
        "Invalid password": "Contraseña incorrecta",
      };
      
      return { 
        error: errorMessages[response.error] || response.error 
      };
    }

    return { success: "Inicio de sesión exitoso" };
  } catch (error) {
    console.error("Login error:", error);
    
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Credenciales inválidas" };
        default:
          return { error: "Error en la autenticación" };
      }
    }
    
    return { error: "Error en el servidor. Por favor, intente más tarde" };
  }
};