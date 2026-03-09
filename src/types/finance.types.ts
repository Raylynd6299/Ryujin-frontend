// ─── Enums / Union Types ──────────────────────────────────────────────────────

export type IncomeType = 'salary' | 'freelance' | 'rental' | 'dividend' | 'business' | 'other';
export type Recurrence = 'none' | 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'annually';
export type ExpensePriority = 'essential' | 'important' | 'optional' | 'low';
export type DebtType = 'credit_card' | 'personal_loan' | 'mortgage' | 'car_loan' | 'student_loan' | 'other';
export type AccountType = 'checking' | 'savings' | 'cash' | 'wallet';
export type CategoryType = 'income' | 'expense' | 'both';

// ─── Paginated List ───────────────────────────────────────────────────────────

export interface FinancePaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    perPage: number; // backend uses perPage, not pageSize
    totalPages: number;
}

// ─── Category ─────────────────────────────────────────────────────────────────

export interface Category {
    id: string;
    userId?: string;
    name: string;
    type: CategoryType;
    icon: string;
    color: string;
    isDefault: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateCategoryRequest {
    name: string;
    type: CategoryType;
    icon?: string;
    color?: string;
}

export interface UpdateCategoryRequest {
    name: string;
    icon?: string;
    color?: string;
}

// ─── Income Source ────────────────────────────────────────────────────────────

export interface IncomeSource {
    id: string;
    userId: string;
    categoryId?: string;
    name: string;
    description: string;
    amount: number;
    currency: string;
    incomeType: IncomeType;
    recurrence: Recurrence;
    startDate: string;
    endDate?: string;
    isActive: boolean;
    monthlyEquivalent: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateIncomeSourceRequest {
    name: string;
    description?: string;
    amount: number;
    currency: string;
    incomeType: IncomeType;
    recurrence: Recurrence;
    startDate: string;
    categoryId?: string;
}

export interface UpdateIncomeSourceRequest {
    name: string;
    description?: string;
    amount: number;
    currency: string;
    incomeType: IncomeType;
    recurrence: Recurrence;
    categoryId?: string;
}

export interface DeactivateIncomeSourceRequest {
    endDate: string;
}

// ─── Expense ──────────────────────────────────────────────────────────────────

export interface Expense {
    id: string;
    userId: string;
    categoryId?: string;
    name: string;
    description: string;
    amount: number;
    currency: string;
    priority: ExpensePriority;
    recurrence: Recurrence;
    expenseDate: string;
    endDate?: string;
    isActive: boolean;
    isUnnecessary: boolean;
    monthlyEquivalent: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateExpenseRequest {
    name: string;
    description?: string;
    amount: number;
    currency: string;
    priority: ExpensePriority;
    recurrence: Recurrence;
    expenseDate: string;
    categoryId?: string;
}

export interface UpdateExpenseRequest {
    name: string;
    description?: string;
    amount: number;
    currency: string;
    priority: ExpensePriority;
    recurrence: Recurrence;
    categoryId?: string;
}

// ─── Debt ─────────────────────────────────────────────────────────────────────

export interface Debt {
    id: string;
    userId: string;
    name: string;
    description: string;
    debtType: DebtType;
    totalAmount: number;
    remainingAmount: number;
    monthlyPayment: number;
    currency: string;
    interestRate: number;
    startDate?: string;
    dueDate?: string;
    isActive: boolean;
    progressPercent: number;
    monthsToPayoff: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateDebtRequest {
    name: string;
    description?: string;
    debtType: DebtType;
    totalAmount: number;
    remainingAmount: number;
    monthlyPayment: number;
    currency: string;
    interestRate?: number;
    startDate?: string;
    dueDate?: string;
}

export interface UpdateDebtRequest {
    name: string;
    description?: string;
    monthlyPayment: number;
    currency: string;
    interestRate?: number;
    dueDate?: string;
}

export interface RecordPaymentRequest {
    paymentAmount: number;
}

// ─── Account ──────────────────────────────────────────────────────────────────

export interface Account {
    id: string;
    userId: string;
    name: string;
    description: string;
    accountType: AccountType;
    balance: number;
    currency: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateAccountRequest {
    name: string;
    description?: string;
    accountType: AccountType;
    balance?: number;
    currency: string;
}

export interface UpdateAccountRequest {
    name: string;
    description?: string;
    accountType: AccountType;
}

export interface UpdateBalanceRequest {
    balance: number;
    currency: string;
}

// ─── Finance Indices ───────────────────────────────────────────────────────────

export type IndexStatus = 'green' | 'yellow' | 'red';

export interface FinanceIndex {
    name: string;
    value: number;
    status: IndexStatus;
    label: string;
}

export interface IndicesResponse {
    indices: FinanceIndex[];
    currencyWarning: boolean;
}

export interface FinanceSummary {
    totalIncomeCents: number;
    totalIncomeDecimal: number;
    totalExpensesCents: number;
    totalExpensesDecimal: number;
    netCashFlowCents: number;
    netCashFlowDecimal: number;
    savingsAmountCents: number;
    savingsAmountDecimal: number;
    currency: string;
}
