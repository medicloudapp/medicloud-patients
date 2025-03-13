import * as z from "zod";

export const loginSchema = z.object({
  document: z.string().min(6, { message: "Document number must be at least 6 characters" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});
