import { useQueries } from '@tanstack/react-query';
import { useMemo } from 'react';
import { incomeService, expenseService, debtService, accountService } from '@/features/finance/services/financeService';
import type {
    DashboardData,
    DashboardKPIs,
    ExpenseByCategoryItem,
    MonthlyBarItem,
    DebtSummary,
    AccountSummary,
} from '@/types/dashboard.types';
import type { IncomeSource, Expense, Debt, Account } from '@/types/finance.types';

// ─── Query Keys ───────────────────────────────────────────────────────────────

export const DASHBOARD_KEYS = {
    all: ['dashboard'] as const,
    summary: () => [...DASHBOARD_KEYS.all, 'summary'] as const,
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Fetch all pages of a paginated resource */
async function fetchAllPages<T>(
    fetcher: (params: { page: number; limit: number }) => Promise<{ data: T[]; totalPages: number }>,
): Promise<T[]> {
    const first = await fetcher({ page: 1, limit: 100 });
    if (first.totalPages <= 1) return first.data;

    const rest = await Promise.all(
        Array.from({ length: first.totalPages - 1 }, (_, i) =>
            fetcher({ page: i + 2, limit: 100 }),
        ),
    );
    return [first.data, ...rest.map((r) => r.data)].flat();
}

/** Detect dominant currency from a list */
function dominantCurrency(currencies: string[]): string {
    if (currencies.length === 0) return 'USD';
    const freq: Record<string, number> = {};
    for (const c of currencies) freq[c] = (freq[c] ?? 0) + 1;
    return Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];
}

/** Map month index to short label */
const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// ─── KPI Computation ─────────────────────────────────────────────────────────

function computeKPIs(
    incomes: IncomeSource[],
    expenses: Expense[],
    debts: Debt[],
    accounts: Account[],
): DashboardKPIs {
    const activeIncomes = incomes.filter((i) => i.isActive);
    const activeExpenses = expenses.filter((e) => e.isActive);
    const activeDebts = debts.filter((d) => d.isActive);
    const activeAccounts = accounts.filter((a) => a.isActive);

    const totalMonthlyIncome = activeIncomes.reduce((sum, i) => sum + i.monthlyEquivalent, 0);
    const totalMonthlyExpenses = activeExpenses.reduce((sum, e) => sum + e.monthlyEquivalent, 0);
    const netCashFlow = totalMonthlyIncome - totalMonthlyExpenses;
    const savingsRatio = totalMonthlyIncome > 0
        ? Math.round((netCashFlow / totalMonthlyIncome) * 100 * 10) / 10
        : 0;
    const totalAccountsBalance = activeAccounts.reduce((sum, a) => sum + a.balance, 0);
    const totalDebtRemaining = activeDebts.reduce((sum, d) => sum + d.remainingAmount, 0);
    const debtRatio = totalMonthlyIncome > 0
        ? Math.round((totalDebtRemaining / totalMonthlyIncome) * 100 * 10) / 10
        : 0;
    const emergencyCoverage = totalMonthlyExpenses > 0
        ? Math.round((totalAccountsBalance / totalMonthlyExpenses) * 10) / 10
        : 0;

    const allCurrencies = [
        ...activeIncomes.map((i) => i.currency),
        ...activeExpenses.map((e) => e.currency),
        ...activeAccounts.map((a) => a.currency),
    ];
    const currency = dominantCurrency(allCurrencies);

    return {
        totalMonthlyIncome,
        totalMonthlyExpenses,
        netCashFlow,
        savingsRatio,
        totalAccountsBalance,
        totalDebtRemaining,
        debtRatio,
        emergencyCoverage,
        currency,
    };
}

// ─── Expense by Category ──────────────────────────────────────────────────────

function computeExpensesByCategory(expenses: Expense[]): ExpenseByCategoryItem[] {
    const activeExpenses = expenses.filter((e) => e.isActive);
    const totalMonthly = activeExpenses.reduce((sum, e) => sum + e.monthlyEquivalent, 0);

    const grouped: Record<string, { name: string; total: number; currency: string }> = {};

    for (const expense of activeExpenses) {
        const key = expense.categoryId ?? '__uncategorized__';
        if (!grouped[key]) {
            grouped[key] = { name: 'Uncategorized', total: 0, currency: expense.currency };
        }
        grouped[key].total += expense.monthlyEquivalent;
    }

    return Object.entries(grouped)
        .map(([categoryId, data]) => ({
            categoryId,
            categoryName: data.name,
            categoryIcon: '💸',
            categoryColor: '#a78bfa',
            totalAmount: data.total,
            currency: data.currency,
            percentage: totalMonthly > 0
                ? Math.round((data.total / totalMonthly) * 100 * 10) / 10
                : 0,
        }))
        .sort((a, b) => b.totalAmount - a.totalAmount);
}

