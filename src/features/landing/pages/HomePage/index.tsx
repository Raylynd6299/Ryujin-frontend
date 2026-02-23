import { Background } from './components/Background';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Why } from './components/Why';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { FAQ } from './components/FAQ';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import type React from 'react';

export const HomePage = (): React.ReactElement => {
    return (
        <div className="relative min-h-screen overflow-x-hidden bg-[#070709]">
            <Background />

            <div className="relative z-10">
                <Header />
                <Hero />
                <Why />
                <Features />
                <HowItWorks />
                <FAQ />
                <CTA />
                <Footer />
            </div>
        </div>
    );
};
