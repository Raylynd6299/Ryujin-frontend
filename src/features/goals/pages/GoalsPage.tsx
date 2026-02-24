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
import { GoalCard } from '../components/GoalCard';
import { GoalForm } from '../components/GoalForm';
import { ContributionDialog } from '../components/ContributionDialog';
import { ContributionsDrawer } from '../components/ContributionsDrawer';
import { useGoals, useCreateGoal } from '../hooks/useGoals';
import { useTranslation } from '@/hooks/useTranslation';
import type { Goal } from '@/types/goal.types';
import type { GoalFormValues } from '../components/GoalForm';

export const GoalsPage = () => {
    const { t } = useTranslation();
    const [createOpen, setCreateOpen] = useState(false);
    const [page, setPage] = useState(1);

    // Contribution dialog state (add contribution)
    const [contributionGoal, setContributionGoal] = useState<Goal | null>(null);
    // Contributions drawer state (list contributions)
    const [drawerGoal, setDrawerGoal] = useState<Goal | null>(null);

    const { data, isLoading } = useGoals({ page, limit: 12 });
    const createMutation = useCreateGoal();

    const handleCreate = (values: GoalFormValues) => {
        createMutation.mutate(values, { onSuccess: () => setCreateOpen(false) });
    };

    const goals = data?.data ?? [];
    const totalPages = data?.totalPages ?? 1;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">{t('navigation.goals')}</h1>
                    <p className="text-muted-foreground">{t('goals.pageDescription')}</p>
                </div>

                <Sheet open={createOpen} onOpenChange={setCreateOpen}>
                    <SheetTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            {t('goals.addGoal')}
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>{t('goals.addGoal')}</SheetTitle>
                        </SheetHeader>
                        <div className="mt-6 px-1">
                            <GoalForm
                                onSubmit={handleCreate}
                                isPending={createMutation.isPending}
                            />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Content */}
            {isLoading ? (
                <div className="flex items-center justify-center py-16">
                    <p className="text-muted-foreground">{t('common.loading')}</p>
                </div>
            ) : goals.length > 0 ? (
                <>
                    {/* Goal cards grid */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {goals.map((goal) => (
                            <GoalCard
                                key={goal.id}
                                goal={goal}
                                onAddContribution={setContributionGoal}
                                onViewContributions={setDrawerGoal}
                            />
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center gap-2">
                            <Button
                                variant="outline"
                                disabled={page === 1}
                                onClick={() => setPage((p) => p - 1)}
                            >
                                {t('common.previous')}
                            </Button>
                            <span className="flex items-center px-4 text-sm text-muted-foreground">
                                {page} / {totalPages}
                            </span>
                            <Button
                                variant="outline"
                                disabled={page === totalPages}
                                onClick={() => setPage((p) => p + 1)}
                            >
                                {t('common.next')}
                            </Button>
                        </div>
                    )}
                </>
            ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <span className="text-5xl mb-4">🎯</span>
                    <p className="text-muted-foreground">{t('goals.noGoals')}</p>
                    <Button className="mt-4" onClick={() => setCreateOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        {t('goals.addFirstGoal')}
                    </Button>
                </div>
            )}

            {/* Add Contribution Dialog */}
            {contributionGoal && (
                <ContributionDialog
                    goal={contributionGoal}
                    open={!!contributionGoal}
                    onOpenChange={(o) => !o && setContributionGoal(null)}
                />
            )}

            {/* Contributions Drawer */}
            {drawerGoal && (
                <ContributionsDrawer
                    goal={drawerGoal}
                    open={!!drawerGoal}
                    onOpenChange={(o) => !o && setDrawerGoal(null)}
                />
            )}
        </div>
    );
};
