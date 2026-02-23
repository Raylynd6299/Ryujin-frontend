import React, { useState, useRef } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { useStockQuote, useStockPriceHistory } from '../hooks/useStockAnalysis';
import { StockQuoteCard } from '../components/StockQuoteCard';
import { useTranslation } from '@/hooks/useTranslation';
import type { StockPriceHistory } from '@/types/investment.types';

const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

interface PriceHistoryChartProps {
    symbol: string;
    currency: string;
}

const PriceHistoryChart = ({ symbol, currency }: PriceHistoryChartProps) => {
    const { t } = useTranslation();
    const { data: history, isLoading } = useStockPriceHistory(symbol);

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <Skeleton className="h-5 w-40" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-64 w-full" />
                </CardContent>
            </Card>
        );
    }

    const chartData: StockPriceHistory[] = history ?? [];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">
                    {t('investment.stockAnalysis.priceHistory')}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {chartData.length === 0 ? (
                    <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
                        {t('investment.stockAnalysis.noHistory')}
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height={260}>
                        <LineChart
                            data={chartData}
                            margin={{ top: 4, right: 16, bottom: 4, left: 8 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                            <XAxis
                                dataKey="recordedAt"
                                tickFormatter={formatDate}
                                tick={{ fontSize: 11 }}
                                tickLine={false}
                            />
                            <YAxis
                                dataKey="price"
                                domain={['auto', 'auto']}
                                tick={{ fontSize: 11 }}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(v: number) =>
                                    new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency,
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0,
                                    }).format(v)
                                }
                            />
                            <Tooltip
                                formatter={(value: number) =>
                                    new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency,
                                        minimumFractionDigits: 2,
                                    }).format(value)
                                }
                                labelFormatter={(label: string) =>
                                    new Date(label).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                    })
                                }
                                contentStyle={{
                                    fontSize: 12,
                                    borderRadius: 6,
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="price"
                                stroke="hsl(var(--primary))"
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
        </Card>
    );
};

export const StockAnalysisPage = (): React.ReactElement => {
    const { t } = useTranslation();
    const [inputValue, setInputValue] = useState('');
    const [searchedSymbol, setSearchedSymbol] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const { data: quote, isLoading, isError } = useStockQuote(searchedSymbol);

    const handleSearch = () => {
        const sym = inputValue.trim().toUpperCase();
        if (sym) setSearchedSymbol(sym);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSearch();
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">{t('investment.stockAnalysis.title')}</h1>
                <p className="text-muted-foreground text-sm">
                    {t('navigation.stockAnalysis')}
                </p>
            </div>

            {/* Search bar */}
            <div className="flex gap-2 max-w-md">
                <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={t('investment.stockAnalysis.searchPlaceholder')}
                    className="font-mono uppercase"
                />
                <Button onClick={handleSearch} disabled={inputValue.trim().length === 0}>
                    <Search className="h-4 w-4 mr-2" />
                    {t('investment.stockAnalysis.search')}
                </Button>
            </div>

            {/* Empty state — no search yet */}
            {!searchedSymbol && (
                <Card>
                    <CardContent className="flex h-48 items-center justify-center text-sm text-muted-foreground">
                        {t('investment.stockAnalysis.searchPrompt')}
                    </CardContent>
                </Card>
            )}

            {/* Loading state */}
            {searchedSymbol && isLoading && <StockQuoteCard isLoading />}

            {/* Error / not found */}
            {searchedSymbol && isError && !isLoading && (
                <Card>
                    <CardContent className="flex h-32 items-center justify-center text-sm text-destructive">
                        {t('investment.stockAnalysis.notFound')} — {searchedSymbol}
                    </CardContent>
                </Card>
            )}

            {/* Quote data */}
            {quote && !isLoading && (
                <>
                    <StockQuoteCard quote={quote} />
                    <PriceHistoryChart symbol={quote.symbol} currency={quote.currency} />
                </>
            )}
        </div>
    );
};
