import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import type React from 'react';

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onToggle: () => void;
}

const FAQItem = ({ question, answer, isOpen, onToggle }: FAQItemProps) => (
    <div
        className={[
            'overflow-hidden rounded-2xl border transition-all duration-300',
            isOpen
                ? 'border-violet-500/20 bg-violet-500/[0.04]'
                : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.09]',
        ].join(' ')}
    >
        <button
            type="button"
            onClick={onToggle}
            className="flex w-full cursor-pointer items-center justify-between p-6 text-left"
        >
            <span className="pr-6 text-[15px] font-semibold text-white/80">{question}</span>
            <div
                className={[
                    'flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300',
                    isOpen ? 'bg-violet-500/20' : 'bg-white/[0.05]',
                ].join(' ')}
            >
                {isOpen
                    ? <Minus className="h-3.5 w-3.5 text-violet-400" strokeWidth={2.5} />
                    : <Plus className="h-3.5 w-3.5 text-white/30" strokeWidth={2.5} />
                }
            </div>
        </button>
        <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className="overflow-hidden">
                <p className="px-6 pb-6 text-sm leading-[1.75] text-white/35">{answer}</p>
            </div>
        </div>
    </div>
);

export const FAQ = (): React.ReactElement => {
    const { t } = useTranslation();
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const items = [
        { q: t('landing.faq.q1'), a: t('landing.faq.a1') },
        { q: t('landing.faq.q2'), a: t('landing.faq.a2') },
        { q: t('landing.faq.q3'), a: t('landing.faq.a3') },
        { q: t('landing.faq.q4'), a: t('landing.faq.a4') },
        { q: t('landing.faq.q5'), a: t('landing.faq.a5') },
        { q: t('landing.faq.q6'), a: t('landing.faq.a6') },
    ];

    return (
        <section id="faq" className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-[1fr_1.6fr]">

                {/* Left: header — sticky */}
                <div className="lg:sticky lg:top-28 lg:self-start">
                    <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-400/80">
                        FAQ
                    </p>
                    <h2 className="mb-4 text-3xl font-extrabold leading-[1.1] tracking-tight text-white md:text-4xl">
                        {t('landing.faq.title')}
                    </h2>
                    <p className="text-[15px] leading-[1.7] text-white/30">
                        {t('landing.faq.description')}
                    </p>
                </div>

                {/* Right: accordion */}
                <div className="space-y-2.5">
                    {items.map((item, index) => (
                        <FAQItem
                            key={item.q}
                            question={item.q}
                            answer={item.a}
                            isOpen={openIndex === index}
                            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
