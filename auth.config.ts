import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "@/schemas/auth";
import { UserLogin } from "@/modules/auth/services/auth";

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validatedFields = loginSchema.safeParse(credentials);
        if (!validatedFields.success) {
          return null;
        }

        const { email, document } = validatedFields.data;

        const user = await UserLogin(email, document);
        // Si coinciden, devolver el usuario
        if (user) {
          return user;
        }

        // Si no coinciden, devolver null
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
