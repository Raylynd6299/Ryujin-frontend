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
import { MoreHorizontal, Pencil, PowerOff, Trash2 } from 'lucide-react';
import { DeleteConfirmDialog } from '../shared/DeleteConfirmDialog';
import { IncomeForm } from './IncomeForm';
import { DeactivateIncomeDialog } from './DeactivateIncomeDialog';
import { useUpdateIncome, useDeleteIncome } from '../../hooks/useIncomes';
import { useTranslation } from '@/hooks/useTranslation';
import type { IncomeSource, UpdateIncomeSourceRequest } from '@/types/finance.types';

interface IncomeTableProps {
    data: IncomeSource[];
}

export const IncomeTable = ({ data }: IncomeTableProps) => {
    const { t } = useTranslation();
    const [editItem, setEditItem] = useState<IncomeSource | null>(null);
    const [deleteItem, setDeleteItem] = useState<IncomeSource | null>(null);
    const [deactivateItem, setDeactivateItem] = useState<IncomeSource | null>(null);

    const updateMutation = useUpdateIncome();
    const deleteMutation = useDeleteIncome();

    const handleUpdate = (values: UpdateIncomeSourceRequest) => {
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
                            <TableHead>{t('finance.incomeType')}</TableHead>
                            <TableHead>{t('finance.amount')}</TableHead>
                            <TableHead>{t('finance.monthly')}</TableHead>
                            <TableHead>{t('finance.recurrence')}</TableHead>
                            <TableHead>{t('finance.status')}</TableHead>
                            <TableHead className="w-[50px]">{t('common.actions')}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((income) => (
                            <TableRow key={income.id}>
                                <TableCell className="font-medium">{income.name}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">
                                        {t(`finance.incomeTypes.${income.incomeType}`)}
                                    </Badge>
                                </TableCell>
                                <TableCell>{formatAmount(income.amount, income.currency)}</TableCell>
                                <TableCell className="text-muted-foreground">
                                    {formatAmount(income.monthlyEquivalent, income.currency)}/mo
                                </TableCell>
                                <TableCell>
                                    {t(`finance.recurrences.${income.recurrence}`)}
                                </TableCell>
                                <TableCell>
                                    <Badge variant={income.isActive ? 'default' : 'secondary'}>
                                        {income.isActive ? t('finance.active') : t('finance.inactive')}
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
                                            <DropdownMenuItem onClick={() => setEditItem(income)}>
                                                <Pencil className="mr-2 h-4 w-4" />
                                                {t('common.edit')}
                                            </DropdownMenuItem>
                                            {income.isActive && (
                                                <DropdownMenuItem
                                                    onClick={() => setDeactivateItem(income)}
                                                >
                                                    <PowerOff className="mr-2 h-4 w-4" />
                                                    {t('finance.deactivate')}
                                                </DropdownMenuItem>
                                            )}
                                            <DropdownMenuItem
                                                onClick={() => setDeleteItem(income)}
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
                        <SheetTitle>{t('finance.editIncome')}</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6 px-1">
                        {editItem && (
                            <IncomeForm
                                defaultValues={editItem}
                                onSubmit={handleUpdate}
                                isPending={updateMutation.isPending}
                                isEdit
                            />
                        )}
                    </div>
                </SheetContent>
            </Sheet>

            {/* Deactivate Dialog */}
            {deactivateItem && (
                <DeactivateIncomeDialog
                    income={deactivateItem}
                    open={!!deactivateItem}
                    onOpenChange={(open) => !open && setDeactivateItem(null)}
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
