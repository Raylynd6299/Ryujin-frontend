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
    <div className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
        isOpen ? 'border-violet-500/20 bg-violet-500/[0.04]' : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.1]'
    }`}>
        <button
            type="button"
            onClick={onToggle}
            className="flex w-full items-center justify-between p-6 text-left"
        >
            <span className="pr-6 text-[15px] font-bold text-white">{question}</span>
            <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all ${
                isOpen
                    ? 'bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-md shadow-violet-500/20'
                    : 'bg-white/[0.06]'
            }`}>
                {isOpen
                    ? <Minus className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                    : <Plus className="h-3.5 w-3.5 text-gray-400" strokeWidth={3} />
                }
            </div>
        </button>
        <div
            className={`grid transition-all duration-300 ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
            }`}
        >
            <div className="overflow-hidden">
                <p className="px-6 pb-6 text-sm leading-relaxed text-gray-400">{answer}</p>
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
        <section id="faq" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
            {/* Section header */}
            <div className="mb-12 text-center">
                <div className="mb-3 text-sm font-bold tracking-widest text-emerald-400 uppercase">
                    FAQ
                </div>
                <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                    {t('landing.faq.title')}
                </h2>
                <p className="mx-auto max-w-xl text-lg text-gray-400">
                    {t('landing.faq.description')}
                </p>
            </div>

            {/* FAQ items */}
            <div className="mx-auto max-w-2xl space-y-3">
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
        </section>
    );
};
