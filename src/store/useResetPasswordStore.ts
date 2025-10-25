// src/components/auth/store/useResetPasswordStore.ts
import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";

interface ResetPasswordState {
    loading: boolean;
    error: string | null;
    success: boolean;
    resetPassword: (password: string) => Promise<void>;
    clearStatus: () => void;
}

export const useResetPasswordStore = create<ResetPasswordState>((set) => ({
    loading: false,
    error: null,
    success: false,

    resetPassword: async (password: string) => {
        set({ loading: true, error: null, success: false });

        const { error } = await supabase.auth.updateUser({ password });

        if (error) {
            set({ error: error.message, loading: false });
        } else {
            set({ success: true, loading: false });
        }
    },

    clearStatus: () => set({ error: null, success: false }),
}));
