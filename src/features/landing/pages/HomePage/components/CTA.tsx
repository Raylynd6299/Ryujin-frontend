import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import { useTranslation } from '@/hooks/useTranslation';
import type React from 'react';

export const CTA = (): React.ReactElement => {
    const { t } = useTranslation();

    return (
        <section className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.07] bg-white/[0.02] px-8 py-24 text-center">

                {/* Ambient glows */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-1/3 top-[-30%] h-72 w-72 -translate-x-1/2 rounded-full bg-violet-600/15 blur-[80px]" />
                    <div className="absolute right-1/3 bottom-[-20%] h-56 w-56 translate-x-1/2 rounded-full bg-fuchsia-600/10 blur-[60px]" />
                </div>

                {/* Top border glow */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

                <div className="relative z-10">
                    {/* Free badge */}
                    <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-4 py-1.5">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                        <span className="text-sm font-medium text-emerald-400">{t('landing.hero.badge')}</span>
                    </div>

                    <h2 className="mb-5 text-3xl font-extrabold leading-[1.1] tracking-tight text-white md:text-[2.8rem]">
                        {t('landing.cta.title')}
                    </h2>
                    <p className="mx-auto mb-10 max-w-md text-[1.05rem] leading-[1.7] text-white/35">
                        {t('landing.cta.description')}
                    </p>

                    <Link
                        to={ROUTES.REGISTER}
                        className="group relative inline-flex cursor-pointer items-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 to-violet-500 px-10 py-4 text-[15px] font-bold text-white shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all duration-200 hover:shadow-[0_0_45px_rgba(139,92,246,0.6)] hover:brightness-110"
                    >
                        <span className="relative z-10">{t('landing.cta.button')}</span>
                        <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                        <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-15deg] bg-white/10 transition-transform duration-700 group-hover:translate-x-[250%]" />
                    </Link>

                    <p className="mt-5 text-sm text-white/20">
                        {t('landing.cta.note')}
                    </p>
                </div>
            </div>
        </section>
    );
};
