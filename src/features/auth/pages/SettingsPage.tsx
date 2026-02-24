import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslation } from '@/hooks/useTranslation';
import { useProfile } from '../hooks/useProfile';
import { ProfileTab } from '../components/ProfileTab';
import { PreferencesTab } from '../components/PreferencesTab';
import { SecurityTab } from '../components/SecurityTab';

const SettingsSkeleton = () => (
    <div className="space-y-6">
        <Skeleton className="h-9 w-48" />
        <div className="space-y-2">
            <Skeleton className="h-10 w-72" />
            <Skeleton className="h-64 w-full rounded-lg" />
        </div>
    </div>
);

export const SettingsPage = () => {
    const { t } = useTranslation();
    const { data: user, isLoading, isError } = useProfile();

    if (isLoading) return <SettingsSkeleton />;

    if (isError || !user) {
        return (
            <div className="space-y-6">
                <h1 className="text-3xl font-bold">{t('navigation.settings')}</h1>
                <div className="rounded-lg border bg-destructive/10 p-6">
                    <p className="text-center text-destructive">
                        {t('common.errorLoading')}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">{t('navigation.settings')}</h1>

            <Tabs defaultValue="profile">
                <TabsList className="mb-6">
                    <TabsTrigger value="profile">{t('settings.tabs.profile')}</TabsTrigger>
                    <TabsTrigger value="preferences">{t('settings.tabs.preferences')}</TabsTrigger>
                    <TabsTrigger value="security">{t('settings.tabs.security')}</TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                    <ProfileTab user={user} />
                </TabsContent>

                <TabsContent value="preferences">
                    <PreferencesTab user={user} />
                </TabsContent>

                <TabsContent value="security">
                    <SecurityTab />
                </TabsContent>
            </Tabs>
        </div>
    );
};
