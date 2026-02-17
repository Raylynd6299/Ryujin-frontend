import { create } from 'zustand';
import type { User, AuthTokens } from '@/types';
import { STORAGE_KEYS } from '@/lib/constants';

interface AuthStore {
    user: User | null;
    tokens: AuthTokens | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    setAuth: (user: User, tokens: AuthTokens) => void;
    clearAuth: () => void;
    setLoading: (loading: boolean) => void;
    initializeAuth: () => void;
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

    initializeAuth: () => {
        const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
        const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

        if (token && refreshToken) {
            // TODO: Validate token with API
            // For now, just set loading to false
            set({ isLoading: false, isAuthenticated: true, tokens: { accessToken: token, refreshToken } });
        } else {
            set({ isLoading: false, isAuthenticated: false });
        }
    },
}));
