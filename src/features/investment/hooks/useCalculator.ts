import { useState, useMemo, useCallback, useEffect } from 'react';
import { nanoid } from 'nanoid';
import type {
    CalculatorGoal,
    CalculatorInputs,
    CalculatorPersistedState,
    ChartGranularity,
    CompoundingFrequency,
    EnrichedDataPoint,
    ResolvedGoal,
    ScenarioSet,
} from '@/types/investment.types';
import {
    CALCULATOR_DEFAULTS,
    buildScenarios,
    buildScenariosMonthly,
    computeCAGR,
    computeGrowthMonthly,
    getGoalColor,
    parseNum,
    resolveGoals,
} from '../utils/calculatorUtils';

// ─── Constants ────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'ryujin:calculator:state';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const loadFromStorage = (): Partial<CalculatorPersistedState> => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return {};
        return JSON.parse(raw) as Partial<CalculatorPersistedState>;
    } catch {
        return {};
    }
};

const saveToStorage = (state: CalculatorPersistedState): void => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
        // localStorage might be unavailable — silently ignore
    }
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export interface UseCalculatorReturn {
    // Form field strings (controlled inputs)
    initialStr: string;
    monthlyStr: string;
    rateStr: string;
    yearsStr: string;
    inflationStr: string;
    currency: string;
    compounding: CompoundingFrequency;

    // Setters
    setInitialStr: (v: string) => void;
    setMonthlyStr: (v: string) => void;
    setRateStr: (v: string) => void;
    setYearsStr: (v: string) => void;
    setInflationStr: (v: string) => void;
    setCurrency: (v: string) => void;
    setCompounding: (v: CompoundingFrequency) => void;

    // Derived data
    inputs: CalculatorInputs;
    scenarios: ScenarioSet;
    baseData: EnrichedDataPoint[];
    monthlyData: EnrichedDataPoint[];
    finalPoint: EnrichedDataPoint;
    cagr: number;

    // Goals
    goals: CalculatorGoal[];
    resolvedGoals: ResolvedGoal[];
    addGoal: (goal: Omit<CalculatorGoal, 'id' | 'color'>) => void;
    updateGoal: (id: string, updates: Partial<Omit<CalculatorGoal, 'id' | 'color'>>) => void;
    removeGoal: (id: string) => void;

    // Granularity
    granularity: ChartGranularity;
    setGranularity: (v: ChartGranularity) => void;

    // Active chart data + scenarios (yearly or monthly based on granularity)
    activeChartData: EnrichedDataPoint[];
    activeScenarios: ScenarioSet;

    // Actions
    reset: () => void;
    prefillFromPortfolio: (totalInvestedCents: number, currency: string) => void;
}

