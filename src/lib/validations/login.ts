// src/lib/validations/login.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().nonempty("Email is required").email("Enter a valid email"),
  password: z.string().nonempty("Password is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;
