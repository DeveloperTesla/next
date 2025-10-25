"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    registerSchema,
    type RegisterFormData,
} from "@/validations/registerSchema";
import { useRegisterStore } from "@/store/useRegisterStore";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Field,
    FieldLabel,
    FieldDescription,
    FieldGroup,
} from "@/components/ui/field";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

export function RegisterForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const router = useRouter();
    const { register: registerUser, loading, error } = useRegisterStore();

    const form = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: RegisterFormData) => {
        await registerUser(data.email, data.password);
        if (!error) router.push("/");
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1 className="text-xl font-bold">
                            Create your account
                        </h1>
                        <FieldDescription>
                            Already have an account?{" "}
                            <Link
                                href="/"
                                className="underline underline-offset-4 hover:no-underline"
                            >
                                Sign in
                            </Link>
                        </FieldDescription>
                    </div>

                    <Field>
                        <FieldLabel>Email</FieldLabel>
                        <Input
                            type="email"
                            placeholder="user@example.com"
                            {...form.register("email")}
                        />
                        {form.formState.errors.email && (
                            <FieldDescription className="text-red-500">
                                {form.formState.errors.email.message}
                            </FieldDescription>
                        )}
                    </Field>

                    <Field>
                        <FieldLabel>Password</FieldLabel>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            {...form.register("password")}
                        />
                        {form.formState.errors.password && (
                            <FieldDescription className="text-red-500">
                                {form.formState.errors.password.message}
                            </FieldDescription>
                        )}
                    </Field>

                    <Field>
                        <FieldLabel>Confirm Password</FieldLabel>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            {...form.register("confirmPassword")}
                        />
                        {form.formState.errors.confirmPassword && (
                            <FieldDescription className="text-red-500">
                                {form.formState.errors.confirmPassword.message}
                            </FieldDescription>
                        )}
                    </Field>

                    <Field>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Spinner className="size-4" />
                                    Creating account...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </Button>
                    </Field>
                </FieldGroup>
            </form>

            <FieldDescription className="px-6 text-center">
                By clicking continue, you agree to our{" "}
                <Link href="/terms">Terms of Service</Link> and{" "}
                <Link href="/privacy">Privacy Policy</Link>.
            </FieldDescription>

            {error && (
                <div className="fixed bottom-[30px] left-1/2 -translate-x-1/2 z-50">
                    <Alert variant="destructive">
                        <AlertCircleIcon />
                        <AlertTitle>{error}</AlertTitle>
                    </Alert>
                </div>
            )}
        </div>
    );
}