// ─── Monthly Trend (last 6 months, based on expense/income dates) ─────────────

function computeMonthlyTrend(incomes: IncomeSource[], expenses: Expense[]): MonthlyBarItem[] {
    const now = new Date();
    const months: MonthlyBarItem[] = Array.from({ length: 6 }, (_, i) => {
        const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
        return {
            month: MONTH_LABELS[d.getMonth()],
            income: 0,
            expenses: 0,
        };
    });

    // For now, use monthly equivalents spread across 6 months (approximation)
    // When backend endpoint exists, it will provide real per-month data
    const activeIncomes = incomes.filter((i) => i.isActive);
    const activeExpenses = expenses.filter((e) => e.isActive);
    const monthlyIncome = activeIncomes.reduce((sum, i) => sum + i.monthlyEquivalent, 0);
    const monthlyExpense = activeExpenses.reduce((sum, e) => sum + e.monthlyEquivalent, 0);

    return months.map((m) => ({
        ...m,
        income: monthlyIncome,
        expenses: monthlyExpense,
    }));
}

// ─── Debt / Account Summaries ─────────────────────────────────────────────────

function computeTopDebts(debts: Debt[]): DebtSummary[] {
    return debts
        .filter((d) => d.isActive)
        .sort((a, b) => b.remainingAmount - a.remainingAmount)
        .slice(0, 5)
        .map((d) => ({
            id: d.id,
            name: d.name,
            debtType: d.debtType,
            remainingAmount: d.remainingAmount,
            totalAmount: d.totalAmount,
            monthlyPayment: d.monthlyPayment,
            progressPercent: d.progressPercent,
            currency: d.currency,
        }));
}

function computeTopAccounts(accounts: Account[]): AccountSummary[] {
    return accounts
        .filter((a) => a.isActive)
        .sort((a, b) => b.balance - a.balance)
        .slice(0, 5)
        .map((a) => ({
            id: a.id,
            name: a.name,
            accountType: a.accountType,
            balance: a.balance,
            currency: a.currency,
        }));
}

// ─── Main Hook ────────────────────────────────────────────────────────────────

export const useDashboard = () => {
    const results = useQueries({
        queries: [
            {
                queryKey: ['incomes', 'all'],
                queryFn: () => fetchAllPages(incomeService.list),
                staleTime: 5 * 60 * 1000, // 5 min
            },
            {
                queryKey: ['expenses', 'all'],
                queryFn: () => fetchAllPages(expenseService.list),
                staleTime: 5 * 60 * 1000,
            },
            {
                queryKey: ['debts', 'all'],
                queryFn: () => fetchAllPages(debtService.list),
                staleTime: 5 * 60 * 1000,
            },
            {
                queryKey: ['accounts', 'all'],
                queryFn: () => fetchAllPages(accountService.list),
                staleTime: 5 * 60 * 1000,
            },
        ],
    });

    const [incomesQ, expensesQ, debtsQ, accountsQ] = results;

    // isPending = query has never resolved (no data yet)
    // isLoading = isPending + isFetching (more restrictive in v5)
    const isLoading = results.some((r) => r.isPending);
    const isError = results.some((r) => r.isError);
    const errors = results.map((r) => r.error).filter(Boolean);

    if (errors.length > 0) {
        console.error('[useDashboard] Query errors:', errors);
    }

    const data = useMemo<DashboardData | null>(() => {
        // Wait until ALL queries have resolved at least once
        if (!incomesQ.data || !expensesQ.data || !debtsQ.data || !accountsQ.data) return null;

        // Filter out any undefined/null items that could sneak in during hydration
        const incomes = incomesQ.data.filter(Boolean);
        const expenses = expensesQ.data.filter(Boolean);
        const debts = debtsQ.data.filter(Boolean);
        const accounts = accountsQ.data.filter(Boolean);

        return {
            kpis: computeKPIs(incomes, expenses, debts, accounts),
            expensesByCategory: computeExpensesByCategory(expenses),
            monthlyTrend: computeMonthlyTrend(incomes, expenses),
            topDebts: computeTopDebts(debts),
            topAccounts: computeTopAccounts(accounts),
        };
    }, [incomesQ.data, expensesQ.data, debtsQ.data, accountsQ.data]);

    return { data, isLoading, isError, errors };
};
