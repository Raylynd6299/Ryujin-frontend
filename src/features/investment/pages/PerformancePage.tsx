import { useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { PortfolioSummaryCard } from '../components/PortfolioSummaryCard';
import { PerformanceChart } from '../components/PerformanceChart';
import { usePortfolioSummary, usePortfolioPerformance } from '../hooks/usePortfolio';
import { useTranslation } from '@/hooks/useTranslation';

const ALL_CURRENCIES = '__all__';

export const PerformancePage = () => {
    const { t } = useTranslation();
    const [selectedCurrency, setSelectedCurrency] = useState<string>(ALL_CURRENCIES);

    const { data: summary, isLoading: summaryLoading } = usePortfolioSummary();
    const { data: performance, isLoading: perfLoading } = usePortfolioPerformance();

    const currencies = summary?.subtotals.map((s) => s.currency) ?? [];
    const showCurrencyFilter = currencies.length > 1;

    const chartCurrency = selectedCurrency === ALL_CURRENCIES ? undefined : selectedCurrency;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                    <h1 className="text-2xl font-bold">{t('navigation.performance')}</h1>
                    <p className="text-muted-foreground text-sm">{t('investment.performance')}</p>
                </div>

                {showCurrencyFilter && (
                    <div className="flex items-center gap-2">
                        <span className="text-muted-foreground text-sm">{t('investment.currency')}:</span>
                        <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                            <SelectTrigger className="w-[120px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={ALL_CURRENCIES}>{t('common.filter')} (All)</SelectItem>
                                {currencies.map((cur) => (
                                    <SelectItem key={cur} value={cur}>
                                        {cur}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}
            </div>

            <PortfolioSummaryCard summary={summary} isLoading={summaryLoading} />

            <PerformanceChart
                performance={performance}
                isLoading={perfLoading}
                currency={chartCurrency}
            />
        </div>
    );
};
