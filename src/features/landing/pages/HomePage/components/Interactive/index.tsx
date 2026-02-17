import { CheckItem } from './components/CheckItem';
import { ChartShowcase } from './components/ChartShowcase';
import type React from 'react';

export const Interactive = (): React.ReactElement => {
    return (
        <section className="container mx-auto px-6 py-24">
            <div className="grid items-center gap-12 lg:grid-cols-2">
                <div className="space-y-6">
                    <h2 className="text-4xl font-bold leading-tight text-white md:text-5xl">
                        Visualiza tus finanzas
                        <span className="block text-violet-400">como nunca antes</span>
                    </h2>
                    <p className="text-lg leading-relaxed text-gray-400">
                        Gráficos interactivos y dashboards personalizables te dan una visión completa
                        de tu salud financiera en tiempo real. Toma decisiones informadas con datos
                        precisos al alcance de tu mano.
                    </p>
                    <ul className="space-y-4">
                        <CheckItem text="Reportes mensuales automatizados" />
                        <CheckItem text="Alertas inteligentes de gastos" />
                        <CheckItem text="Proyecciones financieras basadas en IA" />
                        <CheckItem text="Exportación de datos en múltiples formatos" />
                    </ul>
                </div>
                <div className="relative">
                    <ChartShowcase />
                </div>
            </div>
        </section>
    );
};
