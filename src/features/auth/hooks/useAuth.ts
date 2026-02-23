import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { useAuthStore } from '@/stores/authStore';
import { ROUTES } from '@/lib/constants';
import type { LoginRequest, RegisterRequest } from '@/types/auth.types';

export const AUTH_QUERY_KEYS = {
    me: ['auth', 'me'] as const,
};

export const useLogin = () => {
    const { setAuth } = useAuthStore();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (data: LoginRequest) => authService.login(data),
        onSuccess: (response) => {
            setAuth(response.user, response.tokens);
            navigate(ROUTES.DASHBOARD);
        },
    });
};

export const useRegister = () => {
    const { setAuth } = useAuthStore();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: ({ confirmPassword: _, ...data }: RegisterRequest) =>
            authService.register(data),
        onSuccess: (response) => {
            setAuth(response.user, response.tokens);
            navigate(ROUTES.DASHBOARD);
        },
    });
};

export const useLogout = () => {
    const { clearAuth } = useAuthStore();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const logout = () => {
        clearAuth();
        queryClient.clear();
        navigate(ROUTES.LOGIN);
    };

    return { logout };
};
