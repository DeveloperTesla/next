"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    forgotPasswordSchema,
    type ForgotPasswordData,
} from "@/validations/forgotPasswordSchema";
import { useForgotPasswordStore } from "@/store/useForgotPasswordStore";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function ForgotPasswordForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const { sendResetLink, loading, error, success, clearStatus } =
        useForgotPasswordStore();

    const form = useForm<ForgotPasswordData>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: { email: "" },
    });

    const onSubmit = async (data: ForgotPasswordData) => {
        clearStatus();
        await sendResetLink(data.email);
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1 className="text-xl font-bold">
                            Forgot your password?
                        </h1>
                        <FieldDescription>
                            Enter your email and we’ll send you a reset link.
                        </FieldDescription>
                    </div>

                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                            id="email"
                            type="email"
                            placeholder="user@example.com"
                            {...form.register("email")}
                            required
                        />
                        {form.formState.errors.email && (
                            <FieldDescription className="text-red-500">
                                {form.formState.errors.email.message}
                            </FieldDescription>
                        )}
                    </Field>

                    <Field>
                        <Button
                            type="submit"
                            className="w-full cursor-pointer"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Spinner className="size-4" />
                                    Sending reset link...
                                </>
                            ) : (
                                "Send Reset Link"
                            )}
                        </Button>
                    </Field>
                </FieldGroup>
            </form>

            <FieldDescription className="px-6 text-center">
                Do you remember your password?{" "}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 underline underline-offset-4 hover:no-underline"
                >
                    Sign in
                </Link>
            </FieldDescription>

            {error && (
                <div className="fixed bottom-[30px] left-1/2 -translate-x-1/2 z-50">
                    <Alert variant="destructive">
                        <AlertCircleIcon />
                        <AlertTitle>{error}</AlertTitle>
                    </Alert>
                </div>
            )}

            {success && (
                <div className="fixed bottom-[30px] left-1/2 -translate-x-1/2 z-50">
                    <Alert className="text-green-700">
                        <CheckCircle2 />
                        <AlertTitle>
                            Reset link has been sent to your email.
                        </AlertTitle>
                    </Alert>
                </div>
            )}
        </div>
    );
}
