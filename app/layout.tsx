import type { Metadata } from "next";
import "./globals.css";
import { ToasterProvider } from "@/providers/toast-provider";

export const metadata: Metadata = {
  title: "MediCloud Patients",
  description: "Portal de pacientes MediCloud",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <ToasterProvider />
        {children}
      </body>
    </html>
  );
}
