import api from '@/lib/api';
import type { ApiResponse } from '@/types';
import type { AuthResponse, AuthTokens, LoginRequest, RegisterRequest, User } from '@/types/auth.types';

export const authService = {
    login: async (data: LoginRequest): Promise<AuthResponse> => {
        const response = await api.post<ApiResponse<AuthResponse>>('/v1/auth/login', data);
        return response.data.data;
    },

    register: async (data: Omit<RegisterRequest, 'confirmPassword'>): Promise<AuthResponse> => {
        const response = await api.post<ApiResponse<AuthResponse>>('/v1/auth/register', data);
        return response.data.data;
    },

    refresh: async (refreshToken: string): Promise<AuthTokens> => {
        const response = await api.post<ApiResponse<AuthTokens>>('/v1/auth/refresh', { refreshToken });
        return response.data.data;
    },

    getMe: async (): Promise<User> => {
        const response = await api.get<ApiResponse<User>>('/v1/users/me');
        return response.data.data;
    },
};
