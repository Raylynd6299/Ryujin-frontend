import { Pencil, Trash2, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/hooks/useTranslation';
import type { Holding, AssetType } from '@/types/investment.types';

interface HoldingCardProps {
    holding: Holding;
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

const fmtPct = (pct: number) => `${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%`;

const pnlColor = (value: number | null) => {
    if (value === null) return 'text-muted-foreground';
    return value >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
};

export const HoldingCard = ({ holding, onEdit, onDelete, onRefresh }: HoldingCardProps) => {
    const { t } = useTranslation();

    const qty = holding.quantityFloat.toFixed(
        holding.quantityFloat % 1 === 0 ? 0 : Math.min(4, (holding.quantityFloat.toString().split('.')[1] ?? '').length)
    );

    const pricedLabel = holding.pricedAt
        ? `${t('investment.pricedAt')}: ${new Date(holding.pricedAt).toLocaleDateString()}`
        : t('investment.neverPriced');

    return (
        <Card className="gap-3 py-4">
            <CardHeader className="pb-0">
                <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                        <p className="text-lg font-bold leading-tight">{holding.symbol}</p>
                        <p className="text-muted-foreground truncate text-sm">{holding.name}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1">
                        <Badge className={ASSET_TYPE_COLORS[holding.assetType]}>
                            {t(`investment.assetTypes.${holding.assetType}`)}
                        </Badge>
                        <span className="text-muted-foreground text-xs">{holding.currency}</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                    <div>
                        <span className="text-muted-foreground">{t('investment.quantity')}: </span>
                        <span className="font-medium">{qty}</span>
                    </div>
                    <div>
                        <span className="text-muted-foreground">{t('investment.buyPrice')}: </span>
                        <span className="font-medium">{fmt2(holding.buyPriceCents, holding.currency)}</span>
                    </div>
                    <div>
                        <span className="text-muted-foreground">{t('investment.currentPrice')}: </span>
                        <span className="font-medium">
                            {holding.currentPriceCents !== null
                                ? fmt2(holding.currentPriceCents, holding.currency)
                                : t('investment.noPrice')}
                        </span>
                    </div>
                    <div>
                        <span className="text-muted-foreground">{t('investment.marketValue')}: </span>
                        <span className="font-medium">
                            {holding.marketValueCents !== null
                                ? fmt2(holding.marketValueCents, holding.currency)
                                : '—'}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                    <span className={`font-semibold ${pnlColor(holding.unrealizedGainLossCents)}`}>
                        {holding.unrealizedGainLossCents !== null
                            ? fmt2(holding.unrealizedGainLossCents, holding.currency)
                            : '—'}
                    </span>
                    {holding.unrealizedGainLossPct !== null && (
                        <span className={`text-xs ${pnlColor(holding.unrealizedGainLossPct)}`}>
                            {fmtPct(holding.unrealizedGainLossPct)}
                        </span>
                    )}
                </div>

                <p className="text-muted-foreground text-xs">{pricedLabel}</p>

                <div className="flex justify-end gap-1 pt-1">
                    <Button variant="ghost" size="icon" onClick={() => onRefresh(holding.id)} title={t('investment.refreshPrice')}>
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onEdit(holding)} title={t('common.edit')}>
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(holding.id)} title={t('common.delete')}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};
