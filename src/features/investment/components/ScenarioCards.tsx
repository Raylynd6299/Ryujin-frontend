import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingDown, Minus, TrendingUp } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import type { ScenarioSet } from '@/types/investment.types';
import { formatCurrency } from '../utils/calculatorUtils';
import { cn } from '@/lib/utils';

interface Props {
    scenarios: ScenarioSet;
    baseRate: number;
    currency: string;
}

interface ScenarioCardProps {
    title: string;
    rateLabel: string;
    finalValue: number;
    currency: string;
    variant: 'pessimistic' | 'base' | 'optimistic';
}

const SCENARIO_META = {
    pessimistic: {
        icon: TrendingDown,
        badgeClass: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
        valueClass: 'text-red-600 dark:text-red-400',
        cardClass: 'border-red-500/20',
    },
    base: {
        icon: Minus,
        badgeClass: 'bg-primary/10 text-primary border-primary/20',
        valueClass: 'text-primary',
        cardClass: 'border-primary/30 ring-1 ring-primary/10',
    },
    optimistic: {
        icon: TrendingUp,
        badgeClass: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
        valueClass: 'text-green-600 dark:text-green-400',
        cardClass: 'border-green-500/20',
    },
} as const;

const ScenarioCard = ({ title, rateLabel, finalValue, currency, variant }: ScenarioCardProps) => {
    const meta = SCENARIO_META[variant];
    const Icon = meta.icon;

    return (
        <Card className={cn('flex flex-col', meta.cardClass)}>
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">{title}</CardTitle>
                    <Badge variant="outline" className={cn('text-xs', meta.badgeClass)}>
                        <Icon className="h-3 w-3 mr-1" />
                        {rateLabel}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <p className={cn('text-2xl font-bold tabular-nums', meta.valueClass)}>
                    {formatCurrency(finalValue, currency)}
                </p>
            </CardContent>
        </Card>
    );
};

export const ScenarioCards = ({ scenarios, baseRate, currency }: Props) => {
    const { t } = useTranslation();

    const pessimisticFinal =
        scenarios.pessimistic[scenarios.pessimistic.length - 1].finalValue;
    const baseFinal = scenarios.base[scenarios.base.length - 1].finalValue;
    const optimisticFinal = scenarios.optimistic[scenarios.optimistic.length - 1].finalValue;

    const pessimisticRate = Math.max(0, baseRate - 3);
    const optimisticRate = baseRate + 3;

    return (
        <div className="space-y-3">
            <div>
                <h3 className="text-sm font-semibold">{t('calculator.scenarios')}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                    {t('calculator.scenariosSubtitle')}
                </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
                <ScenarioCard
                    title={t('calculator.pessimistic')}
                    rateLabel={t('calculator.pessimisticRate', { rate: pessimisticRate })}
                    finalValue={pessimisticFinal}
                    currency={currency}
                    variant="pessimistic"
                />
                <ScenarioCard
                    title={t('calculator.base')}
                    rateLabel={t('calculator.baseRate', { rate: baseRate })}
                    finalValue={baseFinal}
                    currency={currency}
                    variant="base"
                />
                <ScenarioCard
                    title={t('calculator.optimistic')}
                    rateLabel={t('calculator.optimisticRate', { rate: optimisticRate })}
                    finalValue={optimisticFinal}
                    currency={currency}
                    variant="optimistic"
                />
            </div>
        </div>
    );
};
