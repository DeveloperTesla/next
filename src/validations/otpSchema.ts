// src/components/auth/validations/otpSchema.ts
import { z } from "zod";

export const otpSchema = z.object({
    otp: z
        .string()
        .min(6, "Code must be 6 digits long.")
        .max(6, "Code must be 6 digits long.")
        .regex(/^\d+$/, "Code must contain only numbers."),
});

export type OTPFormData = z.infer<typeof otpSchema>;
