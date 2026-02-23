import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
import type { ChartGranularity, EnrichedDataPoint } from '@/types/investment.types';
import { formatCurrency } from '../utils/calculatorUtils';
import { cn } from '@/lib/utils';

interface Props {
    data: EnrichedDataPoint[];
    currency: string;
    granularity?: ChartGranularity;
}

/**
 * Yearly mode: show every year if ≤ 15 years; otherwise show every 5 years + final year.
 * Monthly mode: show annual snapshots (month 12, 24, 36...) — same as yearly but from monthly data.
 */
const filterRows = (data: EnrichedDataPoint[], granularity: ChartGranularity): EnrichedDataPoint[] => {
    if (granularity === 'monthly') {
        // Pick month indices that are multiples of 12 (annual snapshots), skip month 0
        return data.filter((d) => (d.monthIndex ?? 0) > 0 && (d.monthIndex ?? 0) % 12 === 0);
    }
    const totalYears = data[data.length - 1]?.year ?? 0;
    if (totalYears <= 15) return data.filter((d) => d.year > 0);
    return data.filter((d) => d.year > 0 && (d.year % 5 === 0 || d.year === totalYears));
};

export const CalculatorBreakdownTable = ({ data, currency, granularity = 'yearly' }: Props) => {
    const { t } = useTranslation();
    const rows = filterRows(data, granularity);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">{t('calculator.breakdown')}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-16">{t('calculator.breakdownYear')}</TableHead>
                                <TableHead className="text-right">
                                    {t('calculator.breakdownTotalInvested')}
                                </TableHead>
                                <TableHead className="text-right">
                                    {t('calculator.breakdownFinalValue')}
                                </TableHead>
                                <TableHead className="text-right">
                                    {t('calculator.breakdownGains')}
                                </TableHead>
                                <TableHead className="text-right">
                                    {t('calculator.breakdownRealValue')}
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={granularity === 'monthly' ? row.monthIndex : row.year}>
                                    <TableCell className="font-medium">
                                        {granularity === 'monthly'
                                            ? `Yr ${Math.floor((row.monthIndex ?? 0) / 12)}`
                                            : row.year}
                                    </TableCell>
                                    <TableCell className="text-right tabular-nums text-sm">
                                        {formatCurrency(row.totalInvested, currency)}
                                    </TableCell>
                                    <TableCell className="text-right tabular-nums text-sm font-semibold">
                                        {formatCurrency(row.finalValue, currency)}
                                    </TableCell>
                                    <TableCell
                                        className={cn(
                                            'text-right tabular-nums text-sm',
                                            row.gains > 0
                                                ? 'text-green-600 dark:text-green-400'
                                                : 'text-muted-foreground',
                                        )}
                                    >
                                        {formatCurrency(row.gains, currency)}
                                    </TableCell>
                                    <TableCell className="text-right tabular-nums text-sm text-muted-foreground">
                                        {formatCurrency(row.realValue, currency)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};

