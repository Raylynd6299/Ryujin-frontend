import { PlaceholderPage } from '@/components/shared/PlaceholderPage';
import { useTranslation } from '@/hooks/useTranslation';

export const StockAnalysisPage = (): React.ReactElement => {
    const { t } = useTranslation();
    return <PlaceholderPage title={t('navigation.stockAnalysis')} />;
};
