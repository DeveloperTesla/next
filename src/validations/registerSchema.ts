// src/validations/auth/registerSchema.ts
import { z } from "zod";

export const registerSchema = z
    .object({
        email: z.string().email("Please enter a valid email."),
        password: z
            .string()
            .min(12, "Password must be at least 12 characters long.")
            .regex(/[a-z]/, "Must include lowercase letters.")
            .regex(/[A-Z]/, "Must include uppercase letters.")
            .regex(/[0-9]/, "Must include numbers.")
            .regex(/[^a-zA-Z0-9]/, "Must include special characters."),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
    });

export type RegisterFormData = z.infer<typeof registerSchema>;
