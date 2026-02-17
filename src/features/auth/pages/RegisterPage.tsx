import { useTranslation } from '@/hooks/useTranslation';

export const RegisterPage = () => {
    const { t } = useTranslation();

    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <div className="w-full max-w-md space-y-6 rounded-lg border bg-card p-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">{t('auth.register')}</h1>
                    <p className="mt-2 text-muted-foreground">Ryujin 🐉</p>
                </div>

                <p className="text-center text-muted-foreground">
                    🚧 Registration form under construction
                </p>
            </div>
        </div>
    );
};
