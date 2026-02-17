import { TrendingUp, DollarSign, Target, ArrowUpRight } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import type React from 'react';

export const Dashboard = (): React.ReactElement => {
    const { t } = useTranslation();

    return (
        <div className="relative hidden lg:block">
            {/* Glow behind card */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/20 via-fuchsia-500/10 to-cyan-500/10 blur-2xl" />

            {/* Main card */}
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.1] bg-slate-900/80 p-7 shadow-2xl backdrop-blur-xl">
                {/* Gradient top edge */}
                <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500" />

                {/* Balance header */}
                <div className="mb-5">
                    <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">{t('landing.dashboard.totalBalance')}</span>
                        <div className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-bold text-emerald-400">
                            <ArrowUpRight className="h-3 w-3" />
                            12.5%
                        </div>
                    </div>
                    <div className="text-3xl font-black tabular-nums tracking-tight text-white">$127,845</div>
                    <div className="mt-1 text-xs text-gray-500">{t('landing.dashboard.vsLastMonth')}</div>
                </div>

                {/* Chart */}
                <div className="relative mb-5 overflow-hidden rounded-2xl bg-white/[0.03] p-4">
                    <svg viewBox="0 0 300 80" className="w-full" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="lineGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#8b5cf6" />
                                <stop offset="50%" stopColor="#d946ef" />
                                <stop offset="100%" stopColor="#22d3ee" />
                            </linearGradient>
                            <linearGradient id="areaGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.25" />
                                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <path
                            d="M 0,60 C 20,55 40,50 60,52 C 80,54 90,40 120,38 C 150,36 160,30 180,28 C 200,26 220,20 240,22 C 260,24 280,12 300,10"
                            fill="none"
                            stroke="url(#lineGrad2)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                        />
                        <path
                            d="M 0,60 C 20,55 40,50 60,52 C 80,54 90,40 120,38 C 150,36 160,30 180,28 C 200,26 220,20 240,22 C 260,24 280,12 300,10 L 300,80 L 0,80 Z"
                            fill="url(#areaGrad2)"
                        />
                        {/* Dot at current value */}
                        <circle cx="300" cy="10" r="4" fill="#22d3ee" />
                        <circle cx="300" cy="10" r="8" fill="#22d3ee" opacity="0.2" />
                    </svg>
                </div>

                {/* Mini stats row */}
                <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/[0.06] p-3">
                        <div className="text-[10px] font-semibold tracking-wider text-emerald-400/70 uppercase">{t('landing.dashboard.income')}</div>
                        <div className="mt-1 text-sm font-bold tabular-nums text-emerald-400">$45.2K</div>
                    </div>
                    <div className="rounded-xl border border-rose-500/10 bg-rose-500/[0.06] p-3">
                        <div className="text-[10px] font-semibold tracking-wider text-rose-400/70 uppercase">{t('landing.dashboard.expenses')}</div>
                        <div className="mt-1 text-sm font-bold tabular-nums text-rose-400">$32.8K</div>
                    </div>
                    <div className="rounded-xl border border-violet-500/10 bg-violet-500/[0.06] p-3">
                        <div className="text-[10px] font-semibold tracking-wider text-violet-400/70 uppercase">{t('landing.dashboard.savings')}</div>
                        <div className="mt-1 text-sm font-bold tabular-nums text-violet-400">$12.4K</div>
                    </div>
                </div>
            </div>

            {/* Floating card: investments */}
            <div className="animate-float absolute -right-6 top-6 rounded-2xl border border-violet-500/20 bg-slate-900/95 p-4 shadow-2xl shadow-violet-500/10 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 p-2.5">
                        <DollarSign className="h-4 w-4 text-white" />
                    </div>
                    <div>
                        <div className="text-[10px] font-semibold tracking-wider text-gray-500 uppercase">{t('landing.dashboard.investments')}</div>
                        <div className="text-lg font-black tabular-nums text-emerald-400">+18.2%</div>
                    </div>
                </div>
            </div>

            {/* Floating card: goal */}
            <div className="animate-float-delayed absolute -left-6 bottom-10 rounded-2xl border border-cyan-500/20 bg-slate-900/95 p-4 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 p-2.5">
                        <Target className="h-4 w-4 text-white" />
                    </div>
                    <div>
                        <div className="text-[10px] font-semibold tracking-wider text-gray-500 uppercase">{t('landing.dashboard.goal')}</div>
                        <div className="text-sm font-bold text-white">{t('landing.dashboard.goalProgress')}</div>
                        {/* Mini progress bar */}
                        <div className="mt-1.5 h-1.5 w-24 overflow-hidden rounded-full bg-white/10">
                            <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
