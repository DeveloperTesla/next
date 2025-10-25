// src/components/auth/store/useForgotPasswordStore.ts
import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";

interface ForgotPasswordState {
    loading: boolean;
    error: string | null;
    success: boolean;
    sendResetLink: (email: string) => Promise<void>;
    clearStatus: () => void;
}

export const useForgotPasswordStore = create<ForgotPasswordState>((set) => ({
    loading: false,
    error: null,
    success: false,

    sendResetLink: async (email: string) => {
        set({ loading: true, error: null, success: false });

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: "https://test.github.io/next/reset-password",
        });

        if (error) {
            set({ error: error.message, loading: false });
            return;
        }

        set({ success: true, loading: false });
    },

    clearStatus: () => set({ error: null, success: false }),
}));
