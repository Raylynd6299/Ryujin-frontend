import { useTranslation } from '@/hooks/useTranslation';
import type React from 'react';

export const Footer = (): React.ReactElement => {
    const { t } = useTranslation();

    return (
        <footer className="border-t border-white/[0.06]">
            <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Brand column */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <div className="mb-4 flex items-center gap-2.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/20">
                                <span className="text-xs font-black text-white">R</span>
                            </div>
                            <span className="text-base font-bold text-white">Ryujin</span>
                        </div>
                        <p className="text-sm text-gray-500">{t('landing.footer.tagline')}</p>
                    </div>

                    {/* Product links */}
                    <div>
                        <h4 className="mb-4 text-xs font-bold tracking-widest text-gray-400 uppercase">
                            {t('landing.footer.product')}
                        </h4>
                        <ul className="space-y-2.5">
                            <li>
                                <a href="#features" className="text-sm text-gray-500 transition-colors hover:text-violet-400">
                                    {t('landing.header.features')}
                                </a>
                            </li>
                            <li>
                                <a href="#pricing" className="text-sm text-gray-500 transition-colors hover:text-violet-400">
                                    {t('landing.header.pricing')}
                                </a>
                            </li>
                            <li>
                                <a href="#faq" className="text-sm text-gray-500 transition-colors hover:text-violet-400">
                                    {t('landing.header.faq')}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Company links */}
                    <div>
                        <h4 className="mb-4 text-xs font-bold tracking-widest text-gray-400 uppercase">
                            {t('landing.footer.company')}
                        </h4>
                        <ul className="space-y-2.5">
                            <li><span className="text-sm text-gray-500">{t('landing.footer.about')}</span></li>
                            <li><span className="text-sm text-gray-500">{t('landing.footer.blog')}</span></li>
                            <li><span className="text-sm text-gray-500">{t('landing.footer.careers')}</span></li>
                        </ul>
                    </div>

                    {/* Legal links */}
                    <div>
                        <h4 className="mb-4 text-xs font-bold tracking-widest text-gray-400 uppercase">
                            {t('landing.footer.legal')}
                        </h4>
                        <ul className="space-y-2.5">
                            <li><span className="text-sm text-gray-500">{t('landing.footer.privacy')}</span></li>
                            <li><span className="text-sm text-gray-500">{t('landing.footer.terms')}</span></li>
                            <li><span className="text-sm text-gray-500">{t('landing.footer.cookies')}</span></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 flex flex-col items-center gap-4 border-t border-white/[0.06] pt-6 sm:flex-row sm:justify-between">
                    <p className="text-xs text-gray-600">
                        {t('landing.footer.copyright')}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                        <span>Built with</span>
                        <span className="text-gradient font-bold">Ryujin</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
