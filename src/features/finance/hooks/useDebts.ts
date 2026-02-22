import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { debtService } from '../services/financeService';
import type { CreateDebtRequest, UpdateDebtRequest, RecordPaymentRequest } from '@/types/finance.types';

export const DEBT_KEYS = {
    all: ['debts'] as const,
    list: (params?: object) => [...DEBT_KEYS.all, 'list', params] as const,
    detail: (id: string) => [...DEBT_KEYS.all, 'detail', id] as const,
};

export const useDebts = (params?: { page?: number; limit?: number }) => {
    return useQuery({
        queryKey: DEBT_KEYS.list(params),
        queryFn: () => debtService.list(params),
    });
};

export const useCreateDebt = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateDebtRequest) => debtService.create(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: DEBT_KEYS.all }),
    });
};

export const useUpdateDebt = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateDebtRequest }) =>
            debtService.update(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: DEBT_KEYS.all }),
    });
};

export const useRecordPayment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: RecordPaymentRequest }) =>
            debtService.recordPayment(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: DEBT_KEYS.all }),
    });
};

export const useDeleteDebt = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => debtService.delete(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: DEBT_KEYS.all }),
    });
};
