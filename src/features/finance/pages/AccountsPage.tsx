import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { AccountTable } from '../components/accounts/AccountTable';
import { AccountForm } from '../components/accounts/AccountForm';
import { useAccounts, useCreateAccount } from '../hooks/useAccounts';
import { useTranslation } from '@/hooks/useTranslation';
import type { CreateAccountFormValues } from '../components/accounts/AccountForm';

export const AccountsPage = () => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1);

    const { data, isLoading } = useAccounts({ page, limit: 20 });
    const createMutation = useCreateAccount();

    const handleCreate = (values: CreateAccountFormValues) => {
        createMutation.mutate(values, { onSuccess: () => setOpen(false) });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">{t('navigation.accounts')}</h1>
                    <p className="text-muted-foreground">{t('finance.accountsDescription')}</p>
                </div>
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            {t('finance.addAccount')}
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>{t('finance.addAccount')}</SheetTitle>
                        </SheetHeader>
                        <div className="mt-6 px-1">
                            <AccountForm
                                onSubmit={handleCreate}
                                isPending={createMutation.isPending}
                            />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <p className="text-muted-foreground">{t('common.loading')}</p>
                </div>
            ) : data?.data && data.data.length > 0 ? (
                <>
                    <AccountTable data={data.data} />
                    {data.totalPages > 1 && (
                        <div className="flex justify-center gap-2">
                            <Button
                                variant="outline"
                                disabled={page === 1}
                                onClick={() => setPage((p) => p - 1)}
                            >
                                {t('common.previous')}
                            </Button>
                            <span className="flex items-center px-4 text-sm text-muted-foreground">
                                {page} / {data.totalPages}
                            </span>
                            <Button
                                variant="outline"
                                disabled={page === data.totalPages}
                                onClick={() => setPage((p) => p + 1)}
                            >
                                {t('common.next')}
                            </Button>
                        </div>
                    )}
                </>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <p className="text-muted-foreground">{t('finance.noAccounts')}</p>
                    <Button className="mt-4" onClick={() => setOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        {t('finance.addFirstAccount')}
                    </Button>
                </div>
            )}
        </div>
    );
};
