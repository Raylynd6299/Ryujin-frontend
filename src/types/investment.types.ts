// ─── Enums / Union Types ──────────────────────────────────────────────────────

export type AssetType = 'stock' | 'etf' | 'fixed_income' | 'crypto' | 'reit';

export type CompoundingFrequency = 'monthly' | 'quarterly' | 'annually';

// ─── Calculator Types ─────────────────────────────────────────────────────────

export interface CalculatorInputs {
    initialInvestment: number;
    monthlyContribution: number;
    annualReturnRate: number;
    timePeriodYears: number;
    compounding: CompoundingFrequency;
    inflationRate: number;     // % per year, e.g. 3.5
    currency: string;          // ISO 4217, e.g. 'USD'
}

/** Single year data point enriched with inflation-adjusted values */
export interface EnrichedDataPoint {
    year: number;
    /** Absolute month index (1 = month 1 of year 1). Only set in monthly granularity. */
    monthIndex?: number;
    /** Human-readable label for the X-axis. E.g. "Year 3" or "Yr 3, Mo 7" */
    label?: string;
    totalInvested: number;
    finalValue: number;
    gains: number;
    realValue: number;         // inflation-adjusted finalValue
    cumulativeContributions: number;
}

/** Three parallel scenarios for the same input set */
export interface ScenarioSet {
    pessimistic: EnrichedDataPoint[];  // rate - 3%
    base: EnrichedDataPoint[];
    optimistic: EnrichedDataPoint[];   // rate + 3%
}

/** A user-defined investment goal tracked on the calculator chart */
export interface CalculatorGoal {
    id: string;
    label: string;
    /** 'value' = absolute amount in display currency; 'percentage' = % gain over total invested */
    type: 'value' | 'percentage';
    value: number;
    color: string;
}

/** A goal with its resolved status after running through the growth data */
export interface ResolvedGoal extends CalculatorGoal {
    /** Year (or fractional year for monthly) when the goal is first reached. null = never reached. */
    yearReached: number | null;
    /** Month (1–12) within the year, only set in monthly granularity mode */
    monthReached?: number;
    /** The portfolio value at the moment the goal was reached */
    valueAtReach: number | null;
}

/** Chart granularity toggle */
export type ChartGranularity = 'yearly' | 'monthly';

/** What gets persisted to localStorage */
export interface CalculatorPersistedState {
    initialStr: string;
    monthlyStr: string;
    rateStr: string;
    yearsStr: string;
    inflationStr: string;
    currency: string;
    compounding: CompoundingFrequency;
    goals: CalculatorGoal[];
    granularity: ChartGranularity;
}

// ─── Core Entity ──────────────────────────────────────────────────────────────

export interface Holding {
    id: string;
    symbol: string;
    name: string;
    assetType: AssetType;
    quantityMicro: number;        // int64 micro-units from backend
    quantityFloat: number;        // quantityMicro / 1_000_000 (convenience)
    buyPriceCents: number;
    currency: string;
    currentPriceCents: number | null;
    marketValueCents: number | null;
    unrealizedGainLossCents: number | null;
    unrealizedGainLossPct: number | null;
    pricedAt: string | null;
    notes: string;
    createdAt: string;
    updatedAt: string;
}

// ─── Request Types ────────────────────────────────────────────────────────────

export interface CreateHoldingRequest {
    symbol: string;
    name: string;
    assetType: AssetType;
    quantityMicro: number;
    buyPriceCents: number;
    currency: string;
    notes?: string;
}

export interface UpdateHoldingRequest {
    name?: string;
    quantityMicro?: number;
    buyPriceCents?: number;
    currency?: string;
    notes?: string;
}

// ─── List Response ────────────────────────────────────────────────────────────

export interface HoldingListResponse {
    holdings: Holding[];
    total: number;
    page: number;
    limit: number;
}

// ─── Portfolio Types ──────────────────────────────────────────────────────────

export interface CurrencySubtotal {
    currency: string;
    totalInvestedCents: number;
    totalCurrentValueCents: number;
    unrealizedGainLossCents: number;
    unrealizedGainLossPct: number;
    holdingsCount: number;
    holdingsWithoutPrice: number;
}

export interface PortfolioSummary {
    subtotals: CurrencySubtotal[];
    totalHoldings: number;
}

export interface HoldingPerformance {
    holdingId: string;
    symbol: string;
    name: string;
    currency: string;
    totalInvestedCents: number;
    currentValueCents: number | null;
    unrealizedGainLossCents: number | null;
    unrealizedGainLossPct: number | null;
}

export interface PortfolioPerformance {
    holdings: HoldingPerformance[];
}

// ─── Query Params ─────────────────────────────────────────────────────────────

export interface HoldingListParams {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc';
}

// ─── Stock Market Types ───────────────────────────────────────────────────────

export interface StockQuote {
    symbol: string;
    name: string;
    currency: string;
    regularMarketPrice: number;
    previousClose: number;
    open: number;
    dayHigh: number;
    dayLow: number;
    changeAmount: number;
    changePct: number;
    volume: number;
    marketCap: number;
    fiftyTwoWeekHigh: number;
    fiftyTwoWeekLow: number;
    trailingPE: number;
    forwardPE: number;
    dividendYield: number;
    eps: number;
    isFresh: boolean;
    fetchedAt: string;
}

export interface StockPriceHistory {
    symbol: string;
    price: number;
    currency: string;
    recordedAt: string;
}
