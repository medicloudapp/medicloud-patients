"use server";
import { loginSchema } from "@/schemas/auth";
import * as z from "zod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Los datos ingresados no son válidos" };
  }

  const { document, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      document,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return { success: "Inicio de sesión exitoso" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Credenciales inválidas. Por favor, verifique sus datos" };
        default:
          return { error: "Ha ocurrido un error. Por favor, intente nuevamente" };
      }
    }
    throw error;
  }
};
