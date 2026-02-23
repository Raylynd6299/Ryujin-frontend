// ─── Dashboard KPIs ───────────────────────────────────────────────────────────

export interface DashboardKPIs {
    /** Total monthly income (sum of all active income sources monthly equivalent) */
    totalMonthlyIncome: number;
    /** Total monthly expenses (sum of all active expenses monthly equivalent) */
    totalMonthlyExpenses: number;
    /** Net cash flow = income - expenses */
    netCashFlow: number;
    /** Savings ratio = (income - expenses) / income * 100 */
    savingsRatio: number;
    /** Total balance across all active accounts */
    totalAccountsBalance: number;
    /** Total remaining debt across all active debts */
    totalDebtRemaining: number;
    /** Debt ratio = totalDebt / totalMonthlyIncome * 100 */
    debtRatio: number;
    /** Emergency coverage = totalBalance / totalMonthlyExpenses (months) */
    emergencyCoverage: number;
    /** Currency used for all KPI values (user's primary currency) */
    currency: string;
}

// ─── Chart data ───────────────────────────────────────────────────────────────

export interface ExpenseByCategoryItem {
    categoryId: string;
    categoryName: string;
    categoryIcon: string;
    categoryColor: string;
    totalAmount: number;
    currency: string;
    percentage: number;
}

export interface MonthlyBarItem {
    month: string; // e.g. "Jan", "Feb"
    income: number;
    expenses: number;
}

// ─── List summaries ───────────────────────────────────────────────────────────

export interface DebtSummary {
    id: string;
    name: string;
    debtType: string;
    remainingAmount: number;
    totalAmount: number;
    monthlyPayment: number;
    progressPercent: number;
    currency: string;
}

export interface AccountSummary {
    id: string;
    name: string;
    accountType: string;
    balance: number;
    currency: string;
}

// ─── Root dashboard data (computed on frontend until backend endpoint exists) ─

export interface DashboardData {
    kpis: DashboardKPIs;
    expensesByCategory: ExpenseByCategoryItem[];
    monthlyTrend: MonthlyBarItem[];
    topDebts: DebtSummary[];
    topAccounts: AccountSummary[];
}
