import { PlaceholderPage } from '@/components/shared/PlaceholderPage';
import { useTranslation } from '@/hooks/useTranslation';

export const IncomesPage = () => {
    const { t } = useTranslation();
    return <PlaceholderPage title={t('navigation.income')} />;
};
