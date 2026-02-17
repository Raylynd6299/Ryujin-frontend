import { Check, BarChart3, PieChart } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import type React from 'react';

export const Interactive = (): React.ReactElement => {
    const { t } = useTranslation();

    const checks = [
        t('landing.interactive.check1'),
        t('landing.interactive.check2'),
        t('landing.interactive.check3'),
        t('landing.interactive.check4'),
    ];

    return (
        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
            <div className="grid items-center gap-16 lg:grid-cols-2">
                {/* Left: text content */}
                <div>
                    <div className="mb-3 text-sm font-bold tracking-widest text-cyan-400 uppercase">
                        {t('navigation.analysis')}
                    </div>
                    <h2 className="mb-5 text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl">
                        {t('landing.interactive.title')}{' '}
                        <span className="text-gradient">{t('landing.interactive.titleHighlight')}</span>
                    </h2>
                    <p className="mb-8 text-lg leading-relaxed text-gray-400">
                        {t('landing.interactive.description')}
                    </p>
                    <ul className="space-y-3">
                        {checks.map((text) => (
                            <li key={text} className="flex items-center gap-3">
                                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-md shadow-violet-500/20">
                                    <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                                </div>
                                <span className="text-sm font-medium text-gray-300">{text}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right: chart showcase */}
                <div className="space-y-4">
                    {/* Bar chart card */}
                    <div className="glow-card overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm">
                        <div className="mb-5 flex items-center justify-between">
                            <h4 className="text-sm font-bold text-white">{t('landing.interactive.chartTitle')}</h4>
                            <div className="rounded-lg bg-violet-500/10 p-1.5">
                                <BarChart3 className="h-4 w-4 text-violet-400" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <BarItem label={t('landing.interactive.housing')} value={65} colors="from-violet-500 to-fuchsia-500" />
                            <BarItem label={t('landing.interactive.food')} value={45} colors="from-cyan-500 to-blue-500" />
                            <BarItem label={t('landing.interactive.transport')} value={30} colors="from-emerald-500 to-teal-500" />
                            <BarItem label={t('landing.interactive.entertainment')} value={20} colors="from-orange-500 to-rose-500" />
                        </div>
                    </div>

                    {/* Pie chart card */}
                    <div className="glow-card overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm">
                        <div className="mb-5 flex items-center justify-between">
                            <h4 className="text-sm font-bold text-white">{t('landing.interactive.assetDistribution')}</h4>
                            <div className="rounded-lg bg-cyan-500/10 p-1.5">
                                <PieChart className="h-4 w-4 text-cyan-400" />
                            </div>
                        </div>
                        <div className="flex items-center justify-center py-2">
                            <svg viewBox="0 0 200 200" className="h-36 w-36">
                                <circle cx="100" cy="100" r="70" fill="none" stroke="#8b5cf6" strokeWidth="28" strokeDasharray="220 220" transform="rotate(-90 100 100)" />
                                <circle cx="100" cy="100" r="70" fill="none" stroke="#22d3ee" strokeWidth="28" strokeDasharray="110 330" strokeDashoffset="-220" transform="rotate(-90 100 100)" />
                                <circle cx="100" cy="100" r="70" fill="none" stroke="#10b981" strokeWidth="28" strokeDasharray="66 374" strokeDashoffset="-330" transform="rotate(-90 100 100)" />
                                <circle cx="100" cy="100" r="70" fill="none" stroke="#f97316" strokeWidth="28" strokeDasharray="44 396" strokeDashoffset="-396" transform="rotate(-90 100 100)" />
                            </svg>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-2.5 text-xs">
                            <LegendItem color="bg-violet-500" label={t('landing.interactive.stocks')} value="40%" />
                            <LegendItem color="bg-cyan-500" label={t('landing.interactive.bonds')} value="25%" />
                            <LegendItem color="bg-emerald-500" label={t('landing.interactive.etfs')} value="20%" />
                            <LegendItem color="bg-orange-500" label={t('landing.interactive.crypto')} value="15%" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const BarItem = ({ label, value, colors }: { label: string; value: number; colors: string }) => (
    <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-gray-400">{label}</span>
            <span className="font-bold tabular-nums text-white">{value}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/[0.05]">
            <div
                className={`h-full rounded-full bg-gradient-to-r ${colors}`}
                style={{ width: `${value}%` }}
            />
        </div>
    </div>
);

const LegendItem = ({ color, label, value }: { color: string; label: string; value: string }) => (
    <div className="flex items-center gap-2">
        <div className={`h-2.5 w-2.5 rounded-full ${color}`} />
        <span className="text-gray-400">{label}</span>
        <span className="ml-auto font-bold tabular-nums text-white">{value}</span>
    </div>
);
