import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';
import type { FinanceIndex, IndexStatus } from '@/types/finance.types';

interface IndexCardProps {
    index: FinanceIndex;
    currency?: string;
}

const RATIO_INDICES = [
    'emergency_coverage',
    'liquidity_ratio',
    'payment_capacity',
];

const PERCENTAGE_INDICES = [
    'savings_ratio',
    'debt_ratio',
    'unnecessary_expense_ratio',
    'investment_ratio',
];

const STATUS_COLORS: Record<IndexStatus, { bg: string; text: string; border: string }> = {
    green: {
        bg: 'bg-emerald-500/10',
        text: 'text-emerald-600 dark:text-emerald-400',
        border: 'border-emerald-500/20',
    },
    yellow: {
        bg: 'bg-amber-500/10',
        text: 'text-amber-600 dark:text-amber-400',
        border: 'border-amber-500/20',
    },
    red: {
        bg: 'bg-red-500/10',
        text: 'text-red-600 dark:text-red-400',
        border: 'border-red-500/20',
    },
};

const formatValue = (index: FinanceIndex, currency?: string): string => {
    const { name, value } = index;

    if (RATIO_INDICES.includes(name)) {
        return `${value.toFixed(1)}x`;
    }

    if (PERCENTAGE_INDICES.includes(name)) {
        return `${value.toFixed(1)}%`;
    }

    if (currency) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    }

    return value.toLocaleString();
};

export const IndexCard = ({ index, currency }: IndexCardProps) => {
    const { t } = useTranslation();
    const colors = STATUS_COLORS[index.status];

    return (
        <Card className="relative overflow-hidden">
            <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                        <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
                            {t(`finance.indices.${index.name}`)}
                        </p>
                        <p className={cn('mt-1 text-2xl font-bold', colors.text)}>
                            {formatValue(index, currency)}
                        </p>
                        {index.label && (
                            <p className="text-muted-foreground mt-1 truncate text-xs">
                                {index.label}
                            </p>
                        )}
                    </div>
                    <div
                        className={cn(
                            'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border',
                            colors.bg,
                            colors.border
                        )}
                        aria-label={`Status: ${index.status}`}
                    >
                        <div
                            className={cn(
                                'h-3 w-3 rounded-full',
                                index.status === 'green' && 'bg-emerald-500',
                                index.status === 'yellow' && 'bg-amber-500',
                                index.status === 'red' && 'bg-red-500'
                            )}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};