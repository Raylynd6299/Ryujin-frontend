import { Trash2 } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { DeleteConfirmDialog } from '@/features/finance/components/shared/DeleteConfirmDialog';
import { useContributions, useDeleteContribution } from '../hooks/useGoals';
import { useTranslation } from '@/hooks/useTranslation';
import { useState } from 'react';
import type { Goal, GoalContribution } from '@/types/goal.types';

interface ContributionsDrawerProps {
    goal: Goal;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const formatAmount = (amount: number, currency: string) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);

const formatDate = (dateStr: string) =>
    new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(new Date(dateStr));

export const ContributionsDrawer = ({ goal, open, onOpenChange }: ContributionsDrawerProps) => {
    const { t } = useTranslation();
    const [deleteItem, setDeleteItem] = useState<GoalContribution | null>(null);

    const { data, isLoading } = useContributions(goal.id);
    const deleteMutation = useDeleteContribution(goal.id);

    const handleDelete = () => {
        if (!deleteItem) return;
        deleteMutation.mutate(deleteItem.id, { onSuccess: () => setDeleteItem(null) });
    };

    const contributions = data?.data ?? [];

    return (
        <>
            <Sheet open={open} onOpenChange={onOpenChange}>
                <SheetContent className="flex flex-col">
                    <SheetHeader>
                        <SheetTitle>
                            {goal.icon && <span className="mr-2">{goal.icon}</span>}
                            {t('goals.contributions')} — {goal.name}
                        </SheetTitle>
                    </SheetHeader>

                    <div className="mt-4 flex-1 overflow-y-auto space-y-2 pr-1">
                        {isLoading ? (
                            <p className="text-sm text-muted-foreground py-6 text-center">
                                {t('common.loading')}
                            </p>
                        ) : contributions.length === 0 ? (
                            <p className="text-sm text-muted-foreground py-6 text-center">
                                {t('goals.noContributions')}
                            </p>
                        ) : (
                            contributions.map((c) => (
                                <div
                                    key={c.id}
                                    className="flex items-center justify-between rounded-lg border p-3"
                                >
                                    <div className="min-w-0">
                                        <p className="font-medium text-sm">
                                            {formatAmount(c.amount, c.currency)}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {formatDate(c.date)}
                                        </p>
                                        {c.notes && (
                                            <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                                                {c.notes}
                                            </p>
                                        )}
                                    </div>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="shrink-0 text-destructive hover:text-destructive"
                                        onClick={() => setDeleteItem(c)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Total */}
                    {contributions.length > 0 && (
                        <div className="border-t pt-3 mt-2 flex justify-between text-sm font-medium">
                            <span>{t('common.total')}</span>
                            <span>{formatAmount(goal.totalContributed, goal.currency)}</span>
                        </div>
                    )}
                </SheetContent>
            </Sheet>

            {/* Delete confirm */}
            <DeleteConfirmDialog
                open={!!deleteItem}
                onOpenChange={(o) => !o && setDeleteItem(null)}
                onConfirm={handleDelete}
                isPending={deleteMutation.isPending}
                itemName={deleteItem
                    ? `${formatAmount(deleteItem.amount, deleteItem.currency)} – ${formatDate(deleteItem.date)}`
                    : undefined}
            />
        </>
    );
};
