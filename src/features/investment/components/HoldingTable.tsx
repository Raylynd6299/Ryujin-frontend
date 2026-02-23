import { Pencil, Trash2, RefreshCw } from 'lucide-react';
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
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslation } from '@/hooks/useTranslation';
import type { Holding, AssetType } from '@/types/investment.types';

interface HoldingTableProps {
    holdings: Holding[];
    isLoading: boolean;
    onEdit: (holding: Holding) => void;
    onDelete: (id: string) => void;
    onRefresh: (id: string) => void;
}

const ASSET_TYPE_COLORS: Record<AssetType, string> = {
    stock: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    etf: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    fixed_income: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    crypto: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    reit: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
};

const fmt2 = (cents: number, currency: string) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(cents / 100);

const fmtQty = (h: Holding) => {
    const decimals = h.quantityFloat % 1 === 0 ? 0 : Math.min(4, (h.quantityFloat.toString().split('.')[1] ?? '').length);
    return h.quantityFloat.toFixed(decimals);
};

const pnlClass = (value: number | null) => {
    if (value === null) return 'text-muted-foreground';
    return value >= 0 ? 'text-green-600 dark:text-green-400 font-medium' : 'text-red-600 dark:text-red-400 font-medium';
};

const SKELETON_ROWS = 5;

export const HoldingTable = ({ holdings, isLoading, onEdit, onDelete, onRefresh }: HoldingTableProps) => {
    const { t } = useTranslation();

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('investment.symbol')}</TableHead>
                        <TableHead className="hidden sm:table-cell">{t('investment.name')}</TableHead>
                        <TableHead className="hidden md:table-cell">{t('investment.assetType')}</TableHead>
                        <TableHead className="hidden sm:table-cell">{t('investment.quantity')}</TableHead>
                        <TableHead className="hidden md:table-cell">{t('investment.buyPrice')}</TableHead>
                        <TableHead>{t('investment.currentPrice')}</TableHead>
                        <TableHead className="hidden sm:table-cell">{t('investment.marketValue')}</TableHead>
                        <TableHead>{t('investment.gainLoss')}</TableHead>
                        <TableHead className="hidden lg:table-cell">P&L %</TableHead>
                        <TableHead className="w-[110px]">{t('common.actions')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        Array.from({ length: SKELETON_ROWS }).map((_, i) => (
                            <TableRow key={i}>
                                {Array.from({ length: 10 }).map((__, j) => (
                                    <TableCell key={j}>
                                        <Skeleton className="h-4 w-full" />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : holdings.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={10} className="py-12 text-center text-muted-foreground">
                                {t('investment.noHoldings')}
                            </TableCell>
                        </TableRow>
                    ) : (
                        holdings.map((h) => (
                            <TableRow key={h.id}>
                                <TableCell className="font-bold">{h.symbol}</TableCell>
                                <TableCell className="hidden max-w-[160px] truncate sm:table-cell text-muted-foreground text-sm">
                                    {h.name}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    <Badge className={ASSET_TYPE_COLORS[h.assetType]}>
                                        {t(`investment.assetTypes.${h.assetType}`)}
                                    </Badge>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">{fmtQty(h)}</TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {fmt2(h.buyPriceCents, h.currency)}
                                </TableCell>
                                <TableCell>
                                    {h.currentPriceCents !== null
                                        ? fmt2(h.currentPriceCents, h.currency)
                                        : <span className="text-muted-foreground text-sm">{t('investment.noPrice')}</span>}
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    {h.marketValueCents !== null ? fmt2(h.marketValueCents, h.currency) : '—'}
                                </TableCell>
                                <TableCell className={pnlClass(h.unrealizedGainLossCents)}>
                                    {h.unrealizedGainLossCents !== null
                                        ? fmt2(h.unrealizedGainLossCents, h.currency)
                                        : '—'}
                                </TableCell>
                                <TableCell className={`hidden lg:table-cell ${pnlClass(h.unrealizedGainLossPct)}`}>
                                    {h.unrealizedGainLossPct !== null
                                        ? `${h.unrealizedGainLossPct >= 0 ? '+' : ''}${h.unrealizedGainLossPct.toFixed(2)}%`
                                        : '—'}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-0.5">
                                        <Button variant="ghost" size="icon" onClick={() => onRefresh(h.id)} title={t('investment.refreshPrice')}>
                                            <RefreshCw className="h-3.5 w-3.5" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => onEdit(h)} title={t('common.edit')}>
                                            <Pencil className="h-3.5 w-3.5" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => onDelete(h.id)} title={t('common.delete')}>
                                            <Trash2 className="h-3.5 w-3.5 text-destructive" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};
