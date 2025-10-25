// src/components/auth/store/useOTPStore.ts
import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";

interface OTPState {
    loading: boolean;
    resending: boolean;
    resendSuccess: boolean;
    error: string | null;
    cooldown: number;
    startCooldown: () => void;
    verifyOTP: (email: string, otp: string) => Promise<void>;
    resendOTP: (email: string) => Promise<void>;
    clearMessages: () => void;
}

export const useOTPStore = create<OTPState>((set, get) => ({
    loading: false,
    resending: false,
    resendSuccess: false,
    error: null,
    cooldown: 0,

    startCooldown: () => {
        const { cooldown } = get();
        if (cooldown > 0) return;

        set({ cooldown: 30 });
        const countdown = setInterval(() => {
            set((state) => {
                if (state.cooldown <= 1) {
                    clearInterval(countdown);
                    return { cooldown: 0 };
                }
                return { cooldown: state.cooldown - 1 };
            });
        }, 1000);
    },

    verifyOTP: async (email, otp) => {
        set({ loading: true, error: null });

        const { error } = await supabase.auth.verifyOtp({
            email,
            token: otp,
            type: "email",
        });

        if (error) {
            set({ error: "Invalid code, please try again.", loading: false });
            return;
        }

        const { error: updateError } = await supabase.auth.updateUser({
            data: { otp_verified: true },
        });

        if (updateError) {
            set({ error: "Failed to verify OTP.", loading: false });
            return;
        }

        set({ loading: false });
    },

    resendOTP: async (email) => {
        if (!email) return;
        set({ resending: true, resendSuccess: false, error: null });

        const { error } = await supabase.auth.signInWithOtp({ email });

        if (error) {
            set({
                error: "Failed to resend code. Please try again.",
                resending: false,
            });
        } else {
            set({ resendSuccess: true, resending: false });
            get().startCooldown();
        }
    },

    clearMessages: () => set({ error: null, resendSuccess: false }),
}));
