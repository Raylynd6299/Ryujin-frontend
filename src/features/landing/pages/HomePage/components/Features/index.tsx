import { Wallet, TrendingUp, Target, BarChart3, Shield, Zap } from 'lucide-react';
import { FeatureCard } from './components/FeatureCard';
import type React from 'react';

export const Features = (): React.ReactElement => {
    return (
        <section className="container mx-auto px-6 py-24">
            <div className="mb-16 text-center">
                <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
                    Todo lo que necesitas en un solo lugar
                </h2>
                <p className="text-xl text-gray-400">
                    Herramientas profesionales para gestionar cada aspecto de tu vida financiera
                </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <FeatureCard
                    icon={<Wallet />}
                    title="Control Total"
                    description="Rastrea ingresos, gastos, cuentas y deudas con precisión milimétrica"
                    gradient="from-emerald-500 to-teal-500"
                />
                <FeatureCard
                    icon={<TrendingUp />}
                    title="Inversiones Inteligentes"
                    description="Monitorea tu portafolio y analiza acciones con datos en tiempo real"
                    gradient="from-violet-500 to-purple-500"
                />
                <FeatureCard
                    icon={<Target />}
                    title="Objetivos Claros"
                    description="Alcanza tus metas financieras con planes personalizados y seguimiento"
                    gradient="from-orange-500 to-red-500"
                />
                <FeatureCard
                    icon={<BarChart3 />}
                    title="Análisis Avanzado"
                    description="Visualiza patrones y tendencias con gráficos interactivos potentes"
                    gradient="from-blue-500 to-cyan-500"
                />
                <FeatureCard
                    icon={<Shield />}
                    title="Seguridad Total"
                    description="Encriptación de nivel bancario protege toda tu información sensible"
                    gradient="from-purple-500 to-pink-500"
                />
                <FeatureCard
                    icon={<Zap />}
                    title="Sincronización Instantánea"
                    description="Accede desde cualquier dispositivo con sincronización en tiempo real"
                    gradient="from-yellow-500 to-orange-500"
                />
            </div>
        </section>
    );
};
