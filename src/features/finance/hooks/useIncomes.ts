import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { incomeService } from '../services/financeService';
import type {
    CreateIncomeSourceRequest,
    UpdateIncomeSourceRequest,
    DeactivateIncomeSourceRequest,
} from '@/types/finance.types';

export const INCOME_KEYS = {
    all: ['incomes'] as const,
    list: (params?: object) => [...INCOME_KEYS.all, 'list', params] as const,
    detail: (id: string) => [...INCOME_KEYS.all, 'detail', id] as const,
};

export const useIncomes = (params?: { page?: number; limit?: number }) => {
    return useQuery({
        queryKey: INCOME_KEYS.list(params),
        queryFn: () => incomeService.list(params),
    });
};

export const useCreateIncome = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateIncomeSourceRequest) => incomeService.create(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: INCOME_KEYS.all }),
    });
};

export const useUpdateIncome = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateIncomeSourceRequest }) =>
            incomeService.update(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: INCOME_KEYS.all }),
    });
};

export const useDeactivateIncome = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: DeactivateIncomeSourceRequest }) =>
            incomeService.deactivate(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: INCOME_KEYS.all }),
    });
};

export const useDeleteIncome = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => incomeService.delete(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: INCOME_KEYS.all }),
    });
};
