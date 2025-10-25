// src/components/auth/validations/resetPasswordSchema.ts
import { z } from "zod";

export const resetPasswordSchema = z
    .object({
        password: z
            .string()
            .min(12, "Password must be at least 12 characters long.")
            .regex(/[a-z]/, "Must include lowercase letters.")
            .regex(/[A-Z]/, "Must include uppercase letters.")
            .regex(/[0-9]/, "Must include numbers.")
            .regex(/[^a-zA-Z0-9]/, "Must include special characters."),
        confirm: z.string(),
    })
    .refine((data) => data.password === data.confirm, {
        message: "Passwords do not match.",
        path: ["confirm"],
    });

export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
