// src/components/auth/OTP.tsx
"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema, type OTPFormData } from "@/validations/otpSchema";
import { useOTPStore } from "@/store/useOTPStore";

import { Button } from "@/components/ui/button";
import {
    Field,
    FieldGroup,
    FieldDescription,
    FieldLabel,
} from "@/components/ui/field";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { AlertCircleIcon, CircleCheck } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function OTPForm({ className, ...props }: React.ComponentProps<"div">) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email") ?? "";

    const {
        verifyOTP,
        resendOTP,
        loading,
        resending,
        resendSuccess,
        error,
        cooldown,
        startCooldown,
        clearMessages,
    } = useOTPStore();

    // 🧩 React Hook Form setup
    const form = useForm<OTPFormData>({
        resolver: zodResolver(otpSchema),
        defaultValues: { otp: "" },
    });

    // ✅ useWatch — stabilní alternativa místo form.watch()
    const otpValue = useWatch({
        control: form.control,
        name: "otp",
    });

    // 🧠 Form submit
    const onSubmit = async (data: OTPFormData) => {
        clearMessages();
        await verifyOTP(email, data.otp);
        if (!error) router.push("/dashboard");
    };

    useEffect(() => {
        if (email) startCooldown();
    }, [email, startCooldown]);

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1 className="text-xl font-bold">
                            Enter verification code
                        </h1>
                        <FieldDescription>
                            We sent a 6-digit code to your email address
                        </FieldDescription>
                    </div>

                    <Field>
                        <FieldLabel htmlFor="otp" className="sr-only">
                            Verification code
                        </FieldLabel>

                        <InputOTP
                            id="otp"
                            maxLength={6}
                            value={otpValue}
                            onChange={(val) => form.setValue("otp", val)}
                            containerClassName="gap-4"
                        >
                            <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:h-16 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-xl">
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:h-16 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-xl">
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>

                        {form.formState.errors.otp && (
                            <FieldDescription className="text-red-500 text-center">
                                {form.formState.errors.otp.message}
                            </FieldDescription>
                        )}

                        <FieldDescription className="text-center">
                            Didn&apos;t receive the code?{" "}
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (!resending && cooldown === 0)
                                        resendOTP(email);
                                }}
                                className="underline hover:no-underline cursor-pointer disabled:cursor-auto"
                                disabled={resending || cooldown > 0}
                            >
                                {resending
                                    ? "Sending..."
                                    : cooldown > 0
                                      ? `Resend in ${cooldown}s`
                                      : "Resend"}
                            </button>
                        </FieldDescription>
                    </Field>

                    <Field>
                        <Button
                            type="submit"
                            className="cursor-pointer"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Spinner className="size-4" />
                                    Verifying...
                                </>
                            ) : (
                                "Verify"
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

            {resendSuccess && (
                <div className="fixed bottom-[30px] left-1/2 -translate-x-1/2 z-50">
                    <Alert className="text-green-700">
                        <CircleCheck />
                        <AlertTitle>
                            New code has been sent to your email.
                        </AlertTitle>
                    </Alert>
                </div>
            )}

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
