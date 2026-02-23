import { useTranslation } from '@/hooks/useTranslation';
import type React from 'react';

interface CardProps {
    index: number;
    title: string;
    description: string;
    accentColor: string;
    glowColor: string;
}

const WhyCard = ({ index, title, description, accentColor, glowColor }: CardProps) => (
    <div className="group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.03] p-8 transition-all duration-500 hover:border-white/[0.12] hover:bg-white/[0.05]">
        {/* Corner glow on hover */}
        <div
            className="pointer-events-none absolute -bottom-12 -right-12 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
            style={{ backgroundColor: glowColor }}
        />

        {/* Big watermark number */}
        <div
            className="pointer-events-none absolute right-4 top-2 select-none font-black leading-none"
            style={{ fontSize: '8rem', color: accentColor, opacity: 0.04 }}
        >
            {String(index).padStart(2, '0')}
        </div>

        {/* Accent line */}
        <div
            className="mb-6 h-[3px] w-8 rounded-full transition-all duration-500 group-hover:w-14"
            style={{ backgroundColor: accentColor }}
        />

        <h3 className="mb-3 text-lg font-bold leading-snug text-white">{title}</h3>
        <p className="text-[15px] leading-[1.7] text-white/35">{description}</p>
    </div>
);

export const Why = (): React.ReactElement => {
    const { t } = useTranslation();

    const cards: CardProps[] = [
        {
            index: 1,
            title: t('landing.why.card1Title'),
            description: t('landing.why.card1Desc'),
            accentColor: '#a78bfa',
            glowColor: 'rgba(167,139,250,0.15)',
        },
        {
            index: 2,
            title: t('landing.why.card2Title'),
            description: t('landing.why.card2Desc'),
            accentColor: '#34d399',
            glowColor: 'rgba(52,211,153,0.12)',
        },
        {
            index: 3,
            title: t('landing.why.card3Title'),
            description: t('landing.why.card3Desc'),
            accentColor: '#22d3ee',
            glowColor: 'rgba(34,211,238,0.12)',
        },
    ];

    return (
        <section id="why" className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
            {/* Header */}
            <div className="mb-16 max-w-xl">
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-violet-400/80">
                    {t('landing.why.label')}
                </p>
                <h2 className="mb-5 text-3xl font-extrabold leading-[1.1] tracking-tight text-white md:text-4xl">
                    {t('landing.why.title')}
                </h2>
                <p className="text-[1.05rem] leading-[1.7] text-white/35">
                    {t('landing.why.description')}
                </p>
            </div>

            {/* Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                {cards.map((card) => (
                    <WhyCard key={card.index} {...card} />
                ))}
            </div>
        </section>
    );
};