export const useCalculator = (): UseCalculatorReturn => {
    const stored = loadFromStorage();

    // ─── Form state ───────────────────────────────────────────────────────────

    const [initialStr, setInitialStr] = useState(
        stored.initialStr ?? CALCULATOR_DEFAULTS.initialStr,
    );
    const [monthlyStr, setMonthlyStr] = useState(
        stored.monthlyStr ?? CALCULATOR_DEFAULTS.monthlyStr,
    );
    const [rateStr, setRateStr] = useState(stored.rateStr ?? CALCULATOR_DEFAULTS.rateStr);
    const [yearsStr, setYearsStr] = useState(stored.yearsStr ?? CALCULATOR_DEFAULTS.yearsStr);
    const [inflationStr, setInflationStr] = useState(
        stored.inflationStr ?? CALCULATOR_DEFAULTS.inflationStr,
    );
    const [currency, setCurrency] = useState(stored.currency ?? CALCULATOR_DEFAULTS.currency);
    const [compounding, setCompounding] = useState<CompoundingFrequency>(
        stored.compounding ?? CALCULATOR_DEFAULTS.compounding,
    );
    const [goals, setGoals] = useState<CalculatorGoal[]>(stored.goals ?? []);
    const [granularity, setGranularity] = useState<ChartGranularity>(
        stored.granularity ?? 'yearly',
    );

    // ─── Persist on every change ──────────────────────────────────────────────

    useEffect(() => {
        saveToStorage({
            initialStr,
            monthlyStr,
            rateStr,
            yearsStr,
            inflationStr,
            currency,
            compounding,
            goals,
            granularity,
        });
    }, [initialStr, monthlyStr, rateStr, yearsStr, inflationStr, currency, compounding, goals, granularity]);

    // ─── Parsed inputs ────────────────────────────────────────────────────────

    const inputs: CalculatorInputs = useMemo(
        () => ({
            initialInvestment: parseNum(initialStr),
            monthlyContribution: parseNum(monthlyStr),
            annualReturnRate: parseNum(rateStr),
            timePeriodYears: Math.max(1, Math.min(50, Math.round(parseNum(yearsStr)))),
            compounding,
            inflationRate: parseNum(inflationStr),
            currency,
        }),
        [initialStr, monthlyStr, rateStr, yearsStr, compounding, inflationStr, currency],
    );

    // ─── Derived data ─────────────────────────────────────────────────────────

    const scenarios: ScenarioSet = useMemo(() => buildScenarios(inputs), [inputs]);
    const monthlyScenarios: ScenarioSet = useMemo(() => buildScenariosMonthly(inputs), [inputs]);
    const baseData = scenarios.base;
    const monthlyData = monthlyScenarios.base;
    const finalPoint = baseData[baseData.length - 1];

    const cagr = useMemo(
        () => computeCAGR(inputs.initialInvestment, finalPoint.finalValue, inputs.timePeriodYears),
        [inputs.initialInvestment, finalPoint.finalValue, inputs.timePeriodYears],
    );

    const activeChartData = granularity === 'monthly' ? monthlyData : baseData;
    const activeScenarios = granularity === 'monthly' ? monthlyScenarios : scenarios;

    // ─── Resolved goals ───────────────────────────────────────────────────────

    const resolvedGoals = useMemo(
        () => resolveGoals(goals, activeChartData),
        [goals, activeChartData],
    );

    // ─── Goal actions ─────────────────────────────────────────────────────────

    const addGoal = useCallback(
        (goal: Omit<CalculatorGoal, 'id' | 'color'>) => {
            setGoals((prev) => [
                ...prev,
                { ...goal, id: nanoid(), color: getGoalColor(prev.length) },
            ]);
        },
        [],
    );

    const updateGoal = useCallback(
        (id: string, updates: Partial<Omit<CalculatorGoal, 'id' | 'color'>>) => {
            setGoals((prev) =>
                prev.map((g) => (g.id === id ? { ...g, ...updates } : g)),
            );
        },
        [],
    );

    const removeGoal = useCallback((id: string) => {
        setGoals((prev) => prev.filter((g) => g.id !== id));
    }, []);

    // ─── Actions ──────────────────────────────────────────────────────────────

    const reset = useCallback(() => {
        setInitialStr(CALCULATOR_DEFAULTS.initialStr);
        setMonthlyStr(CALCULATOR_DEFAULTS.monthlyStr);
        setRateStr(CALCULATOR_DEFAULTS.rateStr);
        setYearsStr(CALCULATOR_DEFAULTS.yearsStr);
        setInflationStr(CALCULATOR_DEFAULTS.inflationStr);
        setCurrency(CALCULATOR_DEFAULTS.currency);
        setCompounding(CALCULATOR_DEFAULTS.compounding);
        setGoals([]);
        setGranularity('yearly');
        localStorage.removeItem(STORAGE_KEY);
    }, []);

    /**
     * Pre-fill the initial investment from the user's portfolio total.
     * Converts from cents to dollars and sets the currency.
     */
    const prefillFromPortfolio = useCallback(
        (totalInvestedCents: number, portfolioCurrency: string) => {
            const dollars = (totalInvestedCents / 100).toFixed(0);
            setInitialStr(dollars);
            setCurrency(portfolioCurrency);
        },
        [],
    );

    return {
        initialStr,
        monthlyStr,
        rateStr,
        yearsStr,
        inflationStr,
        currency,
        compounding,
        setInitialStr,
        setMonthlyStr,
        setRateStr,
        setYearsStr,
        setInflationStr,
        setCurrency,
        setCompounding,
        inputs,
        scenarios,
        baseData,
        monthlyData,
        finalPoint,
        cagr,
        goals,
        resolvedGoals,
        addGoal,
        updateGoal,
        removeGoal,
        granularity,
        setGranularity,
        activeChartData,
        activeScenarios,
        reset,
        prefillFromPortfolio,
    };
};
