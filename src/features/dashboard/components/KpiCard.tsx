import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

interface KpiCardProps {
    title: string;
    value: string;
    subtitle?: string;
    icon: LucideIcon;
    trend?: 'positive' | 'negative' | 'neutral';
    className?: string;
}

export const KpiCard = ({
    title,
    value,
    subtitle,
    icon: Icon,
    trend = 'neutral',
    className,
}: KpiCardProps) => {
    return (
        <Card className={cn('relative overflow-hidden glow-card', className)}>
            <CardContent className="p-5">
                <div className="flex items-start justify-between">
                    <div className="space-y-1 min-w-0">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide truncate">
                            {title}
                        </p>
                        <p
                            className={cn(
                                'text-2xl font-bold tabular-nums truncate',
                                trend === 'positive' && 'text-emerald-500',
                                trend === 'negative' && 'text-red-500',
                                trend === 'neutral' && 'text-foreground',
                            )}
                        >
                            {value}
                        </p>
                        {subtitle && (
                            <p className="text-xs text-muted-foreground truncate">{subtitle}</p>
                        )}
                    </div>

                    <div
                        className={cn(
                            'shrink-0 rounded-xl p-2.5 ml-3',
                            trend === 'positive' && 'bg-emerald-500/10 text-emerald-500',
                            trend === 'negative' && 'bg-red-500/10 text-red-500',
                            trend === 'neutral' && 'bg-primary/10 text-primary',
                        )}
                    >
                        <Icon className="h-5 w-5" />
                    </div>
                </div>

                {/* Subtle background accent */}
                <div
                    className={cn(
                        'absolute -bottom-4 -right-4 h-20 w-20 rounded-full opacity-5',
                        trend === 'positive' && 'bg-emerald-500',
                        trend === 'negative' && 'bg-red-500',
                        trend === 'neutral' && 'bg-primary',
                    )}
                />
            </CardContent>
        </Card>
    );
};
