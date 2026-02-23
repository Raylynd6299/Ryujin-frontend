import { useQuery } from '@tanstack/react-query';
import { portfolioService } from '../services/investmentService';

export const PORTFOLIO_QUERY_KEY = ['portfolio'] as const;

export const usePortfolioSummary = () => {
    return useQuery({
        queryKey: [...PORTFOLIO_QUERY_KEY, 'summary'],
        queryFn: () => portfolioService.getSummary(),
    });
};

export const usePortfolioPerformance = () => {
    return useQuery({
        queryKey: [...PORTFOLIO_QUERY_KEY, 'performance'],
        queryFn: () => portfolioService.getPerformance(),
    });
};
