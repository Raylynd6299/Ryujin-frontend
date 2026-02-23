import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { MonthlyBarItem } from '@/types/dashboard.types';

interface IncomeExpenseChartProps {
    data: MonthlyBarItem[];
    currency: string;
}

const formatK = (value: number) => {
    // value is in cents
    const dollars = value / 100;
    if (dollars >= 1_000_000) return `${(dollars / 1_000_000).toFixed(1)}M`;
    if (dollars >= 1_000) return `${(dollars / 1_000).toFixed(0)}k`;
    return `${dollars.toFixed(0)}`;
};

interface TooltipPayloadEntry {
    name: string;
    value: number;
    color: string;
}

const CustomTooltip = ({
    active,
    payload,
    label,
    currency,
}: {
    active?: boolean;
    payload?: TooltipPayloadEntry[];
    label?: string;
    currency: string;
}) => {
    if (!active || !payload?.length) return null;

    const fmt = (v: number) =>
        new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(v / 100);

    return (
        <div className="rounded-lg border bg-card px-3 py-2 text-sm shadow-lg space-y-1">
            <p className="font-medium">{label}</p>
            {payload.map((entry) => (
                <p key={entry.name} style={{ color: entry.color }}>
                    {entry.name}: {fmt(entry.value)}
                </p>
            ))}
        </div>
    );
};

export const IncomeExpenseChart = ({ data, currency }: IncomeExpenseChartProps) => {
    const { t } = useTranslation();

    // Show empty state when there's no meaningful data (all zeros)
    const hasAnyData = data.some((d) => d.income > 0 || d.expenses > 0);

    if (data.length === 0 || !hasAnyData) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">{t('dashboard.sections.incomeVsExpenses')}</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center py-10">
                    <p className="text-sm text-muted-foreground">{t('dashboard.charts.noIncomeData')}</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">{t('dashboard.sections.incomeVsExpenses')}</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={data} barCategoryGap="30%" barGap={4}>
                        <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.08} />
                        <XAxis
                            dataKey="month"
                            tick={{ fontSize: 11 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            tickFormatter={formatK}
                            tick={{ fontSize: 11 }}
                            axisLine={false}
                            tickLine={false}
                            width={40}
                        />
                        <Tooltip content={<CustomTooltip currency={currency} />} />
                        <Legend
                            iconType="circle"
                            iconSize={8}
                            formatter={(value) => (
                                <span className="text-xs text-muted-foreground">{value}</span>
                            )}
                        />
                        <Bar
                            dataKey="income"
                            name={t('dashboard.charts.income')}
                            fill="#a78bfa"
                            radius={[4, 4, 0, 0]}
                        />
                        <Bar
                            dataKey="expenses"
                            name={t('dashboard.charts.expenses')}
                            fill="#f472b6"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};
