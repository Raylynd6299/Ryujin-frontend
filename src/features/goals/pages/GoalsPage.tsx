import { PlaceholderPage } from '@/components/shared/PlaceholderPage';
import { useTranslation } from '@/hooks/useTranslation';

export const GoalsPage = (): React.ReactElement => {
    const { t } = useTranslation();
    return <PlaceholderPage title={t('navigation.goals')} />;
};
