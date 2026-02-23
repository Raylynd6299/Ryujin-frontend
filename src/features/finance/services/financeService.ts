import api from '@/lib/api';
import type { ApiResponse } from '@/types';
import type {
    Category,
    CreateCategoryRequest,
    UpdateCategoryRequest,
    IncomeSource,
    CreateIncomeSourceRequest,
    UpdateIncomeSourceRequest,
    DeactivateIncomeSourceRequest,
    Expense,
    CreateExpenseRequest,
    UpdateExpenseRequest,
    Debt,
    CreateDebtRequest,
    UpdateDebtRequest,
    RecordPaymentRequest,
    Account,
    CreateAccountRequest,
    UpdateAccountRequest,
    UpdateBalanceRequest,
    FinancePaginatedResponse,
} from '@/types/finance.types';

// ─── Query Params ─────────────────────────────────────────────────────────────

export interface ListParams {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc';
}

// ─── Categories ───────────────────────────────────────────────────────────────

export const categoryService = {
    list: async (params?: ListParams): Promise<Category[]> => {
        const response = await api.get<ApiResponse<Category[]>>('/v1/categories', { params });
        return response.data.data;
    },
    create: async (data: CreateCategoryRequest): Promise<Category> => {
        const response = await api.post<ApiResponse<Category>>('/v1/categories', data);
        return response.data.data;
    },
    update: async (id: string, data: UpdateCategoryRequest): Promise<Category> => {
        const response = await api.put<ApiResponse<Category>>(`/v1/categories/${id}`, data);
        return response.data.data;
    },
    delete: async (id: string): Promise<void> => {
        await api.delete(`/v1/categories/${id}`);
    },
};

// ─── Income Sources ───────────────────────────────────────────────────────────

export const incomeService = {
    list: async (params?: ListParams): Promise<FinancePaginatedResponse<IncomeSource>> => {
        const response = await api.get<ApiResponse<FinancePaginatedResponse<IncomeSource>>>('/v1/income-sources', { params });
        return response.data.data;
    },
    getById: async (id: string): Promise<IncomeSource> => {
        const response = await api.get<ApiResponse<IncomeSource>>(`/v1/income-sources/${id}`);
        return response.data.data;
    },
    create: async (data: CreateIncomeSourceRequest): Promise<IncomeSource> => {
        const response = await api.post<ApiResponse<IncomeSource>>('/v1/income-sources', data);
        return response.data.data;
    },
    update: async (id: string, data: UpdateIncomeSourceRequest): Promise<IncomeSource> => {
        const response = await api.put<ApiResponse<IncomeSource>>(`/v1/income-sources/${id}`, data);
        return response.data.data;
    },
    deactivate: async (id: string, data: DeactivateIncomeSourceRequest): Promise<IncomeSource> => {
        const response = await api.patch<ApiResponse<IncomeSource>>(`/v1/income-sources/${id}/deactivate`, data);
        return response.data.data;
    },
    delete: async (id: string): Promise<void> => {
        await api.delete(`/v1/income-sources/${id}`);
    },
};

// ─── Expenses ─────────────────────────────────────────────────────────────────

export const expenseService = {
    list: async (params?: ListParams): Promise<FinancePaginatedResponse<Expense>> => {
        const response = await api.get<ApiResponse<FinancePaginatedResponse<Expense>>>('/v1/expenses', { params });
        return response.data.data;
    },
    getById: async (id: string): Promise<Expense> => {
        const response = await api.get<ApiResponse<Expense>>(`/v1/expenses/${id}`);
        return response.data.data;
    },
    create: async (data: CreateExpenseRequest): Promise<Expense> => {
        const response = await api.post<ApiResponse<Expense>>('/v1/expenses', data);
        return response.data.data;
    },
    update: async (id: string, data: UpdateExpenseRequest): Promise<Expense> => {
        const response = await api.put<ApiResponse<Expense>>(`/v1/expenses/${id}`, data);
        return response.data.data;
    },
    delete: async (id: string): Promise<void> => {
        await api.delete(`/v1/expenses/${id}`);
    },
};

// ─── Debts ────────────────────────────────────────────────────────────────────

export const debtService = {
    list: async (params?: ListParams): Promise<FinancePaginatedResponse<Debt>> => {
        const response = await api.get<ApiResponse<FinancePaginatedResponse<Debt>>>('/v1/debts', { params });
        return response.data.data;
    },
    getById: async (id: string): Promise<Debt> => {
        const response = await api.get<ApiResponse<Debt>>(`/v1/debts/${id}`);
        return response.data.data;
    },
    create: async (data: CreateDebtRequest): Promise<Debt> => {
        const response = await api.post<ApiResponse<Debt>>('/v1/debts', data);
        return response.data.data;
    },
    update: async (id: string, data: UpdateDebtRequest): Promise<Debt> => {
        const response = await api.put<ApiResponse<Debt>>(`/v1/debts/${id}`, data);
        return response.data.data;
    },
    recordPayment: async (id: string, data: RecordPaymentRequest): Promise<Debt> => {
        const response = await api.patch<ApiResponse<Debt>>(`/v1/debts/${id}/payment`, data);
        return response.data.data;
    },
    delete: async (id: string): Promise<void> => {
        await api.delete(`/v1/debts/${id}`);
    },
};

// ─── Accounts ─────────────────────────────────────────────────────────────────

export const accountService = {
    list: async (params?: ListParams): Promise<FinancePaginatedResponse<Account>> => {
        const response = await api.get<ApiResponse<FinancePaginatedResponse<Account>>>('/v1/accounts', { params });
        return response.data.data;
    },
    getById: async (id: string): Promise<Account> => {
        const response = await api.get<ApiResponse<Account>>(`/v1/accounts/${id}`);
        return response.data.data;
    },
    create: async (data: CreateAccountRequest): Promise<Account> => {
        const response = await api.post<ApiResponse<Account>>('/v1/accounts', data);
        return response.data.data;
    },
    update: async (id: string, data: UpdateAccountRequest): Promise<Account> => {
        const response = await api.put<ApiResponse<Account>>(`/v1/accounts/${id}`, data);
        return response.data.data;
    },
    updateBalance: async (id: string, data: UpdateBalanceRequest): Promise<Account> => {
        const response = await api.patch<ApiResponse<Account>>(`/v1/accounts/${id}/balance`, data);
        return response.data.data;
    },
    delete: async (id: string): Promise<void> => {
        await api.delete(`/v1/accounts/${id}`);
    },
};
