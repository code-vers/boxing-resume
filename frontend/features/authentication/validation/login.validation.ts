import { z } from "zod";

/**
 * Login validation schema.
 */
export const loginSchema = z.object({
  role: z.enum(["USER", "ADMIN"]).optional(),
  email: z.string().min(1, "Email is required").email("Must be a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
