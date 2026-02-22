import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { accountService } from '../services/financeService';
import type { CreateAccountRequest, UpdateAccountRequest, UpdateBalanceRequest } from '@/types/finance.types';

export const ACCOUNT_KEYS = {
    all: ['accounts'] as const,
    list: (params?: object) => [...ACCOUNT_KEYS.all, 'list', params] as const,
    detail: (id: string) => [...ACCOUNT_KEYS.all, 'detail', id] as const,
};

export const useAccounts = (params?: { page?: number; limit?: number }) => {
    return useQuery({
        queryKey: ACCOUNT_KEYS.list(params),
        queryFn: () => accountService.list(params),
    });
};

export const useCreateAccount = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateAccountRequest) => accountService.create(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ACCOUNT_KEYS.all }),
    });
};

export const useUpdateAccount = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateAccountRequest }) =>
            accountService.update(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ACCOUNT_KEYS.all }),
    });
};

export const useUpdateBalance = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateBalanceRequest }) =>
            accountService.updateBalance(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ACCOUNT_KEYS.all }),
    });
};

export const useDeleteAccount = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => accountService.delete(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ACCOUNT_KEYS.all }),
    });
};
