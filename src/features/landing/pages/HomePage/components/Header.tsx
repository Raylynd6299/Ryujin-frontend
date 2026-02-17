import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { ROUTES } from '@/lib/constants';
import { Globe, ArrowRight } from 'lucide-react';
import type React from 'react';

export const Header = (): React.ReactElement => {
    const { t, changeLanguage, currentLanguage } = useTranslation();

    const toggleLanguage = () => {
        changeLanguage(currentLanguage === 'es' ? 'en' : 'es');
    };

    return (
        <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-slate-950/60 backdrop-blur-2xl backdrop-saturate-150">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
                {/* Logo with glow */}
                <Link to={ROUTES.HOME} className="group flex items-center gap-2.5">
                    <div className="relative">
                        <div className="absolute inset-0 rounded-xl bg-violet-500 opacity-50 blur-lg transition-all group-hover:opacity-80" />
                        <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/25">
                            <span className="text-sm font-black text-white">R</span>
                        </div>
                    </div>
                    <span className="text-lg font-bold tracking-tight text-white">
                        Ryujin
                    </span>
                </Link>

                {/* Center nav */}
                <nav className="hidden items-center gap-1 md:flex">
                    {[
                        { href: '#features', label: t('landing.header.features') },
                        { href: '#pricing', label: t('landing.header.pricing') },
                        { href: '#faq', label: t('landing.header.faq') },
                    ].map(({ href, label }) => (
                        <a
                            key={href}
                            href={href}
                            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-400 transition-all hover:bg-white/[0.05] hover:text-white"
                        >
                            {label}
                        </a>
                    ))}
                </nav>

                {/* Right actions */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold text-gray-400 transition-all hover:bg-white/[0.05] hover:text-white"
                        type="button"
                    >
                        <Globe className="h-3.5 w-3.5" />
                        <span className="uppercase">{currentLanguage}</span>
                    </button>

                    <Link
                        to={ROUTES.LOGIN}
                        className="hidden rounded-lg px-4 py-2 text-sm font-medium text-gray-300 transition-all hover:bg-white/[0.05] hover:text-white sm:block"
                    >
                        {t('auth.login')}
                    </Link>

                    <Link
                        to={ROUTES.REGISTER}
                        className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-violet-500/40"
                    >
                        {t('auth.register')}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                </div>
            </div>
        </header>
    );
};
