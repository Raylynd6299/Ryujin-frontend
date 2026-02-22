import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { expenseService } from '../services/financeService';
import type { CreateExpenseRequest, UpdateExpenseRequest } from '@/types/finance.types';

export const EXPENSE_KEYS = {
    all: ['expenses'] as const,
    list: (params?: object) => [...EXPENSE_KEYS.all, 'list', params] as const,
    detail: (id: string) => [...EXPENSE_KEYS.all, 'detail', id] as const,
};

export const useExpenses = (params?: { page?: number; limit?: number }) => {
    return useQuery({
        queryKey: EXPENSE_KEYS.list(params),
        queryFn: () => expenseService.list(params),
    });
};

export const useCreateExpense = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateExpenseRequest) => expenseService.create(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: EXPENSE_KEYS.all }),
    });
};

export const useUpdateExpense = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateExpenseRequest }) =>
            expenseService.update(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: EXPENSE_KEYS.all }),
    });
};

export const useDeleteExpense = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => expenseService.delete(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: EXPENSE_KEYS.all }),
    });
};
