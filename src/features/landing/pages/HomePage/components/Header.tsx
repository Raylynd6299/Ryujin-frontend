import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { ROUTES } from '@/lib/constants';
import { Globe } from 'lucide-react';
import type React from 'react';
import { RyujinLogo } from '@/components/shared/RyujinLogo';

export const Header = (): React.ReactElement => {
    const { t, changeLanguage, currentLanguage } = useTranslation();

    return (
        <header className="sticky top-0 z-50">
            {/* Glass bar */}
            <div className="border-b border-white/[0.05] bg-[#070709]/80 backdrop-blur-2xl">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">

                    {/* Logo */}
                    <Link to={ROUTES.HOME} className="group flex items-center gap-2.5">
                        <RyujinLogo size={32} className="transition-opacity duration-200 group-hover:opacity-80" />
                        <span className="text-[15px] font-bold tracking-tight text-white">Ryujin</span>
                    </Link>

                    {/* Nav */}
                    <nav className="hidden items-center gap-0.5 md:flex">
                        {[
                            { href: '#why', label: t('landing.why.label') },
                            { href: '#features', label: t('landing.header.features') },
                            { href: '#how-it-works', label: t('landing.header.howItWorks') },
                            { href: '#faq', label: t('landing.header.faq') },
                        ].map(({ href, label }) => (
                            <a
                                key={href}
                                href={href}
                                className="rounded-lg px-4 py-2 text-sm text-white/35 transition-all duration-150 hover:bg-white/[0.04] hover:text-white/80"
                            >
                                {label}
                            </a>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => changeLanguage(currentLanguage === 'es' ? 'en' : 'es')}
                            type="button"
                            className="flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold text-white/30 transition-all hover:bg-white/[0.04] hover:text-white/60"
                        >
                            <Globe className="h-3.5 w-3.5" />
                            <span className="uppercase">{currentLanguage}</span>
                        </button>

                        <Link
                            to={ROUTES.LOGIN}
                            className="hidden rounded-lg px-4 py-2 text-sm text-white/40 transition-all hover:bg-white/[0.04] hover:text-white/80 sm:block"
                        >
                            {t('auth.login')}
                        </Link>

                        <Link
                            to={ROUTES.REGISTER}
                            className="group relative flex cursor-pointer items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_16px_rgba(139,92,246,0.3)] transition-all duration-200 hover:shadow-[0_0_24px_rgba(139,92,246,0.5)] hover:brightness-110"
                        >
                            <span className="relative z-10">{t('landing.hero.cta')}</span>
                            <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-15deg] bg-white/10 transition-transform duration-500 group-hover:translate-x-[250%]" />
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};
