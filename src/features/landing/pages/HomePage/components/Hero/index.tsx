import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import type React from 'react';
import { Dashboard } from '../Dashboard';
import { Stats } from './components/Stats';

export const Hero = (): React.ReactElement => {
    return (
        <section className="container mx-auto px-6 py-24 md:py-32">
            <div className="grid items-center gap-12 lg:grid-cols-2">
                <div className="space-y-8">
                    <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-300 backdrop-blur-sm">
                        <Sparkles className="h-4 w-4" />
                        <span>Gestión Financiera Inteligente</span>
                    </div>
                    <h1 className="text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl">
                        Domina tus
                        <span className="block bg-linear-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                            Finanzas
                        </span>
                        con Precisión
                    </h1>
                    <p className="text-xl leading-relaxed text-gray-400">
                        Analiza, optimiza y haz crecer tu patrimonio con herramientas profesionales.
                        Inversiones, presupuestos y objetivos en una plataforma elegante.
                    </p>
                    <div className="flex flex-wrap items-center gap-4">
                        <Link
                            to={ROUTES.REGISTER}
                            className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-violet-600 px-8 py-4 font-semibold text-white shadow-lg shadow-violet-500/50 transition-all hover:bg-violet-500 hover:shadow-violet-500/70"
                        >
                            <span className="relative z-10">Comenzar Gratis</span>
                            <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] transition-transform duration-700 group-hover:translate-x-[200%]" />
                        </Link>
                        <Link
                            to={ROUTES.LOGIN}
                            className="flex items-center gap-2 rounded-xl border-2 border-white/10 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:border-violet-400/50 hover:bg-white/10"
                        >
                            Iniciar Sesión
                        </Link>
                    </div>

                    {/* Stats */}
                    <Stats />
                </div>

                {/* Dashboard Preview */}
                <Dashboard />
            </div>
        </section>
    );
};