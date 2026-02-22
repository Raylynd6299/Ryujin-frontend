import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryService } from '../services/financeService';
import type { CreateCategoryRequest, UpdateCategoryRequest } from '@/types/finance.types';

export const CATEGORY_KEYS = {
    all: ['categories'] as const,
    list: (params?: object) => [...CATEGORY_KEYS.all, 'list', params] as const,
};

export const useCategories = (params?: { page?: number; limit?: number }) => {
    return useQuery({
        queryKey: CATEGORY_KEYS.list(params),
        queryFn: () => categoryService.list(params),
    });
};

export const useCreateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateCategoryRequest) => categoryService.create(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: CATEGORY_KEYS.all }),
    });
};

export const useUpdateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateCategoryRequest }) =>
            categoryService.update(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: CATEGORY_KEYS.all }),
    });
};

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => categoryService.delete(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: CATEGORY_KEYS.all }),
    });
};
