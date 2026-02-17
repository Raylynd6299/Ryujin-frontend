import { useTranslation } from '@/hooks/useTranslation';

export const LanguageToggle = () => {
    const { currentLanguage, changeLanguage } = useTranslation();

    return (
        <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
            <button
                onClick={() => changeLanguage('es')}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${currentLanguage === 'es'
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-background hover:text-foreground'
                    }`}
                aria-label="Cambiar a Español"
            >
                ES
            </button>
            <button
                onClick={() => changeLanguage('en')}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${currentLanguage === 'en'
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-background hover:text-foreground'
                    }`}
                aria-label="Switch to English"
            >
                EN
            </button>
        </div>
    );
};
