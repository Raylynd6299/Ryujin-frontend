import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { ExpenseByCategoryItem } from '@/types/dashboard.types';

interface ExpenseByCategoryChartProps {
    data: ExpenseByCategoryItem[];
    currency: string;
}

// Violet-first palette that matches the Ryujin brand
const CHART_COLORS = [
    '#a78bfa', // violet-400
    '#7c3aed', // violet-600
    '#c084fc', // purple-400
    '#38bdf8', // sky-400
    '#34d399', // emerald-400
    '#f472b6', // pink-400
    '#fb923c', // orange-400
    '#facc15', // yellow-400
];

const formatAmount = (value: number, currency: string) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value / 100); // amounts are in cents

interface TooltipPayloadEntry {
    name: string;
    value: number;
    payload: ExpenseByCategoryItem;
}

const CustomTooltip = ({
    active,
    payload,
    currency,
}: {
    active?: boolean;
    payload?: TooltipPayloadEntry[];
    currency: string;
}) => {
    if (!active || !payload?.length) return null;
    const item = payload[0].payload;
    return (
        <div className="rounded-lg border bg-card px-3 py-2 text-sm shadow-lg">
            <p className="font-medium">{item.categoryName}</p>
            <p className="text-muted-foreground">
                {formatAmount(item.totalAmount, currency)} · {item.percentage}%
            </p>
        </div>
    );
};

export const ExpenseByCategoryChart = ({ data, currency }: ExpenseByCategoryChartProps) => {
    const { t } = useTranslation();

    if (data.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">{t('dashboard.sections.expensesByCategory')}</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center py-10">
                    <p className="text-sm text-muted-foreground">{t('dashboard.charts.noExpenseData')}</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">{t('dashboard.sections.expensesByCategory')}</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={95}
                            paddingAngle={3}
                            dataKey="totalAmount"
                            nameKey="categoryName"
                        >
                            {data.map((_, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                                    stroke="transparent"
                                />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip currency={currency} />} />
                        <Legend
                            iconType="circle"
                            iconSize={8}
                            formatter={(value) => (
                                <span className="text-xs text-muted-foreground">{value}</span>
                            )}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};
