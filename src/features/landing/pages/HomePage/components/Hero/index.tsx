import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, TrendingUp } from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import { useTranslation } from '@/hooks/useTranslation';
import type React from 'react';

/* ─── Inline sparkline SVG ──────────────────────────────────────────────── */
const Spark = ({ points, color }: { points: string; color: string }) => (
    <svg viewBox="0 0 80 24" fill="none" className="w-full h-full">
        <polyline points={points} stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

/* ─── Dashboard mock — the hero visual ──────────────────────────────────── */
const DashboardMock = () => {
    const { t } = useTranslation();
    return (
        <div className="relative w-full max-w-[520px] mx-auto">
            {/* Glow behind card */}
            <div className="pointer-events-none absolute inset-[-20%] rounded-full bg-violet-600/10 blur-[80px]" />

            {/* Main glass card */}
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.04] p-6 shadow-[0_8px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
                {/* Top gradient line */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />

                {/* Balance */}
                <div className="mb-5 flex items-start justify-between">
                    <div>
                        <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-white/25">
                            {t('landing.dashboard.totalBalance')}
                        </p>
                        <p className="text-4xl font-black tabular-nums text-white">$84,230</p>
                        <div className="mt-1.5 inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/[0.08] px-2.5 py-0.5">
                            <ArrowUpRight className="h-3 w-3 text-emerald-400" />
                            <span className="text-xs font-bold text-emerald-400">+12.4% {t('landing.dashboard.vsLastMonth')}</span>
                        </div>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10">
                        <TrendingUp className="h-5 w-5 text-violet-400" />
                    </div>
                </div>

                {/* Chart */}
                <div className="relative mb-5 overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.03] p-4">
                    <svg viewBox="0 0 380 80" className="w-full" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="heroLine" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#8b5cf6" />
                                <stop offset="55%" stopColor="#d946ef" />
                                <stop offset="100%" stopColor="#22d3ee" />
                            </linearGradient>
                            <linearGradient id="heroArea" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.18" />
                                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <path
                            d="M0,65 C30,60 55,55 80,52 C105,49 115,38 145,34 C175,30 190,24 220,20 C250,16 270,12 300,10 C325,8 355,5 380,3"
                            fill="none" stroke="url(#heroLine)" strokeWidth="2.5" strokeLinecap="round"
                        />
                        <path
                            d="M0,65 C30,60 55,55 80,52 C105,49 115,38 145,34 C175,30 190,24 220,20 C250,16 270,12 300,10 C325,8 355,5 380,3 L380,80 L0,80 Z"
                            fill="url(#heroArea)"
                        />
                        <circle cx="380" cy="3" r="4" fill="#22d3ee" />
                        <circle cx="380" cy="3" r="9" fill="#22d3ee" opacity="0.15" />
                    </svg>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { label: t('landing.dashboard.income'), value: '$5,200', color: 'text-emerald-400', border: 'border-emerald-500/15', bg: 'bg-emerald-500/[0.06]' },
                        { label: t('landing.dashboard.expenses'), value: '$2,840', color: 'text-rose-400', border: 'border-rose-500/15', bg: 'bg-rose-500/[0.06]' },
                        { label: t('landing.dashboard.savings'), value: '$1,200', color: 'text-violet-400', border: 'border-violet-500/15', bg: 'bg-violet-500/[0.06]' },
                    ].map((s) => (
                        <div key={s.label} className={`rounded-xl border ${s.border} ${s.bg} p-3`}>
                            <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/25">{s.label}</p>
                            <p className={`text-sm font-bold tabular-nums ${s.color}`}>{s.value}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating chip — investment return */}
            <div className="animate-float absolute -right-4 top-10 rounded-2xl border border-white/[0.08] bg-[#0c0c12]/95 px-4 py-3 shadow-2xl backdrop-blur-xl">
                <p className="text-[10px] text-white/30">Inversiones</p>
                <p className="text-base font-black text-emerald-400">+18.2%</p>
                <div className="mt-1 h-6 w-16">
                    <Spark points="0,18 13,14 26,16 39,8 52,10 65,4 80,2" color="#34d399" />
                </div>
            </div>

            {/* Floating chip — goal progress */}
            <div className="animate-float-delayed absolute -left-4 bottom-10 rounded-2xl border border-white/[0.08] bg-[#0c0c12]/95 px-4 py-3 shadow-2xl backdrop-blur-xl">
                <p className="text-[10px] text-white/30">{t('landing.dashboard.goal')} · MacBook Pro</p>
                <div className="mt-1.5 h-1.5 w-28 overflow-hidden rounded-full bg-white/[0.08]">
                    <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" />
                </div>
                <div className="mt-1 flex justify-between">
                    <p className="text-[10px] text-white/30">$1,360</p>
                    <p className="text-[10px] font-bold text-violet-400">68%</p>
                </div>
            </div>
        </div>
    );
};

export const Hero = (): React.ReactElement => {
    const { t } = useTranslation();

    return (
        <section className="relative mx-auto max-w-7xl px-6 pb-28 pt-16 md:pt-24 lg:px-8">
            {/* Top spotlight */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[600px] -translate-x-1/2 rounded-full bg-violet-600/[0.08] blur-[80px]" />

            <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">

                {/* ── LEFT: Copy ──────────────────────────────────────── */}
                <div>
                    {/* Free badge */}
                    <div className="animate-fade-up mb-10 inline-flex items-center gap-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-4 py-1.5">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                        <span className="text-sm font-medium text-emerald-400">{t('landing.hero.badge')}</span>
                    </div>

                    {/* Headline */}
                    <h1 className="animate-fade-up delay-100 mb-7 text-[clamp(2.6rem,5.5vw,4.6rem)] font-extrabold leading-[1.04] tracking-[-0.03em]">
                        <span className="text-white/90">{t('landing.hero.headline1')}</span>
                        <br />
                        <span className="text-white/90">{t('landing.hero.headline2')}</span>
                        <br />
                        <span
                            className="bg-clip-text text-transparent"
                            style={{ backgroundImage: 'linear-gradient(135deg, #a78bfa 0%, #c084fc 40%, #e879f9 80%, #22d3ee 100%)' }}
                        >
                            {t('landing.hero.headline3')}
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="animate-fade-up delay-200 mb-10 max-w-[440px] text-[1.05rem] leading-[1.75] text-white/35">
                        {t('landing.hero.subheadline')}
                    </p>

                    {/* CTAs */}
                    <div className="animate-fade-up delay-300 mb-6 flex flex-wrap items-center gap-3">
                        <Link
                            to={ROUTES.REGISTER}
                            className="group relative flex cursor-pointer items-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 to-violet-500 px-7 py-3.5 text-[15px] font-bold text-white shadow-[0_0_24px_rgba(139,92,246,0.4)] transition-all duration-200 hover:shadow-[0_0_36px_rgba(139,92,246,0.6)] hover:brightness-110"
                        >
                            <span className="relative z-10">{t('landing.hero.cta')}</span>
                            <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                            <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-15deg] bg-white/10 transition-transform duration-700 group-hover:translate-x-[250%]" />
                        </Link>
                        <Link
                            to={ROUTES.LOGIN}
                            className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-7 py-3.5 text-[15px] font-medium text-white/50 transition-all duration-200 hover:border-white/[0.14] hover:text-white/80"
                        >
                            {t('landing.hero.ctaSecondary')}
                        </Link>
                    </div>

                    {/* Trust */}
                    <p className="animate-fade-up delay-400 text-sm text-white/20">
                        {t('landing.hero.trustLine')}
                    </p>

                    {/* Stats */}
                    <div className="animate-fade-up delay-500 mt-12 flex items-center gap-8 border-t border-white/[0.05] pt-8">
                        {[
                            { value: t('landing.hero.stat1Value'), label: t('landing.hero.stat1Label'), color: '#34d399' },
                            { value: t('landing.hero.stat2Value'), label: t('landing.hero.stat2Label'), color: '#a78bfa' },
                            { value: t('landing.hero.stat3Value'), label: t('landing.hero.stat3Label'), color: '#22d3ee' },
                        ].map((s) => (
                            <div key={s.label}>
                                <div className="text-2xl font-black tabular-nums" style={{ color: s.color }}>{s.value}</div>
                                <div className="mt-0.5 text-xs text-white/25">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── RIGHT: Dashboard ────────────────────────────────── */}
                <div className="animate-fade-up delay-200">
                    <DashboardMock />
                </div>
            </div>
        </section>
    );
};
