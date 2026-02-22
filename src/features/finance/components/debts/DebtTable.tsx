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
import { MoreHorizontal, Pencil, CreditCard, Trash2 } from 'lucide-react';
import { DeleteConfirmDialog } from '../shared/DeleteConfirmDialog';
import { DebtForm } from './DebtForm';
import { RecordPaymentDialog } from './RecordPaymentDialog';
import { useUpdateDebt, useDeleteDebt } from '../../hooks/useDebts';
import { useTranslation } from '@/hooks/useTranslation';
import type { Debt, UpdateDebtRequest } from '@/types/finance.types';

interface DebtTableProps {
    data: Debt[];
}

export const DebtTable = ({ data }: DebtTableProps) => {
    const { t } = useTranslation();
    const [editItem, setEditItem] = useState<Debt | null>(null);
    const [deleteItem, setDeleteItem] = useState<Debt | null>(null);
    const [paymentItem, setPaymentItem] = useState<Debt | null>(null);

    const updateMutation = useUpdateDebt();
    const deleteMutation = useDeleteDebt();

    const handleUpdate = (values: UpdateDebtRequest) => {
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
                            <TableHead>{t('finance.debtType')}</TableHead>
                            <TableHead>{t('finance.remainingAmount')}</TableHead>
                            <TableHead>{t('finance.monthlyPayment')}</TableHead>
                            <TableHead>{t('finance.progress')}</TableHead>
                            <TableHead>{t('finance.monthsToPayoff')}</TableHead>
                            <TableHead className="w-[50px]">{t('common.actions')}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((debt) => (
                            <TableRow key={debt.id}>
                                <TableCell className="font-medium">{debt.name}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">
                                        {t(`finance.debtTypes.${debt.debtType}`)}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span>
                                            {formatAmount(debt.remainingAmount, debt.currency)}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            / {formatAmount(debt.totalAmount, debt.currency)}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {formatAmount(debt.monthlyPayment, debt.currency)}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-24 overflow-hidden rounded-full bg-secondary">
                                            <div
                                                className="h-full bg-primary transition-all"
                                                style={{
                                                    width: `${Math.min(debt.progressPercent, 100)}%`,
                                                }}
                                            />
                                        </div>
                                        <span className="text-xs text-muted-foreground">
                                            {debt.progressPercent.toFixed(0)}%
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                    {debt.monthsToPayoff > 0 ? `${debt.monthsToPayoff} mo` : '—'}
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => setPaymentItem(debt)}>
                                                <CreditCard className="mr-2 h-4 w-4" />
                                                {t('finance.recordPayment')}
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setEditItem(debt)}>
                                                <Pencil className="mr-2 h-4 w-4" />
                                                {t('common.edit')}
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => setDeleteItem(debt)}
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
                        <SheetTitle>{t('finance.editDebt')}</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6 px-1">
                        {editItem && (
                            <DebtForm
                                defaultValues={editItem}
                                onSubmit={handleUpdate}
                                isPending={updateMutation.isPending}
                                isEdit
                            />
                        )}
                    </div>
                </SheetContent>
            </Sheet>

            {/* Record Payment Dialog */}
            {paymentItem && (
                <RecordPaymentDialog
                    debt={paymentItem}
                    open={!!paymentItem}
                    onOpenChange={(open) => !open && setPaymentItem(null)}
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
