import { useTranslation } from '@/hooks/useTranslation';
import type React from 'react';

interface StepProps {
    number: string;
    title: string;
    description: string;
    isLast?: boolean;
}

const Step = ({ number, title, description, isLast }: StepProps) => (
    <div className="flex gap-5">
        {/* Number column */}
        <div className="flex flex-col items-center">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-violet-500/25 bg-violet-500/[0.07] font-mono text-sm font-bold text-violet-400">
                {number}
            </div>
            {!isLast && (
                <div className="my-2 w-px flex-1 bg-gradient-to-b from-violet-500/15 to-transparent" style={{ minHeight: '2.5rem' }} />
            )}
        </div>
        {/* Text */}
        <div className={isLast ? '' : 'pb-10'}>
            <h3 className="mb-1.5 text-[15px] font-bold text-white">{title}</h3>
            <p className="text-sm leading-[1.7] text-white/35">{description}</p>
        </div>
    </div>
);

export const HowItWorks = (): React.ReactElement => {
    const { t } = useTranslation();

    const steps = [
        { number: t('landing.howItWorks.step1Number'), title: t('landing.howItWorks.step1Title'), desc: t('landing.howItWorks.step1Desc') },
        { number: t('landing.howItWorks.step2Number'), title: t('landing.howItWorks.step2Title'), desc: t('landing.howItWorks.step2Desc') },
        { number: t('landing.howItWorks.step3Number'), title: t('landing.howItWorks.step3Title'), desc: t('landing.howItWorks.step3Desc') },
    ];

    return (
        <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
            <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">

                {/* Left: steps */}
                <div>
                    <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-fuchsia-400/80">
                        {t('landing.howItWorks.label')}
                    </p>
                    <h2 className="mb-12 text-3xl font-extrabold leading-[1.1] tracking-tight text-white md:text-4xl">
                        {t('landing.howItWorks.title')}
                    </h2>
                    {steps.map((step, i) => (
                        <Step
                            key={step.number}
                            number={step.number}
                            title={step.title}
                            description={step.desc}
                            isLast={i === steps.length - 1}
                        />
                    ))}
                </div>

                {/* Right: "after" dashboard */}
                <div className="relative">
                    {/* Glow */}
                    <div className="pointer-events-none absolute inset-0 rounded-3xl bg-violet-600/[0.07] blur-3xl" />

                    <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm">
                        {/* Top line */}
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

                        {/* Net worth */}
                        <div className="mb-6 flex items-start justify-between">
                            <div>
                                <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-white/25">
                                    {t('landing.dashboard.netWorth')}
                                </p>
                                <p className="text-3xl font-black tabular-nums text-white">$48,230</p>
                            </div>
                            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.07] px-3 py-1.5">
                                <span className="text-sm font-bold text-emerald-400">↑ +8.4%</span>
                            </div>
                        </div>

                        {/* Breakdown bars */}
                        <div className="mb-5 space-y-3.5">
                            {[
                                { label: t('landing.dashboard.income'), value: '$5,200', pct: 85, color: '#34d399' },
                                { label: t('landing.dashboard.expenses'), value: '$2,840', pct: 47, color: '#f472b6' },
                                { label: t('landing.dashboard.savings'), value: '$1,200', pct: 20, color: '#a78bfa' },
                                { label: t('landing.dashboard.investments'), value: '$760', pct: 13, color: '#22d3ee' },
                            ].map((item) => (
                                <div key={item.label}>
                                    <div className="mb-1.5 flex justify-between text-[12px]">
                                        <span className="text-white/30">{item.label}</span>
                                        <span className="font-semibold tabular-nums text-white/70">{item.value}</span>
                                    </div>
                                    <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
                                        <div
                                            className="h-full rounded-full"
                                            style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Goal card */}
                        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
                            <div className="mb-2 flex items-center justify-between">
                                <p className="text-[11px] font-semibold uppercase tracking-widest text-white/25">
                                    {t('landing.dashboard.goal')}
                                </p>
                                <span className="text-xs font-bold text-violet-400">68%</span>
                            </div>
                            <p className="mb-2 text-sm font-bold text-white">MacBook Pro</p>
                            <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                                <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" />
                            </div>
                            <div className="mt-2 flex justify-between text-[11px] text-white/25">
                                <span>$1,360 guardados</span>
                                <span>Meta: $2,000</span>
                            </div>
                        </div>
                    </div>

                    {/* Floating "aha" chip */}
                    <div className="animate-float absolute -right-3 -top-3 rounded-2xl border border-white/[0.08] bg-[#0d0d14]/95 px-4 py-3 shadow-2xl backdrop-blur-xl">
                        <p className="text-[10px] text-white/30">Para llegar en 2 meses</p>
                        <p className="text-base font-black text-emerald-400">$320 / mes</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
