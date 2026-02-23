import {
    TrendingUp,
    TrendingDown,
    ArrowUpDown,
    PiggyBank,
    Landmark,
    CreditCard,
    BarChart3,
    Shield,
} from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useDashboard } from '../hooks/useDashboard';
import { KpiCard } from '../components/KpiCard';
import { ExpenseByCategoryChart } from '../components/ExpenseByCategoryChart';
import { IncomeExpenseChart } from '../components/IncomeExpenseChart';
import { DebtList } from '../components/DebtList';
import { AccountList } from '../components/AccountList';
import { Skeleton } from '@/components/ui/skeleton';

// ─── Formatters ───────────────────────────────────────────────────────────────

const formatCurrency = (value: number, currency: string) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value / 100);

const formatPercent = (value: number) => `${value.toFixed(1)}%`;
const formatMonths = (value: number) => `${value.toFixed(1)} mo`;

// ─── Trend helpers ────────────────────────────────────────────────────────────

type Trend = 'positive' | 'negative' | 'neutral';

/** Returns neutral when there's no meaningful data (everything is zero) */
const hasData = (kpis: NonNullable<ReturnType<typeof useDashboard>['data']>['kpis'] | undefined): boolean =>
    !!kpis && (
        kpis.totalMonthlyIncome > 0 ||
        kpis.totalMonthlyExpenses > 0 ||
        kpis.totalAccountsBalance > 0 ||
        kpis.totalDebtRemaining > 0
    );

const cashFlowTrend = (kpis: NonNullable<ReturnType<typeof useDashboard>['data']>['kpis'] | undefined, dataExists: boolean): Trend => {
    if (!dataExists || !kpis) return 'neutral';
    if (kpis.netCashFlow > 0) return 'positive';
    if (kpis.netCashFlow < 0) return 'negative';
    return 'neutral';
};

const savingsTrend = (kpis: NonNullable<ReturnType<typeof useDashboard>['data']>['kpis'] | undefined, dataExists: boolean): Trend => {
    if (!dataExists || !kpis || kpis.totalMonthlyIncome === 0) return 'neutral';
    if (kpis.savingsRatio >= 20) return 'positive';
    if (kpis.savingsRatio >= 0) return 'neutral';
    return 'negative';
};

const debtTrend = (kpis: NonNullable<ReturnType<typeof useDashboard>['data']>['kpis'] | undefined, dataExists: boolean): Trend => {
    if (!dataExists || !kpis) return 'neutral';
    if (kpis.totalDebtRemaining === 0) return 'neutral'; // no debts is just neutral — not a meaningful positive
    return 'negative';
};

const debtRatioTrend = (kpis: NonNullable<ReturnType<typeof useDashboard>['data']>['kpis'] | undefined, dataExists: boolean): Trend => {
    if (!dataExists || !kpis || kpis.totalMonthlyIncome === 0) return 'neutral';
    if (kpis.debtRatio <= 30) return 'positive';
    if (kpis.debtRatio <= 50) return 'neutral';
    return 'negative';
};

const emergencyTrend = (kpis: NonNullable<ReturnType<typeof useDashboard>['data']>['kpis'] | undefined, dataExists: boolean): Trend => {
    if (!dataExists || !kpis || kpis.totalMonthlyExpenses === 0) return 'neutral';
    if (kpis.emergencyCoverage >= 6) return 'positive';
    if (kpis.emergencyCoverage >= 3) return 'neutral';
    return 'negative';
};

// ─── Skeleton Loading ─────────────────────────────────────────────────────────

