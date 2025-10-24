// src/components/auth/store/useRegisterStore.ts
import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";

interface RegisterState {
    loading: boolean;
    error: string | null;
    register: (email: string, password: string) => Promise<void>;
}

export const useRegisterStore = create<RegisterState>((set) => ({
    loading: false,
    error: null,

    register: async (email, password) => {
        set({ loading: true, error: null });

        const { error } = await supabase.auth.signUp({ email, password });

        if (error) {
            set({ error: error.message, loading: false });
            return;
        }

        set({ loading: false });
    },
}));
