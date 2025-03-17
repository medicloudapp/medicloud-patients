export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/register/:patientId*", // Habilita todas las rutas que comiencen con /register/
];

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/results";
