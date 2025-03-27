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
          return null;
        }
      
        const { document, password } = validatedFields.data;
      
        const response = await UserLogin(document, password);
      
        if (!response.success) {
          // En lugar de throw new Error, devuelve null y el mensaje
          return null;
        }
      
        return response.data || null;
      },
    }),
  ],
} satisfies NextAuthConfig;
