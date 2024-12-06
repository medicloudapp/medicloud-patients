import NextAuth from "next-auth";
import authConfig from "@/auth.config"; // Ruta correcta
import {
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
} from "@/routes";

// Configuración de NextAuth con middleware
const { auth } = NextAuth(authConfig);

export default auth((req, ctx) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth; // Verifica si el usuario está autenticado

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Permitir acceso a las rutas de API de autenticación
  if (isApiAuthRoute) {
    return;
  }

  // Redirigir al dashboard si el usuario ya está autenticado y accede a una ruta de autenticación
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  // Redirigir al login si no está autenticado y no es una ruta pública
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  // Permitir acceso en cualquier otro caso
  return;
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
