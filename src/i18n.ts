import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import commonES from './locales/es/common.json';
import commonEN from './locales/en/common.json';

// Configure i18next
i18n
    .use(initReactI18next)
    .init({
        resources: {
            es: {
                common: commonES,
            },
            en: {
                common: commonEN,
            },
        },
        fallbackLng: 'es',
        defaultNS: 'common',
        ns: ['common'],
        interpolation: {
            escapeValue: false, // React already escapes by default
        },
        react: {
            useSuspense: false, // Disable suspense mode for better error handling
        },
        // Load saved language from localStorage or use default
        lng: localStorage.getItem('ryujin-lang') || 'es',
    });

// Save language changes to localStorage
i18n.on('languageChanged', (lng) => {
    localStorage.setItem('ryujin-lang', lng);
});

export default i18n;
