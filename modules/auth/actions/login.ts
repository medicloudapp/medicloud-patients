"use server";
import { loginSchema } from "@/schemas/auth";
import * as z from "zod";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

// login.ts (modifica la función login)
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

    // Aquí hay que manejar la respuesta de signIn correctamente
    if (response?.error) {
      // Si hay error, lo devolvemos directamente
      console.log({ response });
      return { error: response.message };
    }

    return { success: "Inicio de sesión exitoso" };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Login error:", error);

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error:
              "El documento o la contraseña son incorrectos. Por favor inténtalo de nuevo.",
          };
        default:
          return { error: "Error en la autenticación" };
      }
    }
    return {
      error:
        error.message || "Error en el servidor. Por favor, intente más tarde",
    };
  }
};
