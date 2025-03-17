import NextAuth from "next-auth";
import authConfig from "@/auth.config";

const { auth } = NextAuth(authConfig);

import { DEFAULT_LOGIN_REDIRECT, authRoutes, apiAuthPrefix } from "@/routes";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth; // Verifica si el usuario está autenticado
  const { pathname } = req.nextUrl;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  // Verificar si la ruta actual está en authRoutes
  const isAuthRoute = authRoutes.some((route) => {
    if (route.includes(":")) {
      // Manejar rutas dinámicas
      const routePattern = new RegExp(`^${route.replace(/:.*\*/, ".*")}$`);
      return routePattern.test(pathname);
    }
    return pathname === route;
  });

  // Permitir acceso a las rutas de API de autenticación
  if (isApiAuthRoute) {
    return;
  }

  // Redirigir al protected si el usuario ya está autenticado y accede a una ruta de autenticación
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  // Redirigir al login si no está autenticado y no es una ruta de autenticación
  if (!isLoggedIn && !isAuthRoute) {
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
