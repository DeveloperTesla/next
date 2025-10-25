// src/components/auth/store/useLoginStore.ts
import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";

interface LoginState {
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    clearError: () => void;
}

export const useLoginStore = create<LoginState>((set) => ({
    loading: false,
    error: null,

    login: async (email, password) => {
        set({ loading: true, error: null });

        // 1️⃣ Přihlášení pomocí hesla
        const { error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (signInError) {
            set({ error: "Incorrect email or password.", loading: false });
            return;
        }

        // 2️⃣ Nastavení flagu pro OTP
        const { error: updateError } = await supabase.auth.updateUser({
            data: { otp_verified: false },
        });

        if (updateError) {
            set({
                error: "Failed to initialize OTP verification.",
                loading: false,
            });
            return;
        }

        // 3️⃣ Odeslání OTP
        const { error: otpError } = await supabase.auth.signInWithOtp({
            email,
            options: { shouldCreateUser: false },
        });

        if (otpError) {
            set({ error: "Failed to send verification code.", loading: false });
            return;
        }

        set({ loading: false });
    },

    clearError: () => set({ error: null }),
}));
