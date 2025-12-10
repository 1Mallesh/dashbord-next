import { z } from "zod";

export const forgotOtpSchema = z.object({
  otp: z.string().min(6, "OTP must be 6 digits").max(6, "OTP must be 6 digits"),
});

export type ForgotOtpInput = z.infer<typeof forgotOtpSchema>;
