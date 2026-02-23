import { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ReferenceLine,
} from 'recharts';
import { useTranslation } from '@/hooks/useTranslation';
import type {
    ChartGranularity,
    EnrichedDataPoint,
    ResolvedGoal,
    ScenarioSet,
} from '@/types/investment.types';
import { formatCurrency, formatAxisCurrency } from '../utils/calculatorUtils';

interface Props {
    data: EnrichedDataPoint[];
    currency: string;
    scenarios?: ScenarioSet;
    resolvedGoals?: ResolvedGoal[];
    granularity?: ChartGranularity;
    onGranularityChange?: (v: ChartGranularity) => void;
}

// ─── Internal chart renderer (shared between card and modal) ──────────────────

interface ChartCanvasProps {
    chartData: Record<string, number | string>[];
    currency: string;
    xKey: string;
    granularity: ChartGranularity;
    scenarios: ScenarioSet | undefined;
    resolvedGoals: ResolvedGoal[] | undefined;
    height: number;
    investedKey: string;
    gainsKey: string;
    realValueKey: string;
    pessimisticKey: string;
    optimisticKey: string;
    yearLabel: string;
}

const ChartCanvas = ({
    chartData,
    currency,
    xKey,
    granularity,
    scenarios,
    resolvedGoals,
    height,
    investedKey,
    gainsKey,
    realValueKey,
    pessimisticKey,
    optimisticKey,
    yearLabel,
}: ChartCanvasProps) => {
    const tickFormatter = (value: number): string => {
        if (granularity === 'monthly') {
            return value % 12 === 0 ? `Yr ${value / 12}` : '';
        }
        return String(value);
    };

    return (
        <ResponsiveContainer width="100%" height={height}>
            <AreaChart data={chartData} margin={{ top: 4, right: 16, bottom: 4, left: 8 }}>
                <defs>
                    <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.5} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="colorGains" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.6} />
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="colorRealValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis
                    dataKey={xKey}
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    tickFormatter={tickFormatter}
                    interval={granularity === 'monthly' ? 11 : 'preserveStartEnd'}
                    label={{
                        value: yearLabel,
                        position: 'insideBottom',
                        offset: -2,
                        fontSize: 11,
                    }}
                />
                <YAxis
                    tickFormatter={(v: number) => formatAxisCurrency(v, currency)}
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                />
                <Tooltip
                    labelFormatter={(value: number) => {
                        if (granularity === 'monthly') {
                            const yr = Math.floor(value / 12);
                            const mo = value % 12;
                            if (yr === 0 && mo === 0) return 'Start';
                            return mo === 0 ? `Year ${yr}` : `Year ${yr}, Month ${mo}`;
                        }
                        return `Year ${value}`;
                    }}
                    formatter={(value: number, name: string) => [
                        formatCurrency(value, currency),
                        name,
                    ]}
                    contentStyle={{ fontSize: 12, borderRadius: 6 }}
                />
                <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />

                {/* Stacked: invested + gains */}
                <Area
                    type="monotone"
                    dataKey={investedKey}
                    stackId="base"
                    stroke="hsl(var(--primary))"
                    fill="url(#colorInvested)"
                    strokeWidth={2}
                />
                <Area
                    type="monotone"
                    dataKey={gainsKey}
                    stackId="base"
                    stroke="#22c55e"
                    fill="url(#colorGains)"
                    strokeWidth={2}
                />

                {/* Real value — dashed amber line (not stacked) */}
                <Area
                    type="monotone"
                    dataKey={realValueKey}
                    stackId="real"
                    stroke="#f59e0b"
                    fill="url(#colorRealValue)"
                    strokeWidth={1.5}
                    strokeDasharray="4 3"
                    dot={false}
                />

                {/* Optional scenario lines */}
                {scenarios && (
                    <>
                        <Area
                            type="monotone"
                            dataKey={pessimisticKey}
                            stackId="pess"
                            stroke="#ef4444"
                            fill="transparent"
                            strokeWidth={1.5}
                            strokeDasharray="6 3"
                            dot={false}
                        />
                        <Area
                            type="monotone"
                            dataKey={optimisticKey}
                            stackId="opt"
                            stroke="#10b981"
                            fill="transparent"
                            strokeWidth={1.5}
                            strokeDasharray="6 3"
                            dot={false}
                        />
                    </>
                )}

                {/* Goal reference lines */}
                {resolvedGoals?.map((goal) => {
                    if (goal.yearReached === null || goal.valueAtReach === null) return null;

                    const xPos =
                        granularity === 'monthly'
                            ? Math.floor(goal.yearReached * 12)
                            : Math.floor(goal.yearReached);

                    return (
                        <g key={goal.id}>
                            <ReferenceLine
                                y={goal.type === 'value' ? goal.value : goal.valueAtReach}
                                stroke={goal.color}
                                strokeDasharray="4 3"
                                strokeWidth={1.5}
                                label={{
                                    value: goal.label,
                                    position: 'insideTopRight',
                                    fontSize: 10,
                                    fill: goal.color,
                                }}
                            />
                            <ReferenceLine
                                x={xPos}
                                stroke={goal.color}
                                strokeDasharray="3 3"
                                strokeWidth={1}
                                strokeOpacity={0.6}
                            />
                        </g>
                    );
                })}
            </AreaChart>
        </ResponsiveContainer>
    );
};

