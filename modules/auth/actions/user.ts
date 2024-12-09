import { getSession } from "next-auth/react";

export const getUserSessionServer = async () => {
  const session = await getSession();

  if (!session || !session.user) {
    return null;
  }

  return {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    token: session.user.token, // Si guardaste el token en la sesión
  };
};
