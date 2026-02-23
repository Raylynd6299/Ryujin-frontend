import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import type { DebtSummary } from '@/types/dashboard.types';

interface DebtListProps {
    debts: DebtSummary[];
}

const formatAmount = (value: number, currency: string) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value / 100);

const DEBT_TYPE_LABELS: Record<string, string> = {
    credit_card: 'Credit Card',
    personal_loan: 'Personal Loan',
    mortgage: 'Mortgage',
    car_loan: 'Car Loan',
    student_loan: 'Student Loan',
    other: 'Other',
};

export const DebtList = ({ debts }: DebtListProps) => {
    const { t } = useTranslation();

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-base">{t('dashboard.sections.topDebts')}</CardTitle>
                <Link
                    to="/finance/debts"
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                    {t('dashboard.debts.viewAll')}
                    <ArrowRight className="h-3 w-3" />
                </Link>
            </CardHeader>
            <CardContent className="space-y-4">
                {debts.length === 0 ? (
                    <p className="text-center text-sm text-muted-foreground py-4">
                        {t('dashboard.debts.noDebts')}
                    </p>
                ) : (
                    debts.map((debt) => (
                        <div key={debt.id} className="space-y-1.5">
                            <div className="flex items-center justify-between gap-2">
                                <div className="min-w-0">
                                    <p className="text-sm font-medium truncate">{debt.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {DEBT_TYPE_LABELS[debt.debtType] ?? debt.debtType}
                                    </p>
                                </div>
                                <div className="text-right shrink-0">
                                    <p className="text-sm font-semibold tabular-nums text-red-500">
                                        {formatAmount(debt.remainingAmount, debt.currency)}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {t('dashboard.debts.progress', {
                                            percent: Math.round(debt.progressPercent),
                                        })}
                                    </p>
                                </div>
                            </div>
                            <Progress
                                value={debt.progressPercent}
                                className={cn(
                                    'h-1.5',
                                    debt.progressPercent >= 75 && '[&>div]:bg-emerald-500',
                                    debt.progressPercent >= 40 && debt.progressPercent < 75 && '[&>div]:bg-amber-500',
                                    debt.progressPercent < 40 && '[&>div]:bg-red-500',
                                )}
                            />
                        </div>
                    ))
                )}
            </CardContent>
        </Card>
    );
};
