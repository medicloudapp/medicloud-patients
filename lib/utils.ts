/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "react-hot-toast";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function downloadFile(filename: string, content: any[]) {
  if (content.length === 0) {
    console.warn("No hay contenido para descargar.");
    toast.error("Seleccione Para descargar");
    return;
  }

  // Crear un enlace para descargar cada archivo
  content.forEach((item) => {
    if (item.file) {
      const link = document.createElement("a");
      link.href = item.file; // URL del archivo
      link.download = item.name || "archivo.pdf"; // Nombre del archivo
      link.target = "_blank"; // Para abrir en una nueva pestaña
      document.body.appendChild(link); // Agregar enlace al DOM
      link.click(); // Simular clic para descargar
      document.body.removeChild(link); // Eliminar enlace después de descargar
    } else {
      toast.error("Url no válida");
      console.error("El archivo no tiene una URL válida:", item);
    }
  });
  toast.success("Descarga Completada");
  console.log(`Descarga de archivos completa. (${filename})`);
}
