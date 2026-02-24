import api from '@/lib/api';
import type { ApiResponse } from '@/types';
import type {
    Goal,
    CreateGoalRequest,
    UpdateGoalRequest,
    GoalPaginatedResponse,
    GoalContribution,
    CreateContributionRequest,
    ContributionListResponse,
} from '@/types/goal.types';

// ─── Query Params ─────────────────────────────────────────────────────────────

export interface GoalListParams {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc';
}

// ─── Goals ────────────────────────────────────────────────────────────────────

export const goalService = {
    list: async (params?: GoalListParams): Promise<GoalPaginatedResponse<Goal>> => {
        const response = await api.get<ApiResponse<GoalPaginatedResponse<Goal>>>('/v1/goals', { params });
        return response.data.data;
    },

    getById: async (id: string): Promise<Goal> => {
        const response = await api.get<ApiResponse<Goal>>(`/v1/goals/${id}`);
        return response.data.data;
    },

    create: async (data: CreateGoalRequest): Promise<Goal> => {
        const response = await api.post<ApiResponse<Goal>>('/v1/goals', data);
        return response.data.data;
    },

    update: async (id: string, data: UpdateGoalRequest): Promise<Goal> => {
        const response = await api.put<ApiResponse<Goal>>(`/v1/goals/${id}`, data);
        return response.data.data;
    },

    delete: async (id: string): Promise<void> => {
        await api.delete(`/v1/goals/${id}`);
    },
};

// ─── Contributions ────────────────────────────────────────────────────────────

export const contributionService = {
    list: async (goalId: string): Promise<ContributionListResponse> => {
        const response = await api.get<ApiResponse<ContributionListResponse>>(
            `/v1/goals/${goalId}/contributions`
        );
        return response.data.data;
    },

    create: async (goalId: string, data: CreateContributionRequest): Promise<GoalContribution> => {
        const response = await api.post<ApiResponse<GoalContribution>>(
            `/v1/goals/${goalId}/contributions`,
            data
        );
        return response.data.data;
    },

    delete: async (goalId: string, contributionId: string): Promise<void> => {
        await api.delete(`/v1/goals/${goalId}/contributions/${contributionId}`);
    },
};
