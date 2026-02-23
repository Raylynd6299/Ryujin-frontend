import { useQuery } from '@tanstack/react-query';
import { stockService } from '../services/investmentService';

export const STOCK_QUOTE_KEY = ['stocks'] as const;

// ─── Queries ──────────────────────────────────────────────────────────────────

export const useStockQuote = (symbol: string) =>
    useQuery({
        queryKey: [...STOCK_QUOTE_KEY, 'quote', symbol],
        queryFn: () => stockService.getQuote(symbol),
        enabled: symbol.length >= 1,
        staleTime: 10 * 60 * 1000, // 10 min — backend handles freshness
    });

export const useStockList = () =>
    useQuery({
        queryKey: [...STOCK_QUOTE_KEY, 'list'],
        queryFn: () => stockService.listQuotes(),
        staleTime: 5 * 60 * 1000,
    });

export const useStockPriceHistory = (symbol: string, limit = 30) =>
    useQuery({
        queryKey: [...STOCK_QUOTE_KEY, 'history', symbol, limit],
        queryFn: () => stockService.getPriceHistory(symbol, limit),
        enabled: symbol.length >= 1,
    });
