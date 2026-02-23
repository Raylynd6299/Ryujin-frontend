import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslation } from '@/hooks/useTranslation';
import type { StockQuote } from '@/types/investment.types';

interface StockQuoteCardProps {
    quote: StockQuote;
    isLoading?: false;
}

interface StockQuoteCardLoadingProps {
    isLoading: true;
    quote?: undefined;
}

type Props = StockQuoteCardProps | StockQuoteCardLoadingProps;

const fmt = (value: number, currency = 'USD') =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency, minimumFractionDigits: 2 }).format(value);

const fmtNum = (value: number, decimals = 2) =>
    value === 0 ? '—' : value.toFixed(decimals);

const fmtLarge = (value: number, currency = 'USD') => {
    if (value === 0) return '—';
    if (value >= 1_000_000_000_000)
        return `${fmt(value / 1_000_000_000_000, currency).replace(/\.\d+/, '')}T`;
    if (value >= 1_000_000_000)
        return `${fmt(value / 1_000_000_000, currency).replace(/\.\d+/, '')}B`;
    if (value >= 1_000_000)
        return `${fmt(value / 1_000_000, currency).replace(/\.\d+/, '')}M`;
    return fmt(value, currency);
};

const MetricCell = ({ label, value }: { label: string; value: string }) => (
    <div className="space-y-0.5">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium tabular-nums">{value}</p>
    </div>
);

export const StockQuoteCard = ({ quote, isLoading }: Props) => {
    const { t } = useTranslation();

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-5 w-32" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <Skeleton key={i} className="h-10" />
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    }

    const changePositive = quote.changePct >= 0;
    const changeClass = changePositive
        ? 'text-green-600 dark:text-green-400'
        : 'text-red-600 dark:text-red-400';

    const fetchedDate = new Date(quote.fetchedAt).toLocaleString();

    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-lg font-bold tracking-wide">
                                {quote.symbol}
                            </span>
                            <Badge
                                variant={quote.isFresh ? 'default' : 'secondary'}
                                className="text-xs"
                            >
                                {quote.isFresh
                                    ? t('investment.stockAnalysis.live')
                                    : t('investment.stockAnalysis.cached')}
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5">{quote.name}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-3xl font-bold tabular-nums">
                            {fmt(quote.regularMarketPrice, quote.currency)}
                        </p>
                        <p className={`text-sm font-medium tabular-nums ${changeClass}`}>
                            {changePositive ? '+' : ''}
                            {fmt(quote.changeAmount, quote.currency)} (
                            {changePositive ? '+' : ''}
                            {quote.changePct.toFixed(2)}%)
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{fetchedDate}</p>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <CardTitle className="text-sm mb-3 text-muted-foreground">
                    {t('investment.stockAnalysis.quote')}
                </CardTitle>
                <div className="grid grid-cols-3 gap-x-6 gap-y-4 sm:grid-cols-4 lg:grid-cols-6">
                    <MetricCell
                        label={t('investment.stockAnalysis.open')}
                        value={fmt(quote.open, quote.currency)}
                    />
                    <MetricCell
                        label={t('investment.stockAnalysis.high')}
                        value={fmt(quote.dayHigh, quote.currency)}
                    />
                    <MetricCell
                        label={t('investment.stockAnalysis.low')}
                        value={fmt(quote.dayLow, quote.currency)}
                    />
                    <MetricCell
                        label={t('investment.stockAnalysis.volume')}
                        value={
                            quote.volume > 0
                                ? new Intl.NumberFormat('en-US', { notation: 'compact' }).format(
                                      quote.volume
                                  )
                                : '—'
                        }
                    />
                    <MetricCell
                        label={t('investment.stockAnalysis.marketCap')}
                        value={fmtLarge(quote.marketCap / 100, quote.currency)}
                    />
                    <MetricCell
                        label={t('investment.stockAnalysis.week52High')}
                        value={fmt(quote.fiftyTwoWeekHigh, quote.currency)}
                    />
                    <MetricCell
                        label={t('investment.stockAnalysis.week52Low')}
                        value={fmt(quote.fiftyTwoWeekLow, quote.currency)}
                    />
                    <MetricCell
                        label={t('investment.stockAnalysis.pe')}
                        value={fmtNum(quote.trailingPE)}
                    />
                    <MetricCell
                        label={t('investment.stockAnalysis.forwardPE')}
                        value={fmtNum(quote.forwardPE)}
                    />
                    <MetricCell
                        label={t('investment.stockAnalysis.eps')}
                        value={fmtNum(quote.eps)}
                    />
                    <MetricCell
                        label={t('investment.stockAnalysis.dividendYield')}
                        value={
                            quote.dividendYield > 0
                                ? `${(quote.dividendYield * 100).toFixed(2)}%`
                                : '—'
                        }
                    />
                    <MetricCell
                        label={t('investment.previousClose', { defaultValue: 'Prev. Close' })}
                        value={fmt(quote.previousClose, quote.currency)}
                    />
                </div>
            </CardContent>
        </Card>
    );
};
