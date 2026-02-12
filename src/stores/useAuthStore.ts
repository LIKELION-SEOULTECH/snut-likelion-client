import { create } from "zustand";

interface AuthState {
    accessToken: string | null;
    setAuth: (token: string) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    accessToken: null,

    setAuth: (token) => {
        localStorage.setItem("accessToken", token);

        set({
            accessToken: token
        });
    },
    clearAuth: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userRole");
        set({
            accessToken: null
        });
    }
}));
