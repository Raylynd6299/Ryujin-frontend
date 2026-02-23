import { Link } from 'react-router-dom';
import { ArrowRight, Wallet, CreditCard, Banknote, PiggyBank } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { AccountSummary } from '@/types/dashboard.types';

interface AccountListProps {
    accounts: AccountSummary[];
}

const formatAmount = (value: number, currency: string) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value / 100);

const ACCOUNT_TYPE_ICONS: Record<string, LucideIcon> = {
    checking: CreditCard,
    savings: PiggyBank,
    cash: Banknote,
    wallet: Wallet,
};

const ACCOUNT_TYPE_LABELS: Record<string, string> = {
    checking: 'Checking',
    savings: 'Savings',
    cash: 'Cash',
    wallet: 'Wallet',
};

const ACCOUNT_TYPE_COLORS: Record<string, string> = {
    checking: 'bg-violet-500/10 text-violet-500',
    savings: 'bg-emerald-500/10 text-emerald-500',
    cash: 'bg-amber-500/10 text-amber-500',
    wallet: 'bg-sky-500/10 text-sky-500',
};

export const AccountList = ({ accounts }: AccountListProps) => {
    const { t } = useTranslation();

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-base">{t('dashboard.sections.topAccounts')}</CardTitle>
                <Link
                    to="/finance/accounts"
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                    {t('dashboard.accounts.viewAll')}
                    <ArrowRight className="h-3 w-3" />
                </Link>
            </CardHeader>
            <CardContent className="space-y-3">
                {accounts.length === 0 ? (
                    <p className="text-center text-sm text-muted-foreground py-4">
                        {t('dashboard.accounts.noAccounts')}
                    </p>
                ) : (
                    accounts.map((account) => {
                        const Icon = ACCOUNT_TYPE_ICONS[account.accountType] ?? Wallet;
                        const colorClass = ACCOUNT_TYPE_COLORS[account.accountType] ?? 'bg-primary/10 text-primary';
                        const label = ACCOUNT_TYPE_LABELS[account.accountType] ?? account.accountType;

                        return (
                            <div
                                key={account.id}
                                className="flex items-center gap-3"
                            >
                                <div className={cn('rounded-lg p-2 shrink-0', colorClass)}>
                                    <Icon className="h-4 w-4" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium truncate">{account.name}</p>
                                    <p className="text-xs text-muted-foreground">{label}</p>
                                </div>
                                <p className={cn(
                                    'text-sm font-semibold tabular-nums shrink-0',
                                    account.balance >= 0 ? 'text-emerald-500' : 'text-red-500',
                                )}>
                                    {formatAmount(account.balance, account.currency)}
                                </p>
                            </div>
                        );
                    })
                )}
            </CardContent>
        </Card>
    );
};
