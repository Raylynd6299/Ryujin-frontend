import { useState } from 'react';
import { Pencil, Trash2, PlusCircle, List } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { DeleteConfirmDialog } from '@/features/finance/components/shared/DeleteConfirmDialog';
import { GoalForm } from './GoalForm';
import { useUpdateGoal, useDeleteGoal } from '../hooks/useGoals';
import { useTranslation } from '@/hooks/useTranslation';
import type { Goal } from '@/types/goal.types';
import type { GoalFormValues } from './GoalForm';

// ─── Priority badge colors ────────────────────────────────────────────────────

const PRIORITY_VARIANT: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    high: 'destructive',
    medium: 'default',
    low: 'outline',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatAmount = (amount: number, currency: string) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);

const formatDate = (dateStr: string) =>
    new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(
        new Date(dateStr)
    );

// ─── Progress ring (SVG) ──────────────────────────────────────────────────────

const ProgressRing = ({ percent, size = 56 }: { percent: number; size?: number }) => {
    const radius = (size - 8) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (Math.min(percent, 100) / 100) * circumference;

    return (
        <svg width={size} height={size} className="-rotate-90">
            {/* Track */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth={5}
                className="text-secondary"
            />
            {/* Progress */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth={5}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className={percent >= 100 ? 'text-green-500' : 'text-primary'}
                style={{ transition: 'stroke-dashoffset 0.4s ease' }}
            />
        </svg>
    );
};

// ─── Component ────────────────────────────────────────────────────────────────

interface GoalCardProps {
    goal: Goal;
    onAddContribution: (goal: Goal) => void;
    onViewContributions: (goal: Goal) => void;
}

export const GoalCard = ({ goal, onAddContribution, onViewContributions }: GoalCardProps) => {
    const { t } = useTranslation();
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const updateMutation = useUpdateGoal();
    const deleteMutation = useDeleteGoal();

    const handleUpdate = (values: GoalFormValues) => {
        updateMutation.mutate(
            { id: goal.id, data: values },
            { onSuccess: () => setEditOpen(false) }
        );
    };

    const handleDelete = () => {
        deleteMutation.mutate(goal.id, { onSuccess: () => setDeleteOpen(false) });
    };

    const progressClamped = Math.min(goal.progressPercent, 100);
    const icon = goal.icon || '🎯';

    return (
        <>
            <Card className="flex flex-col overflow-hidden">
                <CardContent className="flex-1 space-y-4 pt-5">
                    {/* Header: icon + name + priority + completed badge */}
                    <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                            <span className="text-2xl shrink-0">{icon}</span>
                            <div className="min-w-0">
                                <p className="font-semibold truncate leading-tight">{goal.name}</p>
                                {goal.description && (
                                    <p className="text-xs text-muted-foreground truncate">
                                        {goal.description}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-1 shrink-0">
                            <Badge variant={PRIORITY_VARIANT[goal.priority]}>
                                {t(`goals.priorities.${goal.priority}`)}
                            </Badge>
                            {goal.isCompleted && (
                                <Badge variant="secondary" className="text-green-500 border-green-500">
                                    {t('goals.completed')}
                                </Badge>
                            )}
                        </div>
                    </div>

                    {/* Progress ring + amounts */}
                    <div className="flex items-center gap-4">
                        <div className="relative flex items-center justify-center">
                            <ProgressRing percent={progressClamped} size={56} />
                            <span className="absolute text-[10px] font-bold">
                                {progressClamped.toFixed(0)}%
                            </span>
                        </div>
                        <div className="flex-1 space-y-1">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">{t('goals.contributed')}</span>
                                <span className="font-medium text-primary">
                                    {formatAmount(goal.totalContributed, goal.currency)}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">{t('goals.target')}</span>
                                <span className="font-medium">
                                    {formatAmount(goal.targetAmount, goal.currency)}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">{t('goals.missing')}</span>
                                <span className="font-medium text-muted-foreground">
                                    {formatAmount(goal.missingAmount, goal.currency)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Deadline / Estimated Completion */}
                    {(goal.deadline ?? goal.estimatedCompletion) && (
                        <div className="flex justify-between text-xs text-muted-foreground border-t pt-3">
                            {goal.deadline && (
                                <span>
                                    {t('goals.deadline')}: <strong>{formatDate(goal.deadline)}</strong>
                                </span>
                            )}
                            {goal.estimatedCompletion && !goal.isCompleted && (
                                <span>
                                    {t('goals.estimatedCompletion')}:{' '}
                                    <strong>{formatDate(goal.estimatedCompletion)}</strong>
                                </span>
                            )}
                        </div>
                    )}
                </CardContent>

                <CardFooter className="flex gap-2 border-t pt-3 pb-4">
                    {/* Contribute */}
                    {!goal.isCompleted && (
                        <Button
                            size="sm"
                            variant="default"
                            className="flex-1"
                            onClick={() => onAddContribution(goal)}
                        >
                            <PlusCircle className="mr-1.5 h-4 w-4" />
                            {t('goals.addContribution')}
                        </Button>
                    )}

                    {/* View contributions */}
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onViewContributions(goal)}
                    >
                        <List className="h-4 w-4" />
                    </Button>

                    {/* Edit */}
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditOpen(true)}
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>

                    {/* Delete */}
                    <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:text-destructive"
                        onClick={() => setDeleteOpen(true)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </CardFooter>
            </Card>

            {/* Edit Sheet */}
            <Sheet open={editOpen} onOpenChange={setEditOpen}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>{t('goals.editGoal')}</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6 px-1">
                        <GoalForm
                            defaultValues={goal}
                            onSubmit={handleUpdate}
                            isPending={updateMutation.isPending}
                            isEdit
                        />
                    </div>
                </SheetContent>
            </Sheet>

            {/* Delete confirm */}
            <DeleteConfirmDialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                onConfirm={handleDelete}
                isPending={deleteMutation.isPending}
                itemName={goal.name}
            />
        </>
    );
};
