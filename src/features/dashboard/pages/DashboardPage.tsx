import { useTranslation } from '@/hooks/useTranslation';

export const DashboardPage = () => {
    const { t } = useTranslation();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">{t('navigation.dashboard')}</h1>
                <p className="mt-2 text-muted-foreground">
                    Welcome to Ryujin - Your Personal Finance Dashboard
                </p>
            </div>

            <div className="rounded-lg border bg-card p-6">
                <p className="text-center text-muted-foreground">
                    🚧 Dashboard under construction
                </p>
            </div>
        </div>
    );
};
