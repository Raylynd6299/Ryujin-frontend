import type {
    CalculatorInputs,
    CalculatorGoal,
    CompoundingFrequency,
    EnrichedDataPoint,
    ResolvedGoal,
    ScenarioSet,
} from '@/types/investment.types';

// ─── Constants ────────────────────────────────────────────────────────────────

export const COMPOUNDING_N: Record<CompoundingFrequency, number> = {
    monthly: 12,
    quarterly: 4,
    annually: 1,
};

export const CALCULATOR_DEFAULTS = {
    initialStr: '10000',
    monthlyStr: '500',
    rateStr: '8',
    yearsStr: '10',
    inflationStr: '3.5',
    currency: 'USD',
    compounding: 'monthly' as CompoundingFrequency,
} as const;

/** ISO 4217 currencies supported by the calculator */
export const SUPPORTED_CURRENCIES = [
    { code: 'USD', label: 'USD — US Dollar' },
    { code: 'EUR', label: 'EUR — Euro' },
    { code: 'GBP', label: 'GBP — British Pound' },
    { code: 'JPY', label: 'JPY — Japanese Yen' },
    { code: 'CAD', label: 'CAD — Canadian Dollar' },
    { code: 'AUD', label: 'AUD — Australian Dollar' },
    { code: 'CHF', label: 'CHF — Swiss Franc' },
    { code: 'MXN', label: 'MXN — Mexican Peso' },
    { code: 'ARS', label: 'ARS — Argentine Peso' },
] as const;

// ─── Core math ────────────────────────────────────────────────────────────────

/**
 * Compute year-by-year growth with compound interest + inflation adjustment.
 *
 * FV = P(1+r/n)^(nt) + PMT × [((1+r/n)^(nt) − 1) / (r/n)]
 * Real value = FV / (1 + inflationRate)^t
 */
export const computeGrowth = (inputs: CalculatorInputs): EnrichedDataPoint[] => {
    const {
        initialInvestment,
        monthlyContribution,
        annualReturnRate,
        timePeriodYears,
        compounding,
        inflationRate,
    } = inputs;

    const r = annualReturnRate / 100;
    const inf = inflationRate / 100;
    const n = COMPOUNDING_N[compounding];
    const pmt = monthlyContribution * (12 / n); // contribution per period
    const points: EnrichedDataPoint[] = [];

    for (let year = 0; year <= timePeriodYears; year++) {
        const growthFactor = Math.pow(1 + r / n, n * year);

        const principalGrowth = initialInvestment * growthFactor;
        const contributionGrowth =
            r === 0 ? pmt * n * year : pmt * ((growthFactor - 1) / (r / n));

        const finalValue = principalGrowth + contributionGrowth;
        const totalInvested = initialInvestment + monthlyContribution * 12 * year;
        const gains = Math.max(0, finalValue - totalInvested);
        const inflationFactor = Math.pow(1 + inf, year);
        const realValue = year === 0 ? finalValue : finalValue / inflationFactor;

        points.push({
            year,
            totalInvested,
            finalValue,
            gains,
            realValue,
            cumulativeContributions: totalInvested,
        });
    }

    return points;
};

/**
 * CAGR = (FV / PV)^(1/t) - 1
 * Returns the rate as a percentage.
 */
export const computeCAGR = (
    initialValue: number,
    finalValue: number,
    years: number,
): number => {
    if (initialValue <= 0 || finalValue <= 0 || years <= 0) return 0;
    return (Math.pow(finalValue / initialValue, 1 / years) - 1) * 100;
};

/**
 * Build three parallel scenarios (pessimistic, base, optimistic) by shifting
 * the annual return rate ±3 percentage points.
 */
export const buildScenarios = (inputs: CalculatorInputs): ScenarioSet => {
    const DELTA = 3;
    return {
        pessimistic: computeGrowth({
            ...inputs,
            annualReturnRate: Math.max(0, inputs.annualReturnRate - DELTA),
        }),
        base: computeGrowth(inputs),
        optimistic: computeGrowth({
            ...inputs,
            annualReturnRate: inputs.annualReturnRate + DELTA,
        }),
    };
};

/**
 * Same as buildScenarios but using month-by-month granularity.
 */
export const buildScenariosMonthly = (inputs: CalculatorInputs): ScenarioSet => {
    const DELTA = 3;
    return {
        pessimistic: computeGrowthMonthly({
            ...inputs,
            annualReturnRate: Math.max(0, inputs.annualReturnRate - DELTA),
        }),
        base: computeGrowthMonthly(inputs),
        optimistic: computeGrowthMonthly({
            ...inputs,
            annualReturnRate: inputs.annualReturnRate + DELTA,
        }),
    };
};

// ─── Formatting helpers ───────────────────────────────────────────────────────

