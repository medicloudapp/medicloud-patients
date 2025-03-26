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
          throw new Error("Credenciales inválidas");
        }

        const { document, password } = validatedFields.data;

        const response = await UserLogin(document, password);

        if (!response.success) {
          throw new Error(response.message);
        }

        if (response.data) {
          return response.data;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