// ─── Public component ─────────────────────────────────────────────────────────

export const CalculatorChart = ({
    data,
    currency,
    scenarios,
    resolvedGoals,
    granularity = 'yearly',
    onGranularityChange,
}: Props) => {
    const { t } = useTranslation();
    const [expanded, setExpanded] = useState(false);

    const investedKey = t('calculator.invested');
    const gainsKey = t('calculator.gains');
    const realValueKey = t('calculator.realValueLine');
    const pessimisticKey = t('calculator.pessimistic');
    const optimisticKey = t('calculator.optimistic');
    const yearLabel = t('calculator.year');

    const xKey = granularity === 'monthly' ? 'monthIndex' : 'year';

    const pessMap = new Map(
        scenarios?.pessimistic.map((p) => [
            granularity === 'monthly' ? (p.monthIndex ?? 0) : p.year,
            p.finalValue,
        ]),
    );
    const optMap = new Map(
        scenarios?.optimistic.map((o) => [
            granularity === 'monthly' ? (o.monthIndex ?? 0) : o.year,
            o.finalValue,
        ]),
    );

    const chartData = data.map((d) => {
        const xVal = granularity === 'monthly' ? (d.monthIndex ?? 0) : d.year;
        const row: Record<string, number | string> = {
            [xKey]: xVal,
            label: d.label ?? String(d.year),
            [investedKey]: d.totalInvested,
            [gainsKey]: d.gains,
            [realValueKey]: d.realValue,
        };

        if (scenarios) {
            const p = pessMap.get(xVal);
            const o = optMap.get(xVal);
            if (p !== undefined) row[pessimisticKey] = p;
            if (o !== undefined) row[optimisticKey] = o;
        }

        return row;
    });

    const sharedProps = {
        chartData,
        currency,
        xKey,
        granularity,
        scenarios,
        resolvedGoals,
        investedKey,
        gainsKey,
        realValueKey,
        pessimisticKey,
        optimisticKey,
        yearLabel,
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{t('calculator.growthChart')}</CardTitle>
                        <div className="flex items-center gap-2">
                            {onGranularityChange && (
                                <div className="flex items-center gap-1 rounded-md border p-0.5">
                                    <Button
                                        size="sm"
                                        variant={granularity === 'yearly' ? 'secondary' : 'ghost'}
                                        className="h-6 px-2 text-xs"
                                        onClick={() => onGranularityChange('yearly')}
                                    >
                                        {t('calculator.granularityYearly')}
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant={granularity === 'monthly' ? 'secondary' : 'ghost'}
                                        className="h-6 px-2 text-xs"
                                        onClick={() => onGranularityChange('monthly')}
                                    >
                                        {t('calculator.granularityMonthly')}
                                    </Button>
                                </div>
                            )}
                            <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 w-7 p-0 text-muted-foreground"
                                onClick={() => setExpanded(true)}
                                aria-label={t('calculator.expandChart')}
                            >
                                <Maximize2 className="h-3.5 w-3.5" />
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <ChartCanvas {...sharedProps} height={340} />
                </CardContent>
            </Card>

            <Dialog open={expanded} onOpenChange={setExpanded}>
                <DialogContent className="!max-w-[80vw] w-[80vw] p-6">
                    <DialogHeader>
                        <DialogTitle className="text-base">{t('calculator.growthChart')}</DialogTitle>
                    </DialogHeader>
                    <ChartCanvas {...sharedProps} height={600} />
                </DialogContent>
            </Dialog>
        </>
    );
};
