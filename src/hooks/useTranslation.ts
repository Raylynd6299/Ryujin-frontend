import { useTranslation as useI18nTranslation } from 'react-i18next';

/**
 * Custom hook for i18n translations
 * Provides type-safe access to translations and language switching
 */
export const useTranslation = (namespace: string = 'common') => {
    const { t, i18n } = useI18nTranslation(namespace);

    const changeLanguage = (lng: 'es' | 'en') => {
        i18n.changeLanguage(lng);
    };

    const currentLanguage = i18n.language as 'es' | 'en';

    return {
        t,
        i18n,
        changeLanguage,
        currentLanguage,
        isSpanish: currentLanguage === 'es',
        isEnglish: currentLanguage === 'en',
    };
};

/**
 * Hook to get available languages
 */
export const useLanguages = () => {
    return [
        { code: 'es', name: 'Español', nativeName: 'Español' },
        { code: 'en', name: 'English', nativeName: 'English' },
    ] as const;
};
