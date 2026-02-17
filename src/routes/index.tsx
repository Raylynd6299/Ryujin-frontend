import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { ProtectedRoute } from './ProtectedRoute';

// Public pages
import { HomePage } from '@/features/landing/pages/HomePage';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { RegisterPage } from '@/features/auth/pages/RegisterPage';

// Dashboard
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage';

// Finance pages
import { IncomesPage } from '@/features/finance/pages/IncomesPage';
import { ExpensesPage } from '@/features/finance/pages/ExpensesPage';
import { AccountsPage } from '@/features/finance/pages/AccountsPage';
import { DebtsPage } from '@/features/finance/pages/DebtsPage';
import { FinanceAnalysisPage } from '@/features/finance/pages/FinanceAnalysisPage';

// Investment pages
import { PortfolioPage } from '@/features/investment/pages/PortfolioPage';
import { PerformancePage } from '@/features/investment/pages/PerformancePage';
import { StockAnalysisPage } from '@/features/investment/pages/StockAnalysisPage';
import { CalculatorPage } from '@/features/investment/pages/CalculatorPage';

// Goals & Settings
import { GoalsPage } from '@/features/goals/pages/GoalsPage';
import { SettingsPage } from '@/features/auth/pages/SettingsPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/register',
        element: <RegisterPage />,
    },
    {
        path: '/app',
        element: <ProtectedRoute />,
        children: [
            {
                path: '/app',
                element: <Navigate to="/app/dashboard" replace />,
            },
            {
                element: <AppLayout><DashboardPage /></AppLayout>,
                path: '/app/dashboard',
            },
            {
                path: '/app/finance',
                children: [
                    {
                        path: 'income',
                        element: <AppLayout><IncomesPage /></AppLayout>,
                    },
                    {
                        path: 'expenses',
                        element: <AppLayout><ExpensesPage /></AppLayout>,
                    },
                    {
                        path: 'accounts',
                        element: <AppLayout><AccountsPage /></AppLayout>,
                    },
                    {
                        path: 'debts',
                        element: <AppLayout><DebtsPage /></AppLayout>,
                    },
                    {
                        path: 'analysis',
                        element: <AppLayout><FinanceAnalysisPage /></AppLayout>,
                    },
                ],
            },
            {
                path: '/app/investment',
                children: [
                    {
                        path: 'portfolio',
                        element: <AppLayout><PortfolioPage /></AppLayout>,
                    },
                    {
                        path: 'performance',
                        element: <AppLayout><PerformancePage /></AppLayout>,
                    },
                    {
                        path: 'analysis',
                        element: <AppLayout><StockAnalysisPage /></AppLayout>,
                    },
                    {
                        path: 'calculator',
                        element: <AppLayout><CalculatorPage /></AppLayout>,
                    },
                ],
            },
            {
                path: '/app/goals',
                element: <AppLayout><GoalsPage /></AppLayout>,
            },
            {
                path: '/app/settings',
                element: <AppLayout><SettingsPage /></AppLayout>,
            },
        ],
    },
    {
        path: '*',
        element: <div className="flex h-screen items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold">404</h1>
                <p className="mt-2 text-muted-foreground">Page not found</p>
            </div>
        </div>,
    },
]);

export const AppRouter = () => {
    return <RouterProvider router={router} />;
};
