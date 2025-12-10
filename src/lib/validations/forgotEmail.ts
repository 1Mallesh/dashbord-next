import { z } from "zod";

export const forgotEmailSchema = z.object({
  email: z.string().nonempty("Email is required").email("Enter valid email"),
});

export type ForgotEmailInput = z.infer<typeof forgotEmailSchema>;
