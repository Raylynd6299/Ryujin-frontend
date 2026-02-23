import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { RotateCcw } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useCalculator } from '../hooks/useCalculator';
import { CalculatorResults } from '../components/CalculatorResults';
import { CalculatorChart } from '../components/CalculatorChart';
import { ScenarioCards } from '../components/ScenarioCards';
import { CalculatorBreakdownTable } from '../components/CalculatorBreakdownTable';
import { GoalManager } from '../components/GoalManager';
import { MetricTooltip } from '@/components/shared/MetricTooltip';
import { SUPPORTED_CURRENCIES } from '../utils/calculatorUtils';
import type { CompoundingFrequency } from '@/types/investment.types';

// ─── Form field sub-component ─────────────────────────────────────────────────

interface FormFieldProps {
    id: string;
    label: React.ReactNode;
    value: string;
    onChange: (v: string) => void;
    min?: string;
    step?: string;
    placeholder?: string;
}

const FormField = ({
    id,
    label,
    value,
    onChange,
    min = '0',
    step = '1',
    placeholder,
}: FormFieldProps) => (
    <div className="space-y-1.5">
        <Label htmlFor={id} className="text-sm">
            {label}
        </Label>
        <Input
            id={id}
            type="number"
            min={min}
            step={step}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="tabular-nums"
        />
    </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

export const CalculatorPage = (): React.ReactElement => {
    const { t } = useTranslation();
    const calc = useCalculator();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">{t('calculator.title')}</h1>
                <p className="text-muted-foreground text-sm">{t('calculator.subtitle')}</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* ─── Inputs ─────────────────────────────────────────────── */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-base">{t('calculator.calculate')}</CardTitle>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={calc.reset}
                                className="h-7 gap-1.5 text-xs text-muted-foreground"
                            >
                                <RotateCcw className="h-3 w-3" />
                                {t('calculator.reset')}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FormField
                            id="initial"
                            label={
                                <MetricTooltip
                                    label={t('calculator.initialInvestment')}
                                    tooltip={t('calculator.initialInvestmentTooltip')}
                                />
                            }
                            value={calc.initialStr}
                            onChange={calc.setInitialStr}
                            step="100"
                            placeholder="10000"
                        />
                        <FormField
                            id="monthly"
                            label={
                                <MetricTooltip
                                    label={t('calculator.monthlyContribution')}
                                    tooltip={t('calculator.monthlyContributionTooltip')}
                                />
                            }
                            value={calc.monthlyStr}
                            onChange={calc.setMonthlyStr}
                            step="50"
                            placeholder="500"
                        />
                        <FormField
                            id="rate"
                            label={
                                <MetricTooltip
                                    label={t('calculator.annualReturn')}
                                    tooltip={t('calculator.annualReturnTooltip')}
                                />
                            }
                            value={calc.rateStr}
                            onChange={calc.setRateStr}
                            step="0.1"
                            placeholder="8"
                        />
                        <FormField
                            id="years"
                            label={
                                <MetricTooltip
                                    label={t('calculator.timePeriod')}
                                    tooltip={t('calculator.timePeriodTooltip')}
                                />
                            }
                            value={calc.yearsStr}
                            onChange={calc.setYearsStr}
                            min="1"
                            step="1"
                            placeholder="10"
                        />
                        <FormField
                            id="inflation"
                            label={
                                <MetricTooltip
                                    label={t('calculator.inflationRate')}
                                    tooltip={t('calculator.inflationRateTooltip')}
                                />
                            }
                            value={calc.inflationStr}
                            onChange={calc.setInflationStr}
                            step="0.1"
                            placeholder="3.5"
                        />

                        {/* Compounding */}
                        <div className="space-y-1.5">
                            <Label htmlFor="compounding" className="text-sm">
                                <MetricTooltip
                                    label={t('calculator.compounding')}
                                    tooltip={t('calculator.compoundingTooltip')}
                                />
                            </Label>
                            <Select
                                value={calc.compounding}
                                onValueChange={(v) =>
                                    calc.setCompounding(v as CompoundingFrequency)
                                }
                            >
                                <SelectTrigger id="compounding">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="monthly">
                                        {t('calculator.monthly')}
                                    </SelectItem>
                                    <SelectItem value="quarterly">
                                        {t('calculator.quarterly')}
                                    </SelectItem>
                                    <SelectItem value="annually">
                                        {t('calculator.annually')}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Currency selector */}
                        <div className="space-y-1.5">
                            <Label htmlFor="currency" className="text-sm">
                                <MetricTooltip
                                    label={t('calculator.currency')}
                                    tooltip={t('calculator.currencyTooltip')}
                                />
                            </Label>
                            <Select value={calc.currency} onValueChange={calc.setCurrency}>
                                <SelectTrigger id="currency">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {SUPPORTED_CURRENCIES.map((c) => (
                                        <SelectItem key={c.code} value={c.code}>
                                            {c.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* ─── Results ─────────────────────────────────────────────── */}
                <CalculatorResults
                    finalPoint={calc.finalPoint}
                    inputs={calc.inputs}
                    cagr={calc.cagr}
                />
            </div>

            {/* ─── Scenarios ────────────────────────────────────────────────── */}
            <ScenarioCards
                scenarios={calc.scenarios}
                baseRate={calc.inputs.annualReturnRate}
                currency={calc.inputs.currency}
            />

            {/* ─── Goals ────────────────────────────────────────────────────── */}
            <GoalManager
                goals={calc.goals}
                resolvedGoals={calc.resolvedGoals}
                currency={calc.inputs.currency}
                onAdd={calc.addGoal}
                onUpdate={calc.updateGoal}
                onRemove={calc.removeGoal}
            />

            {/* ─── Growth chart ──────────────────────────────────────────────── */}
            <CalculatorChart
                data={calc.activeChartData}
                currency={calc.inputs.currency}
                scenarios={calc.activeScenarios}
                resolvedGoals={calc.resolvedGoals}
                granularity={calc.granularity}
                onGranularityChange={calc.setGranularity}
            />

            {/* ─── Year-by-year breakdown ────────────────────────────────────── */}
            <CalculatorBreakdownTable
                data={calc.activeChartData}
                currency={calc.inputs.currency}
                granularity={calc.granularity}
            />
        </div>
    );
};
