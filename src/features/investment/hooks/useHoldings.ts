import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { holdingService } from '../services/investmentService';
import { PORTFOLIO_QUERY_KEY } from './usePortfolio';
import type { CreateHoldingRequest, UpdateHoldingRequest, HoldingListParams } from '@/types/investment.types';

export const HOLDINGS_QUERY_KEY = ['holdings'] as const;

// ─── Queries ──────────────────────────────────────────────────────────────────

export const useHoldings = (params?: HoldingListParams) => {
    return useQuery({
        queryKey: [...HOLDINGS_QUERY_KEY, 'list', params],
        queryFn: () => holdingService.list(params),
    });
};

export const useHolding = (id: string) => {
    return useQuery({
        queryKey: [...HOLDINGS_QUERY_KEY, 'detail', id],
        queryFn: () => holdingService.getById(id),
        enabled: Boolean(id),
    });
};

// ─── Mutations ────────────────────────────────────────────────────────────────

export const useCreateHolding = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateHoldingRequest) => holdingService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: HOLDINGS_QUERY_KEY });
            queryClient.invalidateQueries({ queryKey: PORTFOLIO_QUERY_KEY });
        },
    });
};

export const useUpdateHolding = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateHoldingRequest }) =>
            holdingService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: HOLDINGS_QUERY_KEY });
            queryClient.invalidateQueries({ queryKey: PORTFOLIO_QUERY_KEY });
        },
    });
};

export const useDeleteHolding = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => holdingService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: HOLDINGS_QUERY_KEY });
            queryClient.invalidateQueries({ queryKey: PORTFOLIO_QUERY_KEY });
        },
    });
};

export const useRefreshHoldingPrice = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => holdingService.refreshPrice(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: HOLDINGS_QUERY_KEY });
            queryClient.invalidateQueries({ queryKey: PORTFOLIO_QUERY_KEY });
        },
    });
};
