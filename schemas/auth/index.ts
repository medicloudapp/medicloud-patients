import * as z from "zod";

export const loginSchema = z.object({
  document: z.string().min(6, { message: "" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe contener al menos 6 digitos" }),
});

export const registerSchema = z.object({
  document: z
    .string()
    .min(6, { message: "Ingrese un documento con al menos 6 digitos" }),
  email: z.string().email({ message: "Ingrese un correo valido" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe contener al menos 6 digitos" }),
});

export const verifySchema = z.object({
  code: z.string().min(6, { message: "El codigo debe contener 6 digitos" }),
  patientId: z.string().min(1, { message: "Error con el paciente" }),
});
