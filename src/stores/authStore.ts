import { create } from 'zustand';
import type { User, AuthTokens } from '@/types';
import { STORAGE_KEYS } from '@/lib/constants';
import { authService } from '@/features/auth/services/authService';

interface AuthStore {
    user: User | null;
    tokens: AuthTokens | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    setAuth: (user: User, tokens: AuthTokens) => void;
    clearAuth: () => void;
    setLoading: (loading: boolean) => void;
    initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    tokens: null,
    isAuthenticated: false,
    isLoading: true,

    setAuth: (user: User, tokens: AuthTokens) => {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, tokens.accessToken);
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken);
        set({ user, tokens, isAuthenticated: true, isLoading: false });
    },

    clearAuth: () => {
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        set({ user: null, tokens: null, isAuthenticated: false, isLoading: false });
    },

    setLoading: (loading: boolean) => {
        set({ isLoading: loading });
    },

    initializeAuth: async () => {
        const accessToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
        const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

        if (!accessToken || !refreshToken) {
            set({ isLoading: false, isAuthenticated: false });
            return;
        }

        try {
            // Validate token with the API — the refresh interceptor will handle
            // token rotation silently if the access token has expired
            const user = await authService.getMe();
            set({
                user,
                tokens: { accessToken, refreshToken },
                isAuthenticated: true,
                isLoading: false,
            });
        } catch {
            localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
            localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
            set({ user: null, tokens: null, isAuthenticated: false, isLoading: false });
        }
    },
}));
