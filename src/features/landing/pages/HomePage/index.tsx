import { Background } from './components/Background';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Interactive } from './components/Interactive';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import type React from 'react';

export const HomePage = (): React.ReactElement => {
    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-950">
            <Background />

            <div className="relative z-10">
                <Header />
                <Hero />
                <Features />
                <Interactive />
                <Pricing />
                <FAQ />
                <CTA />
                <Footer />
            </div>
        </div>
    );
};
