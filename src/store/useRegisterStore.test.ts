import { useRegisterStore } from "@/store/useRegisterStore";
import { act } from "react";
import { supabase } from "@/lib/supabaseClient";

jest.mock("@/lib/supabaseClient", () => ({
    supabase: {
        auth: {
            signUp: jest.fn(),
        },
    },
}));

describe("useRegisterStore", () => {
    beforeEach(() => {
        const { setState } = useRegisterStore;
        act(() => {
            setState({ loading: false, error: null });
        });
        jest.clearAllMocks();
    });

    it("should set loading during registration and then reset", async () => {
        (supabase.auth.signUp as jest.Mock).mockResolvedValue({ error: null });

        const { register } = useRegisterStore.getState();

        const promise = register("test@example.com", "Abcd1234!@#$");
        expect(useRegisterStore.getState().loading).toBe(true);

        await promise;

        expect(useRegisterStore.getState().loading).toBe(false);
        expect(useRegisterStore.getState().error).toBeNull();
        expect(supabase.auth.signUp).toHaveBeenCalledWith({
            email: "test@example.com",
            password: "Abcd1234!@#$",
        });
    });

    it("should set error if registration fails", async () => {
        (supabase.auth.signUp as jest.Mock).mockResolvedValue({
            error: { message: "Email already exists" },
        });

        const { register } = useRegisterStore.getState();

        await register("test@example.com", "Abcd1234!@#$");

        expect(useRegisterStore.getState().loading).toBe(false);
        expect(useRegisterStore.getState().error).toBe("Email already exists");
    });
});
