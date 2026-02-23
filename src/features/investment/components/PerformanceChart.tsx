import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
} from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslation } from '@/hooks/useTranslation';
import type { PortfolioPerformance } from '@/types/investment.types';

interface PerformanceChartProps {
    performance: PortfolioPerformance | undefined;
    isLoading: boolean;
    currency?: string;
}

const fmt2 = (cents: number) => (cents / 100).toFixed(2);

export const PerformanceChart = ({ performance, isLoading, currency }: PerformanceChartProps) => {
    const { t } = useTranslation();

    if (isLoading) {
        return <Skeleton className="h-64 w-full rounded-lg" />;
    }

    const holdings = performance?.holdings ?? [];
    const filtered = currency
        ? holdings.filter((h) => h.currency === currency)
        : holdings;

    if (filtered.length === 0) {
        return (
            <div className="flex h-64 items-center justify-center rounded-lg border">
                <p className="text-muted-foreground text-sm">{t('investment.noHoldings')}</p>
            </div>
        );
    }

    const data = filtered.map((h) => ({
        symbol: h.symbol,
        invested: parseFloat(fmt2(h.totalInvestedCents)),
        currentValue: h.currentValueCents !== null ? parseFloat(fmt2(h.currentValueCents)) : null,
        pnl: h.unrealizedGainLossCents,
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 4, right: 16, left: 16, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="symbol" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v: number) => `$${v}`} />
                <Tooltip
                    formatter={(value: number, name: string) => [`$${value.toFixed(2)}`, name]}
                />
                <Legend />
                <Bar dataKey="invested" name={t('investment.totalInvested')} fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="currentValue" name={t('investment.totalValue')} radius={[4, 4, 0, 0]}>
                    {data.map((entry, index) => {
                        if (entry.currentValue === null) {
                            return <Cell key={index} fill="#9ca3af" />;
                        }
                        return (
                            <Cell
                                key={index}
                                fill={(entry.pnl ?? 0) >= 0 ? '#22c55e' : '#ef4444'}
                            />
                        );
                    })}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};
