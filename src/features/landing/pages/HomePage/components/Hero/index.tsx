import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import { useTranslation } from '@/hooks/useTranslation';
import { Dashboard } from '../Dashboard';
import type React from 'react';

export const Hero = (): React.ReactElement => {
    const { t } = useTranslation();

    return (
        <section className="mx-auto max-w-7xl px-6 pb-20 pt-16 md:pb-32 md:pt-24 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                <div>
                    {/* Animated badge */}
                    <div className="animate-fade-up mb-8 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 shadow-lg shadow-violet-500/10">
                        <Zap className="h-3.5 w-3.5 text-cyan-400" />
                        <span className="text-sm font-semibold text-violet-300">{t('landing.hero.badge')}</span>
                        <div className="h-1 w-1 rounded-full bg-violet-400" />
                        <span className="text-sm text-cyan-400">2026</span>
                    </div>

                    {/* Massive headline */}
                    <h1 className="animate-fade-up delay-100 mb-6 text-[clamp(2.75rem,6vw,5rem)] font-extrabold leading-[1] tracking-tighter">
                        <span className="text-white">{t('landing.hero.titleLine1')}</span>
                        <br />
                        <span className="text-gradient">{t('landing.hero.titleHighlight')}</span>
                        <br />
                        <span className="text-white">{t('landing.hero.titleLine2')}</span>
                    </h1>

                    {/* Description */}
                    <p className="animate-fade-up delay-200 mb-8 max-w-md text-lg leading-relaxed text-gray-400">
                        {t('landing.hero.description')}
                    </p>

                    {/* CTAs */}
                    <div className="animate-fade-up delay-300 mb-10 flex flex-wrap items-center gap-4">
                        <Link
                            to={ROUTES.REGISTER}
                            className="group relative flex items-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 font-bold text-white shadow-xl shadow-violet-500/30 transition-all hover:shadow-violet-500/50"
                        >
                            <span className="relative z-10">{t('landing.hero.cta')}</span>
                            <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        </Link>
                        <Link
                            to={ROUTES.LOGIN}
                            className="rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-4 font-bold text-white backdrop-blur-sm transition-all hover:border-violet-500/30 hover:bg-white/[0.06]"
                        >
                            {t('landing.hero.ctaSecondary')}
                        </Link>
                    </div>

                    {/* Stats with colored accents */}
                    <div className="animate-fade-up delay-400 grid grid-cols-3 gap-6">
                        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
                            <div className="text-2xl font-black tabular-nums text-white">
                                {t('landing.hero.stat1Value')}
                            </div>
                            <div className="mt-1 text-xs font-medium text-violet-400">
                                {t('landing.hero.stat1Label')}
                            </div>
                        </div>
                        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
                            <div className="text-2xl font-black tabular-nums text-white">
                                {t('landing.hero.stat2Value')}
                            </div>
                            <div className="mt-1 text-xs font-medium text-cyan-400">
                                {t('landing.hero.stat2Label')}
                            </div>
                        </div>
                        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
                            <div className="text-2xl font-black tabular-nums text-white">
                                {t('landing.hero.stat3Value')}
                            </div>
                            <div className="mt-1 text-xs font-medium text-emerald-400">
                                {t('landing.hero.stat3Label')}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dashboard Preview */}
                <div className="animate-fade-up delay-500">
                    <Dashboard />
                </div>
            </div>
        </section>
    );
};