const DashboardSkeleton = () => (
    <div className="space-y-6">
        <div>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="mt-2 h-4 w-64" />
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-24 rounded-xl" />
            ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
            <Skeleton className="h-72 rounded-xl" />
            <Skeleton className="h-72 rounded-xl" />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
            <Skeleton className="h-64 rounded-xl" />
            <Skeleton className="h-64 rounded-xl" />
        </div>
    </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

export const DashboardPage = () => {
    const { t } = useTranslation();
    const { data, isLoading, isError, errors } = useDashboard();

    if (isLoading) return <DashboardSkeleton />;

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 py-20">
                <p className="text-muted-foreground">{t('dashboard.error')}</p>
                {import.meta.env.DEV && errors.length > 0 && (
                    <pre className="max-w-lg rounded-lg bg-destructive/10 p-4 text-xs text-destructive">
                        {errors.map((e) => (e as Error)?.message ?? String(e)).join('\n')}
                    </pre>
                )}
            </div>
        );
    }

    const kpis = data?.kpis;
    const currency = kpis?.currency ?? 'USD';
    const dataExists = hasData(kpis);

    // ── Value helpers: show '—' when no meaningful data ──────────────────────
    const fmtCurrency = (val: number) =>
        dataExists ? formatCurrency(val, currency) : '—';
    const fmtPercent = (val: number, hasIncome: boolean) =>
        dataExists && hasIncome ? formatPercent(val) : '—';
    const fmtMonths = (val: number, hasExpenses: boolean) =>
        dataExists && hasExpenses ? formatMonths(val) : '—';

    const hasIncome = (kpis?.totalMonthlyIncome ?? 0) > 0;
    const hasExpenses = (kpis?.totalMonthlyExpenses ?? 0) > 0;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">{t('dashboard.title')}</h1>
                <p className="mt-1 text-sm text-muted-foreground">{t('dashboard.subtitle')}</p>
            </div>

            {/* KPI Grid — 2 cols on mobile, 4 on desktop */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <KpiCard
                    title={t('dashboard.kpis.monthlyIncome')}
                    value={fmtCurrency(kpis?.totalMonthlyIncome ?? 0)}
                    icon={TrendingUp}
                    trend={dataExists && hasIncome ? 'positive' : 'neutral'}
                />
                <KpiCard
                    title={t('dashboard.kpis.monthlyExpenses')}
                    value={fmtCurrency(kpis?.totalMonthlyExpenses ?? 0)}
                    icon={TrendingDown}
                    trend={dataExists && hasExpenses ? 'negative' : 'neutral'}
                />
                <KpiCard
                    title={t('dashboard.kpis.netCashFlow')}
                    value={fmtCurrency(kpis?.netCashFlow ?? 0)}
                    subtitle={dataExists && kpis
                        ? kpis.netCashFlow > 0
                            ? t('dashboard.units.positive')
                            : kpis.netCashFlow < 0
                                ? t('dashboard.units.negative')
                                : undefined
                        : undefined}
                    icon={ArrowUpDown}
                    trend={cashFlowTrend(kpis, dataExists)}
                />
                <KpiCard
                    title={t('dashboard.kpis.savingsRatio')}
                    value={fmtPercent(kpis?.savingsRatio ?? 0, hasIncome)}
                    subtitle={dataExists && hasIncome ? t('dashboard.units.ofIncome') : undefined}
                    icon={PiggyBank}
                    trend={savingsTrend(kpis, dataExists)}
                />
                <KpiCard
                    title={t('dashboard.kpis.totalBalance')}
                    value={fmtCurrency(kpis?.totalAccountsBalance ?? 0)}
                    icon={Landmark}
                    trend="neutral"
                />
                <KpiCard
                    title={t('dashboard.kpis.totalDebt')}
                    value={fmtCurrency(kpis?.totalDebtRemaining ?? 0)}
                    icon={CreditCard}
                    trend={debtTrend(kpis, dataExists)}
                />
                <KpiCard
                    title={t('dashboard.kpis.debtRatio')}
                    value={fmtPercent(kpis?.debtRatio ?? 0, hasIncome)}
                    subtitle={dataExists && hasIncome ? t('dashboard.units.ofIncome') : undefined}
                    icon={BarChart3}
                    trend={debtRatioTrend(kpis, dataExists)}
                />
                <KpiCard
                    title={t('dashboard.kpis.emergencyCoverage')}
                    value={fmtMonths(kpis?.emergencyCoverage ?? 0, hasExpenses)}
                    subtitle={dataExists && hasExpenses
                        ? t('dashboard.units.months', { count: kpis?.emergencyCoverage ?? 0 })
                        : undefined}
                    icon={Shield}
                    trend={emergencyTrend(kpis, dataExists)}
                />
            </div>

            {/* Charts row */}
            <div className="grid gap-4 lg:grid-cols-2">
                <ExpenseByCategoryChart
                    data={data?.expensesByCategory ?? []}
                    currency={currency}
                />
                <IncomeExpenseChart
                    data={data?.monthlyTrend ?? []}
                    currency={currency}
                />
            </div>

            {/* Lists row */}
            <div className="grid gap-4 lg:grid-cols-2">
                <DebtList debts={data?.topDebts ?? []} />
                <AccountList accounts={data?.topAccounts ?? []} />
            </div>
        </div>
    );
};
