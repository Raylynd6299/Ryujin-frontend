import { Link } from 'react-router-dom';
import { Check, Sparkles } from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import { useTranslation } from '@/hooks/useTranslation';
import type React from 'react';

interface PlanProps {
    name: string;
    price: string;
    period: string;
    description: string;
    cta: string;
    features: string[];
    highlighted?: boolean;
    badge?: string;
}

const PlanCard = ({ name, price, period, description, cta, features, highlighted, badge }: PlanProps) => (
    <div
        className={`relative flex flex-col overflow-hidden rounded-3xl border p-8 transition-all duration-300 ${
            highlighted
                ? 'border-violet-500/30 bg-gradient-to-b from-violet-500/[0.08] to-transparent shadow-2xl shadow-violet-500/10'
                : 'border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15]'
        }`}
    >
        {/* Gradient top edge for highlighted */}
        {highlighted && (
            <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500" />
        )}

        {badge && (
            <div className="mb-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-3 py-1 text-[11px] font-bold text-white shadow-lg shadow-violet-500/20">
                <Sparkles className="h-3 w-3" />
                {badge}
            </div>
        )}

        <div className="mb-6">
            <h3 className="mb-1 text-xl font-bold text-white">{name}</h3>
            <p className="text-sm text-gray-400">{description}</p>
        </div>

        <div className="mb-7">
            <span className="text-5xl font-black tabular-nums tracking-tight text-white">{price}</span>
            <span className="text-sm font-medium text-gray-500">{period}</span>
        </div>

        <Link
            to={ROUTES.REGISTER}
            className={`mb-7 block rounded-2xl py-3.5 text-center text-sm font-bold transition-all ${
                highlighted
                    ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40'
                    : 'border border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08]'
            }`}
        >
            {cta}
        </Link>

        <ul className="mt-auto space-y-3">
            {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-gray-300">
                    <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                        highlighted ? 'bg-violet-500/20' : 'bg-white/[0.06]'
                    }`}>
                        <Check className={`h-2.5 w-2.5 ${highlighted ? 'text-violet-400' : 'text-gray-500'}`} strokeWidth={3} />
                    </div>
                    <span>{feature}</span>
                </li>
            ))}
        </ul>
    </div>
);

export const Pricing = (): React.ReactElement => {
    const { t } = useTranslation();

    return (
        <section id="pricing" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
            {/* Section header */}
            <div className="mb-14 text-center">
                <div className="mb-3 text-sm font-bold tracking-widest text-fuchsia-400 uppercase">
                    {t('landing.header.pricing')}
                </div>
                <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                    {t('landing.pricing.title')}
                </h2>
                <p className="mx-auto max-w-xl text-lg text-gray-400">
                    {t('landing.pricing.description')}
                </p>
            </div>

            {/* Plans grid */}
            <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
                <PlanCard
                    name={t('landing.pricing.free.name')}
                    price={t('landing.pricing.free.price')}
                    period={t('landing.pricing.free.period')}
                    description={t('landing.pricing.free.description')}
                    cta={t('landing.pricing.free.cta')}
                    features={[
                        t('landing.pricing.free.feature1'),
                        t('landing.pricing.free.feature2'),
                        t('landing.pricing.free.feature3'),
                        t('landing.pricing.free.feature4'),
                        t('landing.pricing.free.feature5'),
                    ]}
                />
                <PlanCard
                    name={t('landing.pricing.pro.name')}
                    price={t('landing.pricing.pro.price')}
                    period={t('landing.pricing.pro.period')}
                    description={t('landing.pricing.pro.description')}
                    cta={t('landing.pricing.pro.cta')}
                    highlighted
                    badge={t('landing.pricing.popular')}
                    features={[
                        t('landing.pricing.pro.feature1'),
                        t('landing.pricing.pro.feature2'),
                        t('landing.pricing.pro.feature3'),
                        t('landing.pricing.pro.feature4'),
                        t('landing.pricing.pro.feature5'),
                        t('landing.pricing.pro.feature6'),
                        t('landing.pricing.pro.feature7'),
                    ]}
                />
                <PlanCard
                    name={t('landing.pricing.enterprise.name')}
                    price={t('landing.pricing.enterprise.price')}
                    period={t('landing.pricing.enterprise.period')}
                    description={t('landing.pricing.enterprise.description')}
                    cta={t('landing.pricing.enterprise.cta')}
                    features={[
                        t('landing.pricing.enterprise.feature1'),
                        t('landing.pricing.enterprise.feature2'),
                        t('landing.pricing.enterprise.feature3'),
                        t('landing.pricing.enterprise.feature4'),
                        t('landing.pricing.enterprise.feature5'),
                        t('landing.pricing.enterprise.feature6'),
                    ]}
                />
            </div>
        </section>
    );
};
