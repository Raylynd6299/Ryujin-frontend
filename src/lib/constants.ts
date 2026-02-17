// App-wide constants

export const APP_NAME = 'Ryujin';

export const STORAGE_KEYS = {
    THEME: 'ryujin-theme',
    LANGUAGE: 'ryujin-lang',
    SIDEBAR_COLLAPSED: 'ryujin-sidebar-collapsed',
    AUTH_TOKEN: 'ryujin-auth-token',
    REFRESH_TOKEN: 'ryujin-refresh-token',
} as const;

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const ROUTES = {
    // Public
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',

    // Protected
    DASHBOARD: '/app/dashboard',

    // Finance
    FINANCE_INCOME: '/app/finance/income',
    FINANCE_EXPENSES: '/app/finance/expenses',
    FINANCE_ACCOUNTS: '/app/finance/accounts',
    FINANCE_DEBTS: '/app/finance/debts',
    FINANCE_ANALYSIS: '/app/finance/analysis',

    // Investment
    INVESTMENT_PORTFOLIO: '/app/investment/portfolio',
    INVESTMENT_PERFORMANCE: '/app/investment/performance',
    INVESTMENT_ANALYSIS: '/app/investment/analysis',
    INVESTMENT_CALCULATOR: '/app/investment/calculator',

    // Goals
    GOALS: '/app/goals',

    // Settings
    SETTINGS: '/app/settings',
    PROFILE: '/app/profile',
} as const;
