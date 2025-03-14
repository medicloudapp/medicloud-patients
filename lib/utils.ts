/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "react-hot-toast";
import { auth } from "@/auth";
import { processFile } from "@/modules/results/services/send-attachments";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getUserId = async (): Promise<string | null> => {
  const session = await auth();
  return session?.user?.id ?? null;
};

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

export async function SendFile(content: any[], token: string) {
  if (!Array.isArray(content) || content.length === 0) {
    toast.error("Seleccione archivos para procesar");
    return;
  }

  try {
    const validFiles = content.filter((item) => {
      return item && item.file && item.patient && item.patient.id;
    });

    if (validFiles.length === 0) {
      toast.error("No hay archivos válidos para procesar");
      return;
    }

    const results = await Promise.all(
      validFiles.map(async (item) => {
        try {
          await processFile({
            patientId: Number(item.patient.id),
            fileLink: item.file,
          }, token);
          return true;
        } catch (err) {
          console.error(`Error processing file: ${item.file}`, err);
          return false;
        }
      })
    );

    const successCount = results.filter(Boolean).length;
    const failureCount = results.length - successCount;

    if (failureCount > 0) {
      toast.error(`Error al procesar ${failureCount} archivo(s)`);
    }
    if (successCount > 0) {
      toast.success(`${successCount} archivo(s) procesados correctamente`);
    }
  } catch (error) {
    console.error('SendFile error:', error);
    toast.error("Error al procesar los archivos");
  }
}
