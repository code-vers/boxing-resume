import { z } from "zod";

/**
 * Login validation schema.
 */
export const loginSchema = z.object({
  role: z.enum(["USER", "ADMIN"]).optional(),
  emailOrUsername: z.string().min(1, "Email or Username is required"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
