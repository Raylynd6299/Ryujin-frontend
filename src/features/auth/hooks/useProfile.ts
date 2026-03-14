import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/authService';
import { useAuthStore } from '@/stores/authStore';
import type { UpdateProfileRequest, UpdateCurrenciesRequest, ChangePasswordRequest } from '../services/authService';

export const PROFILE_QUERY_KEYS = {
    me: ['profile', 'me'] as const,
};

export const useProfile = () => {
    return useQuery({
        queryKey: PROFILE_QUERY_KEYS.me,
        queryFn: () => authService.getMe(),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    const { setAuth, tokens } = useAuthStore();

    return useMutation({
        mutationFn: (data: UpdateProfileRequest) => authService.updateProfile(data),
        onSuccess: (updatedUser) => {
            // Update the query cache
            queryClient.setQueryData(PROFILE_QUERY_KEYS.me, updatedUser);
            // Also update the auth store so the Header/Sidebar reflect changes immediately
            if (tokens) {
                setAuth(updatedUser, tokens);
            }
        },
    });
};

export const useUpdateCurrencies = () => {
    const queryClient = useQueryClient();
    const { setAuth, tokens } = useAuthStore();

    return useMutation({
        mutationFn: (data: UpdateCurrenciesRequest) => authService.updateCurrencies(data),
        onSuccess: (updatedUser) => {
            queryClient.setQueryData(PROFILE_QUERY_KEYS.me, updatedUser);
            if (tokens) {
                setAuth(updatedUser, tokens);
            }
        },
    });
};

export const useChangePassword = () => {
    return useMutation({
        mutationFn: (data: ChangePasswordRequest) => authService.changePassword(data),
    });
};
