import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "@/schemas/auth";
import { UserLogin } from "@/modules/auth/services/auth";

export default {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        document: { label: "Document", type: "text" },
        password: { label: "Password", type: "password"}
      },
      authorize: async (credentials) => {
        const validatedFields = loginSchema.safeParse(credentials);
        if (!validatedFields.success) {
          // Devuelve null y el mensaje de error
          return null;
        }

        const { document, password } = validatedFields.data;

        const response = await UserLogin(document, password);

        if (!response.success) {
          // Lanza el error con el mensaje de la API
          throw new Error(response.message);
        }

        return response.data || null;
      },
    }),
  ],
} satisfies NextAuthConfig;
