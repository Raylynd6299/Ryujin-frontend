import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslation } from '@/hooks/useTranslation';
import type { PortfolioSummary } from '@/types/investment.types';

interface PortfolioSummaryCardProps {
    summary: PortfolioSummary | undefined;
    isLoading: boolean;
}

const fmt2 = (cents: number, currency: string) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(cents / 100);

const pnlClass = (value: number) =>
    value >= 0
        ? 'text-green-600 dark:text-green-400 font-semibold'
        : 'text-red-600 dark:text-red-400 font-semibold';

export const PortfolioSummaryCard = ({ summary, isLoading }: PortfolioSummaryCardProps) => {
    const { t } = useTranslation();

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <Skeleton className="h-5 w-40" />
                </CardHeader>
                <CardContent className="space-y-4">
                    {Array.from({ length: 2 }).map((_, i) => (
                        <div key={i} className="space-y-2">
                            <Skeleton className="h-4 w-20" />
                            <div className="grid grid-cols-3 gap-4">
                                <Skeleton className="h-10" />
                                <Skeleton className="h-10" />
                                <Skeleton className="h-10" />
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        );
    }

    if (!summary) return null;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    {t('investment.portfolio')}
                    <Badge variant="secondary">
                        {summary.totalHoldings} {t('investment.holdingsCount')}
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {summary.subtotals.length === 0 ? (
                    <p className="text-muted-foreground text-sm">{t('investment.noHoldings')}</p>
                ) : (
                    <div className="space-y-4">
                        {summary.subtotals.map((sub) => (
                            <div key={sub.currency} className="rounded-lg border p-4 space-y-3">
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="font-mono text-xs">
                                        {sub.currency}
                                    </Badge>
                                    <span className="text-muted-foreground text-sm">
                                        {sub.holdingsCount} {t('investment.holdingsCount')}
                                    </span>
                                    {sub.holdingsWithoutPrice > 0 && (
                                        <span className="text-yellow-600 dark:text-yellow-400 text-xs">
                                            ⚠ {sub.holdingsWithoutPrice} {t('investment.noPrice')}
                                        </span>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-4">
                                    <div>
                                        <p className="text-muted-foreground text-xs">{t('investment.totalInvested')}</p>
                                        <p className="font-medium">{fmt2(sub.totalInvestedCents, sub.currency)}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-xs">{t('investment.totalValue')}</p>
                                        <p className="font-medium">{fmt2(sub.totalCurrentValueCents, sub.currency)}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-xs">{t('investment.unrealizedPnL')}</p>
                                        <p className={pnlClass(sub.unrealizedGainLossCents)}>
                                            {fmt2(sub.unrealizedGainLossCents, sub.currency)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-xs">P&L %</p>
                                        <p className={pnlClass(sub.unrealizedGainLossPct)}>
                                            {sub.unrealizedGainLossPct >= 0 ? '+' : ''}
                                            {sub.unrealizedGainLossPct.toFixed(2)}%
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
