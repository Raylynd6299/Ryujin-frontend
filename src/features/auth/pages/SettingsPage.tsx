import { useTranslation } from '@/hooks/useTranslation';

export const SettingsPage = () => {
    const { t } = useTranslation();

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">{t('navigation.settings')}</h1>
            <div className="rounded-lg border bg-card p-6">
                <p className="text-center text-muted-foreground">
                    🚧 Settings page under construction
                </p>
            </div>
        </div>
    );
};
