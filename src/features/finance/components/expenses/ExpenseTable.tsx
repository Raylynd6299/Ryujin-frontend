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
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { DeleteConfirmDialog } from '../shared/DeleteConfirmDialog';
import { ExpenseForm } from './ExpenseForm';
import { useUpdateExpense, useDeleteExpense } from '../../hooks/useExpenses';
import { useTranslation } from '@/hooks/useTranslation';
import type { Expense, UpdateExpenseRequest } from '@/types/finance.types';

interface ExpenseTableProps {
    data: Expense[];
}

const PRIORITY_VARIANTS: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    essential: 'default',
    important: 'secondary',
    optional: 'outline',
    low: 'outline',
};

export const ExpenseTable = ({ data }: ExpenseTableProps) => {
    const { t } = useTranslation();
    const [editItem, setEditItem] = useState<Expense | null>(null);
    const [deleteItem, setDeleteItem] = useState<Expense | null>(null);

    const updateMutation = useUpdateExpense();
    const deleteMutation = useDeleteExpense();

    const handleUpdate = (values: UpdateExpenseRequest) => {
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
                            <TableHead>{t('finance.priority')}</TableHead>
                            <TableHead>{t('finance.amount')}</TableHead>
                            <TableHead>{t('finance.monthly')}</TableHead>
                            <TableHead>{t('finance.recurrence')}</TableHead>
                            <TableHead>{t('finance.status')}</TableHead>
                            <TableHead className="w-[50px]">{t('common.actions')}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((expense) => (
                            <TableRow key={expense.id}>
                                <TableCell className="font-medium">
                                    <div className="flex flex-col">
                                        <span>{expense.name}</span>
                                        {expense.isUnnecessary && (
                                            <span className="text-xs text-destructive">
                                                {t('finance.unnecessary')}
                                            </span>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={PRIORITY_VARIANTS[expense.priority] ?? 'outline'}>
                                        {t(`finance.priorities.${expense.priority}`)}
                                    </Badge>
                                </TableCell>
                                <TableCell>{formatAmount(expense.amount, expense.currency)}</TableCell>
                                <TableCell className="text-muted-foreground">
                                    {formatAmount(expense.monthlyEquivalent, expense.currency)}/mo
                                </TableCell>
                                <TableCell>
                                    {t(`finance.recurrences.${expense.recurrence}`)}
                                </TableCell>
                                <TableCell>
                                    <Badge variant={expense.isActive ? 'default' : 'secondary'}>
                                        {expense.isActive ? t('finance.active') : t('finance.inactive')}
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
                                            <DropdownMenuItem onClick={() => setEditItem(expense)}>
                                                <Pencil className="mr-2 h-4 w-4" />
                                                {t('common.edit')}
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => setDeleteItem(expense)}
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
                        <SheetTitle>{t('finance.editExpense')}</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6 px-1">
                        {editItem && (
                            <ExpenseForm
                                defaultValues={editItem}
                                onSubmit={handleUpdate}
                                isPending={updateMutation.isPending}
                                isEdit
                            />
                        )}
                    </div>
                </SheetContent>
            </Sheet>

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
