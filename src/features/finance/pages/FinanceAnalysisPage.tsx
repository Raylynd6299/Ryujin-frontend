import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useFinanceIndices } from '../hooks/useFinanceIndices';
import { IndexCard } from '../components/shared/IndexCard';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

const SummarySkeleton = () => (
    <Card>
        <CardContent className="p-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-2 h-8 w-32" />
        </CardContent>
    </Card>
);

const IndexCardSkeleton = () => (
    <Card>
        <CardContent className="p-4">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="mt-2 h-7 w-24" />
                    <Skeleton className="mt-1 h-3 w-16" />
                </div>
                <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
            </div>
        </CardContent>
    </Card>
);

const formatCurrency = (value: number, currency: string): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

export const FinanceAnalysisPage = (): React.ReactElement => {
    const { t } = useTranslation();
    const { indices, currencyWarning, summary, isLoading, isError, refetch } = useFinanceIndices();

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold">{t('finance.analysis.title')}</h1>
                    <p className="text-muted-foreground">{t('finance.analysis.description')}</p>
                </div>
                <div className="text-muted-foreground py-4">{t('finance.analysis.loading')}</div>
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <SummarySkeleton />
                    <SummarySkeleton />
                    <SummarySkeleton />
                    <SummarySkeleton />
                </div>
                <h2 className="text-xl font-semibold">{t('finance.analysis.indicesTitle')}</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 9 }).map((_, i) => (
                        <IndexCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold">{t('finance.analysis.title')}</h1>
                    <p className="text-muted-foreground">{t('finance.analysis.description')}</p>
                </div>
                <Card className="border-destructive/50 bg-destructive/5">
                    <CardContent className="flex flex-col items-center gap-4 py-12">
                        <AlertCircle className="text-destructive h-12 w-12" />
                        <div className="text-center">
                            <p className="font-medium text-destructive">{t('finance.analysis.error')}</p>
                        </div>
                        <Button variant="outline" onClick={() => refetch()}>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            {t('finance.analysis.retry')}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const hasData = indices.length > 0;

    const summaryCards = summary
        ? [
              { label: t('finance.analysis.summary.totalIncome'), value: formatCurrency(summary.totalIncomeDecimal, summary.currency), positive: true },
              { label: t('finance.analysis.summary.totalExpenses'), value: formatCurrency(summary.totalExpensesDecimal, summary.currency), positive: false },
              { label: t('finance.analysis.summary.netCashFlow'), value: formatCurrency(summary.netCashFlowDecimal, summary.currency), positive: summary.netCashFlowDecimal >= 0 },
              { label: t('finance.analysis.summary.savingsAmount'), value: formatCurrency(summary.savingsAmountDecimal, summary.currency), positive: summary.savingsAmountDecimal >= 0 },
          ]
        : [];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">{t('finance.analysis.title')}</h1>
                <p className="text-muted-foreground">{t('finance.analysis.description')}</p>
            </div>

            {currencyWarning && (
                <Card className="border-amber-500/30 bg-amber-500/5">
                    <CardContent className="flex items-center gap-3 py-3">
                        <AlertCircle className="text-amber-600 dark:text-amber-400 h-5 w-5 shrink-0" />
                        <p className="text-amber-700 dark:text-amber-300 text-sm">
                            {t('finance.analysis.currencyWarning')}
                        </p>
                    </CardContent>
                </Card>
            )}

            {summaryCards.length > 0 && (
                <>
                    <h2 className="text-xl font-semibold">{t('finance.analysis.summaryTitle')}</h2>
                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                        {summaryCards.map((card, index) => (
                            <Card key={index}>
                                <CardContent className="p-4">
                                    <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
                                        {card.label}
                                    </p>
                                    <p
                                        className={cn(
                                            'mt-1 text-2xl font-bold',
                                            card.positive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                                        )}
                                    >
                                        {card.value}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </>
            )}

            <h2 className="text-xl font-semibold">{t('finance.analysis.indicesTitle')}</h2>

            {hasData ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {indices.map((index) => (
                        <IndexCard key={index.name} index={index} currency={summary?.currency} />
                    ))}
                </div>
            ) : (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                        <p className="text-muted-foreground">{t('finance.analysis.noData')}</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};