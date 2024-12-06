import NextAuth from "next-auth";
import authConfig from "@/auth.config";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      console.log("session", session);

      return session;
    },
    async jwt({ token }) {
      console.log("token", token);

      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  ...authConfig,
});
