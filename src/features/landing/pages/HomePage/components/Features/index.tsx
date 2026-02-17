import { Wallet, TrendingUp, Target, BarChart3, Shield, Zap } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import type React from 'react';

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    gradient: string;
    borderColor: string;
    glowColor: string;
    className?: string;
}

const FeatureCard = ({ icon, title, description, gradient, borderColor, glowColor, className = '' }: FeatureCardProps) => (
    <div
        className={`group relative overflow-hidden rounded-3xl border bg-white/[0.02] p-7 transition-all duration-500 hover:bg-white/[0.05] ${borderColor} ${className}`}
    >
        {/* Icon with gradient bg */}
        <div className={`mb-5 inline-flex rounded-2xl bg-gradient-to-br p-3.5 shadow-lg ${gradient} ${glowColor}`}>
            <div className="h-5 w-5 text-white">{icon}</div>
        </div>
        <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>
        <p className="text-sm leading-relaxed text-gray-400">{description}</p>

        {/* Corner glow on hover */}
        <div
            className={`pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-30 ${gradient}`}
        />
    </div>
);

export const Features = (): React.ReactElement => {
    const { t } = useTranslation();

    return (
        <section id="features" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
            {/* Section header */}
            <div className="mb-14">
                <div className="mb-3 text-sm font-bold tracking-widest text-violet-400 uppercase">
                    {t('landing.header.features')}
                </div>
                <h2 className="mb-4 max-w-lg text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                    {t('landing.features.title')}
                </h2>
                <p className="max-w-lg text-lg text-gray-400">
                    {t('landing.features.description')}
                </p>
            </div>

            {/* Bento grid with varied sizes */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Large card spanning 2 cols on md */}
                <FeatureCard
                    icon={<Wallet />}
                    title={t('landing.features.totalControl')}
                    description={t('landing.features.totalControlDesc')}
                    gradient="from-emerald-500 to-teal-500"
                    borderColor="border-emerald-500/10 hover:border-emerald-500/30"
                    glowColor="shadow-emerald-500/25"
                    className="md:col-span-2 lg:col-span-1"
                />
                <FeatureCard
                    icon={<TrendingUp />}
                    title={t('landing.features.smartInvestments')}
                    description={t('landing.features.smartInvestmentsDesc')}
                    gradient="from-violet-500 to-purple-600"
                    borderColor="border-violet-500/10 hover:border-violet-500/30"
                    glowColor="shadow-violet-500/25"
                />
                <FeatureCard
                    icon={<Target />}
                    title={t('landing.features.clearGoals')}
                    description={t('landing.features.clearGoalsDesc')}
                    gradient="from-orange-500 to-rose-500"
                    borderColor="border-orange-500/10 hover:border-orange-500/30"
                    glowColor="shadow-orange-500/25"
                />
                <FeatureCard
                    icon={<BarChart3 />}
                    title={t('landing.features.advancedAnalytics')}
                    description={t('landing.features.advancedAnalyticsDesc')}
                    gradient="from-cyan-500 to-blue-500"
                    borderColor="border-cyan-500/10 hover:border-cyan-500/30"
                    glowColor="shadow-cyan-500/25"
                />
                <FeatureCard
                    icon={<Shield />}
                    title={t('landing.features.bankSecurity')}
                    description={t('landing.features.bankSecurityDesc')}
                    gradient="from-pink-500 to-rose-500"
                    borderColor="border-pink-500/10 hover:border-pink-500/30"
                    glowColor="shadow-pink-500/25"
                />
                <FeatureCard
                    icon={<Zap />}
                    title={t('landing.features.instantSync')}
                    description={t('landing.features.instantSyncDesc')}
                    gradient="from-amber-500 to-orange-500"
                    borderColor="border-amber-500/10 hover:border-amber-500/30"
                    glowColor="shadow-amber-500/25"
                    className="md:col-span-2 lg:col-span-1"
                />
            </div>
        </section>
    );
};
