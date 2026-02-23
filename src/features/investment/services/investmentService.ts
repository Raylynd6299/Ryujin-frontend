import api from '@/lib/api';
import type { ApiResponse } from '@/types';
import type {
    Holding,
    HoldingListResponse,
    CreateHoldingRequest,
    UpdateHoldingRequest,
    PortfolioSummary,
    PortfolioPerformance,
    HoldingListParams,
    StockQuote,
    StockPriceHistory,
} from '@/types/investment.types';

// ─── Holdings ─────────────────────────────────────────────────────────────────

export const holdingService = {
    list: async (params?: HoldingListParams): Promise<HoldingListResponse> => {
        const response = await api.get<ApiResponse<HoldingListResponse>>('/v1/holdings', { params });
        return response.data.data;
    },

    getById: async (id: string): Promise<Holding> => {
        const response = await api.get<ApiResponse<Holding>>(`/v1/holdings/${id}`);
        return response.data.data;
    },

    create: async (data: CreateHoldingRequest): Promise<Holding> => {
        const response = await api.post<ApiResponse<Holding>>('/v1/holdings', data);
        return response.data.data;
    },

    update: async (id: string, data: UpdateHoldingRequest): Promise<Holding> => {
        const response = await api.put<ApiResponse<Holding>>(`/v1/holdings/${id}`, data);
        return response.data.data;
    },

    delete: async (id: string): Promise<void> => {
        await api.delete(`/v1/holdings/${id}`);
    },

    refreshPrice: async (id: string): Promise<Holding> => {
        const response = await api.post<ApiResponse<Holding>>(`/v1/holdings/${id}/refresh-price`);
        return response.data.data;
    },
};

// ─── Portfolio ────────────────────────────────────────────────────────────────

export const portfolioService = {
    getSummary: async (): Promise<PortfolioSummary> => {
        const response = await api.get<ApiResponse<PortfolioSummary>>('/v1/portfolio/summary');
        return response.data.data;
    },

    getPerformance: async (): Promise<PortfolioPerformance> => {
        const response = await api.get<ApiResponse<PortfolioPerformance>>('/v1/portfolio/performance');
        return response.data.data;
    },
};

// ─── Stocks ───────────────────────────────────────────────────────────────────

export const stockService = {
    getQuote: async (symbol: string): Promise<StockQuote> => {
        const response = await api.get<ApiResponse<StockQuote>>(`/v1/stocks/${symbol}/quote`);
        return response.data.data;
    },

    listQuotes: async (): Promise<StockQuote[]> => {
        const response = await api.get<ApiResponse<StockQuote[]>>('/v1/stocks');
        return response.data.data;
    },

    getPriceHistory: async (symbol: string, limit = 30): Promise<StockPriceHistory[]> => {
        const response = await api.get<ApiResponse<StockPriceHistory[]>>(
            `/v1/stocks/${symbol}/history`,
            { params: { limit } }
        );
        return response.data.data;
    },
};
