import { PlaceholderPage } from '@/components/shared/PlaceholderPage';
import { useTranslation } from '@/hooks/useTranslation';

export const AccountsPage = (): React.ReactElement => {
    const { t } = useTranslation();
    return <PlaceholderPage title={t('navigation.accounts')} />;
};
