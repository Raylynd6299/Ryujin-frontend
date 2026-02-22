import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { MoreHorizontal, Pencil, RefreshCw, Trash2 } from 'lucide-react';
import { DeleteConfirmDialog } from '../shared/DeleteConfirmDialog';
import { AccountForm } from './AccountForm';
import { UpdateBalanceDialog } from './UpdateBalanceDialog';
import { useUpdateAccount, useDeleteAccount } from '../../hooks/useAccounts';
import { useTranslation } from '@/hooks/useTranslation';
import type { Account, UpdateAccountRequest } from '@/types/finance.types';

interface AccountTableProps {
    data: Account[];
}

export const AccountTable = ({ data }: AccountTableProps) => {
    const { t } = useTranslation();
    const [editItem, setEditItem] = useState<Account | null>(null);
    const [deleteItem, setDeleteItem] = useState<Account | null>(null);
    const [balanceItem, setBalanceItem] = useState<Account | null>(null);

    const updateMutation = useUpdateAccount();
    const deleteMutation = useDeleteAccount();

    const handleUpdate = (values: UpdateAccountRequest) => {
        if (!editItem) return;
        updateMutation.mutate(
            { id: editItem.id, data: values },
            { onSuccess: () => setEditItem(null) }
        );
    };

    const handleDelete = () => {
        if (!deleteItem) return;
        deleteMutation.mutate(deleteItem.id, { onSuccess: () => setDeleteItem(null) });
    };

    const formatAmount = (amount: number, currency: string) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);

    return (
        <>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t('finance.name')}</TableHead>
                            <TableHead>{t('finance.accountType')}</TableHead>
                            <TableHead>{t('finance.balance')}</TableHead>
                            <TableHead>{t('finance.status')}</TableHead>
                            <TableHead className="w-[50px]">{t('common.actions')}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((account) => (
                            <TableRow key={account.id}>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-medium">{account.name}</span>
                                        {account.description && (
                                            <span className="text-xs text-muted-foreground">
                                                {account.description}
                                            </span>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">
                                        {t(`finance.accountTypes.${account.accountType}`)}
                                    </Badge>
                                </TableCell>
                                <TableCell className="font-medium">
                                    {formatAmount(account.balance, account.currency)}
                                </TableCell>
                                <TableCell>
                                    <Badge variant={account.isActive ? 'default' : 'secondary'}>
                                        {account.isActive
                                            ? t('finance.active')
                                            : t('finance.inactive')}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                                onClick={() => setBalanceItem(account)}
                                            >
                                                <RefreshCw className="mr-2 h-4 w-4" />
                                                {t('finance.updateBalance')}
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setEditItem(account)}>
                                                <Pencil className="mr-2 h-4 w-4" />
                                                {t('common.edit')}
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => setDeleteItem(account)}
                                                className="text-destructive focus:text-destructive"
                                            >
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                {t('common.delete')}
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Edit Sheet */}
            <Sheet open={!!editItem} onOpenChange={(open) => !open && setEditItem(null)}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>{t('finance.editAccount')}</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6 px-1">
                        {editItem && (
                            <AccountForm
                                defaultValues={editItem}
                                onSubmit={handleUpdate}
                                isPending={updateMutation.isPending}
                                isEdit
                            />
                        )}
                    </div>
                </SheetContent>
            </Sheet>

            {/* Update Balance Dialog */}
            {balanceItem && (
                <UpdateBalanceDialog
                    account={balanceItem}
                    open={!!balanceItem}
                    onOpenChange={(open) => !open && setBalanceItem(null)}
                />
            )}

            {/* Delete Confirm Dialog */}
            <DeleteConfirmDialog
                open={!!deleteItem}
                onOpenChange={(open) => !open && setDeleteItem(null)}
                onConfirm={handleDelete}
                isPending={deleteMutation.isPending}
                itemName={deleteItem?.name}
            />
        </>
    );
};
