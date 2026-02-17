import { Link } from 'react-router-dom';
import { Wallet } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { ROUTES } from '@/lib/constants';
import type React from 'react';

export const Header = (): React.ReactElement => {
    const { t } = useTranslation();

    return (
        <header className="border-b border-white/5 bg-slate-950/50 backdrop-blur-xl">
            <div className="container mx-auto flex h-20 items-center justify-between px-6">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="absolute inset-0 animate-pulse rounded-lg bg-violet-500 blur-lg" />
                        <Wallet className="relative h-9 w-9 text-violet-400" strokeWidth={1.5} />
                    </div>
                    <span className="bg-linear-to-r from-white to-violet-200 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
                        Ryujin
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <Link
                        to={ROUTES.LOGIN}
                        className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
                    >
                        {t('auth.login')}
                    </Link>
                    <Link
                        to={ROUTES.REGISTER}
                        className="group relative overflow-hidden rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-violet-500"
                    >
                        <span className="relative z-10">{t('auth.register')}</span>
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] transition-transform duration-1000 group-hover:translate-x-[200%]" />
                    </Link>
                </div>
            </div>
        </header>
    );
};