/**
 * Format a monetary value using Intl.NumberFormat.
 * Falls back to USD if the currency code is not supported by the runtime.
 */
export const formatCurrency = (value: number, currency: string): string => {
    try {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    } catch {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    }
};

/**
 * Format a monetary value for chart axis labels (compact: 1.2M, 340K, 500).
 */
export const formatAxisCurrency = (value: number, currency: string): string => {
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K`;
    return formatCurrency(value, currency);
};

/** Safe number parse — returns 0 for NaN or negative values */
export const parseNum = (v: string): number => {
    const n = parseFloat(v);
    return isNaN(n) || n < 0 ? 0 : n;
};

// ─── Goal colors ─────────────────────────────────────────────────────────────

/** Fixed color pool for goals (cycles if >8 goals) */
export const GOAL_COLORS = [
    '#8b5cf6', // violet
    '#f59e0b', // amber
    '#10b981', // emerald
    '#ef4444', // red
    '#3b82f6', // blue
    '#f97316', // orange
    '#ec4899', // pink
    '#14b8a6', // teal
] as const;

export const getGoalColor = (index: number): string =>
    GOAL_COLORS[index % GOAL_COLORS.length];

// ─── Monthly growth ───────────────────────────────────────────────────────────

/**
 * Compute month-by-month growth with compound interest + inflation adjustment.
 * Returns up to timePeriodYears × 12 + 1 data points (month 0 = initial).
 *
 * Uses the same closed-form formula as computeGrowth but with t = month/12.
 */
export const computeGrowthMonthly = (inputs: CalculatorInputs): EnrichedDataPoint[] => {
    const {
        initialInvestment,
        monthlyContribution,
        annualReturnRate,
        timePeriodYears,
        compounding,
        inflationRate,
    } = inputs;

    const r = annualReturnRate / 100;
    const inf = inflationRate / 100;
    const n = COMPOUNDING_N[compounding];
    const pmt = monthlyContribution * (12 / n);
    const totalMonths = timePeriodYears * 12;
    const points: EnrichedDataPoint[] = [];

    for (let m = 0; m <= totalMonths; m++) {
        const t = m / 12; // fractional years
        const growthFactor = Math.pow(1 + r / n, n * t);

        const principalGrowth = initialInvestment * growthFactor;
        const contributionGrowth =
            r === 0 ? pmt * n * t : pmt * ((growthFactor - 1) / (r / n));

        const finalValue = principalGrowth + contributionGrowth;
        const totalInvested = initialInvestment + monthlyContribution * m;
        const gains = Math.max(0, finalValue - totalInvested);
        const inflationFactor = Math.pow(1 + inf, t);
        const realValue = m === 0 ? finalValue : finalValue / inflationFactor;

        const year = Math.floor(m / 12);
        const month = m % 12; // 0 = start of year

        points.push({
            year,
            monthIndex: m,
            label: m === 0 ? 'Start' : month === 0 ? `Yr ${year}` : `Yr ${year}, Mo ${month}`,
            totalInvested,
            finalValue,
            gains,
            realValue,
            cumulativeContributions: totalInvested,
        });
    }

    return points;
};

// ─── Goal resolver ────────────────────────────────────────────────────────────

/**
 * For each goal, scan the data points and find the first point where the goal
 * condition is met.
 *
 * - type 'value': first point where finalValue >= goal.value
 * - type 'percentage': first point where (gains / totalInvested) * 100 >= goal.value
 *
 * Works with both yearly data (no monthIndex) and monthly data (with monthIndex).
 */
export const resolveGoals = (
    goals: CalculatorGoal[],
    data: EnrichedDataPoint[],
): ResolvedGoal[] => {
    return goals.map((goal) => {
        for (const point of data) {
            const met =
                goal.type === 'value'
                    ? point.finalValue >= goal.value
                    : point.totalInvested > 0 &&
                      (point.gains / point.totalInvested) * 100 >= goal.value;

            if (met) {
                // Monthly mode: monthIndex is set; derive year + month within year
                if (point.monthIndex !== undefined) {
                    const totalMonth = point.monthIndex;
                    const yearPart = Math.floor(totalMonth / 12);
                    const monthPart = totalMonth % 12; // 0 = start of year (Jan)
                    return {
                        ...goal,
                        yearReached: yearPart,
                        monthReached: monthPart > 0 ? monthPart : undefined,
                        valueAtReach: point.finalValue,
                    };
                }

                // Yearly mode
                return {
                    ...goal,
                    yearReached: point.year,
                    monthReached: undefined,
                    valueAtReach: point.finalValue,
                };
            }
        }

        return {
            ...goal,
            yearReached: null,
            monthReached: undefined,
            valueAtReach: null,
        };
    });
};
