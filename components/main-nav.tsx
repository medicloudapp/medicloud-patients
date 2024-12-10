"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MainNav({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const pathName = usePathname();
  const routes = [
    {
      href: "profile",
      label: "Perfil",
      active: pathName === "/profile",
    },
    {
      href: "results",
      label: "Resultados",
      active: pathName === "/results",
    },
  ];

  return (
    <div className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-gray-700 dark:hover:text-white",
            route.active
              ? "text-black dark:text-white font-bold"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </div>
  );
}
