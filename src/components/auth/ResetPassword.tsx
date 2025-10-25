"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    resetPasswordSchema,
    type ResetPasswordData,
} from "@/validations/resetPasswordSchema";
import { useResetPasswordStore } from "@/store/useResetPasswordStore";

import { Button } from "@/components/ui/button";
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

export function ResetPasswordForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const router = useRouter();
    const { resetPassword, loading, error, success, clearStatus } =
        useResetPasswordStore();

    const form = useForm<ResetPasswordData>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirm: "",
        },
    });

    const onSubmit = async (data: ResetPasswordData) => {
        await resetPassword(data.password);
    };

    // po úspěšném resetu přesměruj po 2 sekundách
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                clearStatus();
                router.push("/");
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [success, router, clearStatus]);

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1 className="text-xl font-bold">
                            Reset your password
                        </h1>
                        <FieldDescription>
                            Enter your new password below.
                        </FieldDescription>
                    </div>

                    <Field>
                        <FieldLabel>New Password</FieldLabel>
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
                        <FieldDescription>
                            Must include at least 12 characters,
                            upper/lowercase, number, and special characters.
                        </FieldDescription>
                    </Field>

                    <Field>
                        <FieldLabel>Confirm Password</FieldLabel>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            {...form.register("confirm")}
                        />
                        {form.formState.errors.confirm && (
                            <FieldDescription className="text-red-500">
                                {form.formState.errors.confirm.message}
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
                                    Updating password...
                                </>
                            ) : (
                                "Update Password"
                            )}
                        </Button>
                    </Field>
                </FieldGroup>
            </form>

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
                        <AlertTitle>Password updated successfully!</AlertTitle>
                    </Alert>
                </div>
            )}
        </div>
    );
}
