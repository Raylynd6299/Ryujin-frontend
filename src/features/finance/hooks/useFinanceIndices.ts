import { useQuery } from '@tanstack/react-query';
import { getFinanceIndices, getFinanceSummary } from '../services/financeService';

export const INDICES_KEYS = {
    all: ['indices'] as const,
    list: () => [...INDICES_KEYS.all, 'list'] as const,
};

export const SUMMARY_KEYS = {
    all: ['summary'] as const,
    list: () => [...SUMMARY_KEYS.all, 'list'] as const,
};

export const useFinanceIndices = () => {
    const indicesQuery = useQuery({
        queryKey: INDICES_KEYS.list(),
        queryFn: getFinanceIndices,
    });

    const summaryQuery = useQuery({
        queryKey: SUMMARY_KEYS.list(),
        queryFn: getFinanceSummary,
    });

    return {
        indices: indicesQuery.data?.indices ?? [],
        currencyWarning: indicesQuery.data?.currencyWarning ?? false,
        summary: summaryQuery.data,
        isLoading: indicesQuery.isLoading || summaryQuery.isLoading,
        isError: indicesQuery.isError || summaryQuery.isError,
        error: indicesQuery.error || summaryQuery.error,
        refetch: () => {
            indicesQuery.refetch();
            summaryQuery.refetch();
        },
    };
};