import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HoldingTable } from '../components/HoldingTable';
import { HoldingDialogs } from '../components/HoldingDialogs';
import { PortfolioSummaryCard } from '../components/PortfolioSummaryCard';
import { useHoldings, useDeleteHolding, useRefreshHoldingPrice } from '../hooks/useHoldings';
import { usePortfolioSummary } from '../hooks/usePortfolio';
import { useTranslation } from '@/hooks/useTranslation';
import type { Holding } from '@/types/investment.types';

const PAGE_LIMIT = 20;

export const PortfolioPage = () => {
    const { t } = useTranslation();

    const [page, setPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [editHolding, setEditHolding] = useState<Holding | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Holding | null>(null);

    const { data, isLoading } = useHoldings({ page, limit: PAGE_LIMIT });
    const { data: summary, isLoading: summaryLoading } = usePortfolioSummary();
    const deleteMutation = useDeleteHolding();
    const refreshMutation = useRefreshHoldingPrice();

    const holdings = data?.holdings ?? [];
    const totalPages = Math.ceil((data?.total ?? 0) / PAGE_LIMIT);

    const handleEdit = (holding: Holding) => {
        setEditHolding(holding);
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setEditHolding(null);
    };

    const handleDelete = () => {
        if (!deleteTarget) return;
        deleteMutation.mutate(deleteTarget.id, { onSuccess: () => setDeleteTarget(null) });
    };

    const handleRequestDelete = (id: string) => {
        const h = holdings.find((hh) => hh.id === id);
        if (h) setDeleteTarget(h);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">{t('navigation.portfolio')}</h1>
                    <p className="text-muted-foreground text-sm">{t('investment.holdings')}</p>
                </div>
                <Button onClick={() => { setEditHolding(null); setModalOpen(true); }}>
                    <Plus className="mr-2 h-4 w-4" />
                    {t('investment.addHolding')}
                </Button>
            </div>

            <PortfolioSummaryCard summary={summary} isLoading={summaryLoading} />

            <HoldingTable
                holdings={holdings}
                isLoading={isLoading}
                onEdit={handleEdit}
                onDelete={handleRequestDelete}
                onRefresh={(id) => refreshMutation.mutate(id)}
            />

            {totalPages > 1 && (
                <div className="flex justify-center gap-2">
                    <Button variant="outline" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
                        {t('common.previous')}
                    </Button>
                    <span className="flex items-center px-4 text-sm text-muted-foreground">
                        {page} / {totalPages}
                    </span>
                    <Button variant="outline" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
                        {t('common.next')}
                    </Button>
                </div>
            )}

            <HoldingDialogs
                modalOpen={modalOpen}
                editHolding={editHolding}
                deleteTarget={deleteTarget}
                isDeleting={deleteMutation.isPending}
                onModalClose={handleModalClose}
                onDeleteConfirm={handleDelete}
                onDeleteCancel={() => setDeleteTarget(null)}
            />
        </div>
    );
};
