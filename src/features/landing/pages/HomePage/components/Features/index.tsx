import { Wallet, TrendingUp, Target, BarChart3, CreditCard, Calculator } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import type React from 'react';

interface FeatureItem {
    icon: React.ReactNode;
    title: string;
    description: string;
    color: string;
    bgColor: string;
    span?: 'wide' | 'normal';
}

/* ─── Single feature tile ───────────────────────────────────────────────── */
const Tile = ({ icon, title, description, color, bgColor, span }: FeatureItem) => (
    <div
        className={[
            'group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.03] p-7',
            'transition-all duration-500 hover:border-white/[0.12] hover:bg-white/[0.05]',
            span === 'wide' ? 'md:col-span-2' : '',
        ].join(' ')}
    >
        {/* Hover corner glow */}
        <div
            className="pointer-events-none absolute -bottom-10 -right-10 h-36 w-36 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
            style={{ backgroundColor: bgColor }}
        />

        {/* Top gradient line on hover */}
        <div
            className="absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: `linear-gradient(90deg, transparent, ${color}60, transparent)` }}
        />

        {/* Icon */}
        <div
            className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105"
            style={{ backgroundColor: bgColor }}
        >
            <div style={{ color }} className="h-5 w-5">{icon}</div>
        </div>

        <h3 className="mb-2.5 text-[15px] font-bold text-white">{title}</h3>
        <p className="text-sm leading-[1.7] text-white/35">{description}</p>
    </div>
);

export const Features = (): React.ReactElement => {
    const { t } = useTranslation();

    const features: FeatureItem[] = [
        {
            icon: <Wallet />,
            title: t('landing.features.totalControl'),
            description: t('landing.features.totalControlDesc'),
            color: '#34d399',
            bgColor: 'rgba(52,211,153,0.08)',
            span: 'wide',
        },
        {
            icon: <TrendingUp />,
            title: t('landing.features.smartInvestments'),
            description: t('landing.features.smartInvestmentsDesc'),
            color: '#a78bfa',
            bgColor: 'rgba(167,139,250,0.08)',
        },
        {
            icon: <Target />,
            title: t('landing.features.clearGoals'),
            description: t('landing.features.clearGoalsDesc'),
            color: '#fb923c',
            bgColor: 'rgba(251,146,60,0.08)',
        },
        {
            icon: <BarChart3 />,
            title: t('landing.features.advancedAnalytics'),
            description: t('landing.features.advancedAnalyticsDesc'),
            color: '#22d3ee',
            bgColor: 'rgba(34,211,238,0.08)',
        },
        {
            icon: <CreditCard />,
            title: t('landing.features.debtControl'),
            description: t('landing.features.debtControlDesc'),
            color: '#f472b6',
            bgColor: 'rgba(244,114,182,0.08)',
            span: 'wide',
        },
        {
            icon: <Calculator />,
            title: t('landing.features.decisions'),
            description: t('landing.features.decisionsDesc'),
            color: '#facc15',
            bgColor: 'rgba(250,204,21,0.08)',
        },
    ];

    return (
        <section id="features" className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
            {/* Header */}
            <div className="mb-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-md">
                    <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-400/80">
                        {t('landing.features.label')}
                    </p>
                    <h2 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-white md:text-4xl">
                        {t('landing.features.title')}
                    </h2>
                </div>
                <p className="max-w-xs text-[15px] leading-[1.7] text-white/30 sm:text-right">
                    {t('landing.features.description')}
                </p>
            </div>

            {/* Asymmetric bento grid */}
            <div className="grid gap-3 md:grid-cols-3">
                {features.map((f) => (
                    <Tile key={f.title} {...f} />
                ))}
            </div>
        </section>
    );
};
