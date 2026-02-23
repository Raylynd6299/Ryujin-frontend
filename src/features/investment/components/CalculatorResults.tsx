import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
import { MetricTooltip } from '@/components/shared/MetricTooltip';
import type { EnrichedDataPoint, CalculatorInputs } from '@/types/investment.types';
import { formatCurrency } from '../utils/calculatorUtils';
import { cn } from '@/lib/utils';

interface Props {
    finalPoint: EnrichedDataPoint;
    inputs: CalculatorInputs;
    cagr: number;
}

interface ResultRowProps {
    label: React.ReactNode;
    value: string;
    large?: boolean;
    positive?: boolean;
    muted?: boolean;
}

const ResultRow = ({ label, value, large, positive, muted }: ResultRowProps) => (
    <div className="flex items-center justify-between py-2 border-b last:border-0">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span
            className={cn(
                'tabular-nums font-semibold',
                large ? 'text-xl' : 'text-base',
                positive === true && 'text-green-600 dark:text-green-400',
                muted && 'text-muted-foreground font-normal text-sm',
            )}
        >
            {value}
        </span>
    </div>
);

export const CalculatorResults = ({ finalPoint, inputs, cagr }: Props) => {
    const { t } = useTranslation();
    const { currency } = inputs;

    const roi =
        finalPoint.totalInvested > 0
            ? ((finalPoint.gains / finalPoint.totalInvested) * 100).toFixed(2)
            : '0.00';

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">{t('calculator.results')}</CardTitle>
            </CardHeader>
            <CardContent className="divide-y">
                <ResultRow
                    label={
                        <MetricTooltip
                            label={t('calculator.finalValue')}
                            tooltip={t('calculator.finalValueTooltip')}
                        />
                    }
                    value={formatCurrency(finalPoint.finalValue, currency)}
                    large
                    positive
                />
                <ResultRow
                    label={
                        <MetricTooltip
                            label={t('calculator.totalInvested')}
                            tooltip={t('calculator.totalInvestedTooltip')}
                        />
                    }
                    value={formatCurrency(finalPoint.totalInvested, currency)}
                />
                <ResultRow
                    label={
                        <MetricTooltip
                            label={t('calculator.totalGains')}
                            tooltip={t('calculator.totalGainsTooltip')}
                        />
                    }
                    value={formatCurrency(finalPoint.gains, currency)}
                    positive={finalPoint.gains > 0}
                />
                <ResultRow
                    label={
                        <MetricTooltip
                            label={t('calculator.roi')}
                            tooltip={t('calculator.roiTooltip')}
                        />
                    }
                    value={`${roi}%`}
                    positive={parseFloat(roi) > 0}
                />
                <ResultRow
                    label={
                        <MetricTooltip
                            label={t('calculator.cagr')}
                            tooltip={t('calculator.cagrTooltip')}
                        />
                    }
                    value={`${cagr.toFixed(2)}%`}
                    positive={cagr > 0}
                />
                <ResultRow
                    label={
                        <MetricTooltip
                            label={t('calculator.realValue')}
                            tooltip={t('calculator.realValueTooltip')}
                        />
                    }
                    value={formatCurrency(finalPoint.realValue, currency)}
                    muted
                />
                <div className="pt-3 text-xs text-muted-foreground space-y-0.5">
                    <p>
                        {t('calculator.timePeriod')}: {inputs.timePeriodYears}{' '}
                        {inputs.timePeriodYears === 1 ? t('calculator.yearUnit') : t('calculator.yearsUnit')}
                    </p>
                    <p>
                        {t('calculator.annualReturn')}: {inputs.annualReturnRate}%
                    </p>
                    <p>
                        {t('calculator.inflationRate')}: {inputs.inflationRate}%
                    </p>
                    <p>
                        {t('calculator.compounding')}: {t(`calculator.${inputs.compounding}`)}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};
