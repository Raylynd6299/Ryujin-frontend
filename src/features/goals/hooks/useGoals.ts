import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { goalService, contributionService } from '../services/goalService';
import type { CreateGoalRequest, UpdateGoalRequest, CreateContributionRequest } from '@/types/goal.types';
import type { GoalListParams } from '../services/goalService';

// ─── Query Keys ───────────────────────────────────────────────────────────────

export const GOAL_KEYS = {
    all: ['goals'] as const,
    list: (params?: object) => [...GOAL_KEYS.all, 'list', params] as const,
    detail: (id: string) => [...GOAL_KEYS.all, 'detail', id] as const,
    contributions: (goalId: string) => [...GOAL_KEYS.all, goalId, 'contributions'] as const,
};

// ─── Goals ────────────────────────────────────────────────────────────────────

export const useGoals = (params?: GoalListParams) => {
    return useQuery({
        queryKey: GOAL_KEYS.list(params),
        queryFn: () => goalService.list(params),
    });
};

export const useGoal = (id: string) => {
    return useQuery({
        queryKey: GOAL_KEYS.detail(id),
        queryFn: () => goalService.getById(id),
        enabled: !!id,
    });
};

export const useCreateGoal = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateGoalRequest) => goalService.create(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: GOAL_KEYS.all }),
    });
};

export const useUpdateGoal = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateGoalRequest }) =>
            goalService.update(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: GOAL_KEYS.all }),
    });
};

export const useDeleteGoal = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => goalService.delete(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: GOAL_KEYS.all }),
    });
};

// ─── Contributions ────────────────────────────────────────────────────────────

export const useContributions = (goalId: string) => {
    return useQuery({
        queryKey: GOAL_KEYS.contributions(goalId),
        queryFn: () => contributionService.list(goalId),
        enabled: !!goalId,
    });
};

export const useAddContribution = (goalId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateContributionRequest) =>
            contributionService.create(goalId, data),
        onSuccess: () => {
            // Invalidate both the contributions list and the goal detail (progress updates)
            queryClient.invalidateQueries({ queryKey: GOAL_KEYS.contributions(goalId) });
            queryClient.invalidateQueries({ queryKey: GOAL_KEYS.all });
        },
    });
};

export const useDeleteContribution = (goalId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (contributionId: string) =>
            contributionService.delete(goalId, contributionId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: GOAL_KEYS.contributions(goalId) });
            queryClient.invalidateQueries({ queryKey: GOAL_KEYS.all });
        },
    });
};
