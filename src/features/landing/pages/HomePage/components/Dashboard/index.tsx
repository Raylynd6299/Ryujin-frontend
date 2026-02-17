import { TrendingUp, DollarSign, LineChart } from 'lucide-react';
import { MiniStat } from './Components/MiniStat';
import type React from 'react';

export const Dashboard = (): React.ReactElement => {
    return (
        <div className="relative">
            {/* Main Card */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 p-8 backdrop-blur-xl">
                {/* Mini Line Chart */}
                <div className="mb-6">
                    <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm text-gray-400">Balance Total</span>
                        <TrendingUp className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div className="mb-4 text-4xl font-bold text-white">$127,845</div>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-emerald-400">+12.5%</span>
                        <span className="text-gray-500">vs mes anterior</span>
                    </div>
                </div>

                {/* SVG Line Chart */}
                <svg viewBox="0 0 300 100" className="w-full">
                    <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#d946ef" />
                        </linearGradient>
                        <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M 0,80 L 30,70 L 60,75 L 90,55 L 120,60 L 150,40 L 180,45 L 210,25 L 240,30 L 270,15 L 300,20"
                        fill="none"
                        stroke="url(#lineGradient)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        className="animate-pulse"
                    />
                    <path
                        d="M 0,80 L 30,70 L 60,75 L 90,55 L 120,60 L 150,40 L 180,45 L 210,25 L 240,30 L 270,15 L 300,20 L 300,100 L 0,100 Z"
                        fill="url(#areaGradient)"
                    />
                </svg>

                {/* Mini Stats */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                    <MiniStat label="Ingresos" value="$45.2K" color="text-emerald-400" />
                    <MiniStat label="Gastos" value="$32.8K" color="text-rose-400" />
                    <MiniStat label="Ahorro" value="$12.4K" color="text-violet-400" />
                </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -right-4 -top-4 animate-pulse rounded-xl border border-white/10 bg-slate-900/80 p-4 shadow-2xl backdrop-blur-xl animation-delay-1000">
                <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-violet-500/20 p-2">
                        <DollarSign className="h-5 w-5 text-violet-400" />
                    </div>
                    <div>
                        <div className="text-xs text-gray-500">Inversiones</div>
                        <div className="font-semibold text-white">+18.2%</div>
                    </div>
                </div>
            </div>

            <div className="absolute -bottom-4 -left-4 animate-pulse rounded-xl border border-white/10 bg-slate-900/80 p-4 shadow-2xl backdrop-blur-xl animation-delay-2000">
                <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-emerald-500/20 p-2">
                        <LineChart className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                        <div className="text-xs text-gray-500">Objetivo</div>
                        <div className="font-semibold text-white">68% alcanzado</div>
                    </div>
                </div>
            </div>
        </div>
    );
};


