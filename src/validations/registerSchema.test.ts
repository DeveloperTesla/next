import { registerSchema } from "@/validations/registerSchema";

describe("registerSchema", () => {
    it("should pass with valid data", () => {
        const data = {
            email: "test@example.com",
            password: "Abcd1234!@#$",
            confirmPassword: "Abcd1234!@#$",
        };

        const result = registerSchema.safeParse(data);
        expect(result.success).toBe(true);
    });

    it("should fail if email is invalid", () => {
        const data = {
            email: "not-an-email",
            password: "Abcd1234!@#$",
            confirmPassword: "Abcd1234!@#$",
        };

        const result = registerSchema.safeParse(data);
        expect(result.success).toBe(false);
        expect(result.error?.format().email?._errors).toContain(
            "Please enter a valid email.",
        );
    });

    it("should fail if passwords do not match", () => {
        const data = {
            email: "test@example.com",
            password: "Abcd1234!@#$",
            confirmPassword: "WrongPassword1!",
        };

        const result = registerSchema.safeParse(data);
        expect(result.success).toBe(false);
        expect(result.error?.format().confirmPassword?._errors).toContain(
            "Passwords do not match.",
        );
    });

    it("should fail if password does not meet complexity", () => {
        const data = {
            email: "test@example.com",
            password: "short",
            confirmPassword: "short",
        };

        const result = registerSchema.safeParse(data);
        expect(result.success).toBe(false);
        const errors = result.error?.format().password?._errors || [];
        expect(errors.length).toBeGreaterThan(0);
    });
});
