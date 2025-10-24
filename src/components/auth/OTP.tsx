// src/components/auth/OTP.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { AlertCircleIcon, CircleCheck } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldDescription,
    FieldGroup,
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

export function OTPForm({ className, ...props }: React.ComponentProps<"div">) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email") ?? "";

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [resending, setResending] = useState(false);
    const [resendSuccess, setResendSuccess] = useState(false);
    const [cooldown, setCooldown] = useState(0);

    useEffect(() => {
        if (cooldown === 0 && email) {
            setCooldown(30);
        }

        const timer =
            cooldown > 0
                ? setTimeout(() => setCooldown(cooldown - 1), 1000)
                : null;

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [cooldown, email]);

    async function handleVerify(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.verifyOtp({
            email,
            token: otp,
            type: "email",
        });

        if (error) {
            setError("Invalid code, please try again.");
            setLoading(false);
            return;
        }

        const { error: updateError } = await supabase.auth.updateUser({
            data: { otp_verified: true },
        });

        if (updateError) {
            setError("Failed to verify OTP.");
            setLoading(false);
            return;
        }

        router.push("/dashboard");
        setLoading(false);
    }

    async function handleResendCode(e: React.MouseEvent) {
        e.preventDefault();
        if (cooldown > 0 || resending) return;

        setResending(true);
        setError(null);
        setResendSuccess(false);

        const { error } = await supabase.auth.signInWithOtp({ email });

        if (error) {
            setError("Failed to resend code. Please try again.");
        } else {
            setResendSuccess(true);
            setCooldown(30);
        }

        setResending(false);
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <form onSubmit={handleVerify}>
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
                            maxLength={6}
                            value={otp}
                            onChange={(val) => setOtp(val)}
                            id="otp"
                            required
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
                        <FieldDescription className="text-center">
                            Didn&apos;t receive the code?{" "}
                            <button
                                onClick={handleResendCode}
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
                            disabled={loading}
                            className="cursor-pointer"
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
                    <Alert variant="destructive" className="text-green-700">
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
