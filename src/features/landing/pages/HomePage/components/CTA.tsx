import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import { useTranslation } from '@/hooks/useTranslation';
import type React from 'react';

export const CTA = (): React.ReactElement => {
    const { t } = useTranslation();

    return (
        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.1] p-12 md:p-20">
                {/* Animated gradient background */}
                <div className="animate-gradient absolute inset-0 bg-gradient-to-r from-violet-600/30 via-fuchsia-600/30 to-cyan-600/30" />

                {/* Radial glows */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(139,92,246,0.3),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(34,211,238,0.15),transparent_50%)]" />

                {/* Dot pattern */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.06]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                    }}
                />

                <div className="relative z-10 text-center">
                    <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-white md:text-5xl">
                        {t('landing.cta.title')}
                    </h2>
                    <p className="mx-auto mb-10 max-w-xl text-lg text-gray-300">
                        {t('landing.cta.description')}
                    </p>
                    <Link
                        to={ROUTES.REGISTER}
                        className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-white px-10 py-5 font-bold text-slate-900 shadow-2xl shadow-violet-500/20 transition-all hover:shadow-violet-500/40"
                    >
                        <span className="relative z-10">{t('landing.cta.button')}</span>
                        <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-violet-200/50 to-transparent" />
                    </Link>
                    <p className="mt-6 text-sm text-gray-400">
                        {t('landing.cta.note')}
                    </p>
                </div>
            </div>
        </section>
    );
};
