import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  document: z.string().min(1, { message: "Required, must be at least 1 characters" }),
});
