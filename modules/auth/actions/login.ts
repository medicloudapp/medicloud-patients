"use server";
import { loginSchema } from "@/schemas/auth";
import * as z from "zod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

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
        status: 400 
      };
    }

    const { document, password } = validatedFields.data;

    if (!document || !password) {
      return {
        error: "Documento y contraseña son requeridos",
        status: 400
      };
    }

    await signIn("credentials", {
      document,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return { 
      success: "Inicio de sesión exitoso",
      status: 200 
    };

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { 
            error: "Credenciales inválidas. Por favor, verifique sus datos",
            status: 401 
          };
        case "CallbackRouteError":
          return {
            error: "Error en la redirección. Por favor, intente nuevamente",
            status: 500
          };
        default:
          return { 
            error: "Ha ocurrido un error. Por favor, intente nuevamente",
            status: 500 
          };
      }
    }

    console.error("Login error:", error);
    return { 
      error: "Error en el servidor. Por favor, intente más tarde",
      status: 500 
    };
  }
};
