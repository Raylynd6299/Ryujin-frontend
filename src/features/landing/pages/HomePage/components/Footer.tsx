import { useTranslation } from '@/hooks/useTranslation';
import { RyujinLogo } from '@/components/shared/RyujinLogo';
import type React from 'react';

export const Footer = (): React.ReactElement => {
    const { t } = useTranslation();

    return (
        <footer className="border-t border-white/[0.04]">
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">

                    {/* Brand */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <div className="mb-4 flex items-center gap-2.5">
                            <RyujinLogo size={32} />
                            <span className="text-[15px] font-bold text-white">Ryujin</span>
                        </div>
                        <p className="text-sm leading-[1.7] text-white/20">{t('landing.footer.tagline')}</p>
                    </div>

                    {/* Product */}
                    <div>
                        <h4 className="mb-5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/20">
                            {t('landing.footer.product')}
                        </h4>
                        <ul className="space-y-3">
                            {[
                                { href: '#features', label: t('landing.header.features') },
                                { href: '#how-it-works', label: t('landing.header.howItWorks') },
                                { href: '#faq', label: t('landing.header.faq') },
                            ].map(({ href, label }) => (
                                <li key={href}>
                                    <a href={href} className="text-sm text-white/25 transition-colors hover:text-violet-400/80">
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Project */}
                    <div>
                        <h4 className="mb-5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/20">
                            {t('landing.footer.company')}
                        </h4>
                        <ul className="space-y-3">
                            {[t('landing.footer.about'), t('landing.footer.changelog'), t('landing.footer.opensource')].map((label) => (
                                <li key={label}>
                                    <span className="cursor-default text-sm text-white/20">{label}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="mb-5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/20">
                            {t('landing.footer.legal')}
                        </h4>
                        <ul className="space-y-3">
                            {[t('landing.footer.privacy'), t('landing.footer.terms')].map((label) => (
                                <li key={label}>
                                    <span className="cursor-default text-sm text-white/20">{label}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-14 flex flex-col items-center gap-2 border-t border-white/[0.04] pt-8 sm:flex-row sm:justify-between">
                    <p className="text-xs text-white/15">{t('landing.footer.copyright')}</p>
                    <p className="text-xs text-white/15">{t('app.description')}</p>
                </div>
            </div>
        </footer>
    );
};
