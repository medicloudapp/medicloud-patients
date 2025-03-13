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
          throw new Error("Invalid credentials");
        }

        const {  document, password } = validatedFields.data;

        // Llama a tu API de login
        const user = await UserLogin( document, password);

        // Si hay un usuario válido, devuelve los datos necesarios
        if (user) {
          return user;
        }

        // Si no, devuelve null
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
