import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import type React from 'react';

export const CTA = (): React.ReactElement => {
    return (
        <section className="container mx-auto px-6 py-24">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-violet-600/20 via-purple-600/20 to-fuchsia-600/20 p-12 backdrop-blur-xl md:p-16">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,92,246,0.2),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(168,85,247,0.2),transparent_50%)]" />

                <div className="relative z-10 text-center">
                    <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
                        ¿Listo para transformar tus finanzas?
                    </h2>
                    <p className="mx-auto mb-10 max-w-2xl text-xl text-gray-300">
                        Únete a miles de usuarios que ya están construyendo su futuro financiero
                        con Ryujin. Gratis, sin tarjeta de crédito requerida.
                    </p>
                    <Link
                        to={ROUTES.REGISTER}
                        className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl bg-white px-10 py-5 text-lg font-bold text-violet-600 shadow-2xl shadow-violet-500/50 transition-all hover:scale-105"
                    >
                        <span className="relative z-10">Crear Cuenta Gratis</span>
                        <ArrowRight className="relative z-10 h-6 w-6 transition-transform group-hover:translate-x-2" />
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-violet-100 to-transparent translate-x-[-200%] transition-transform duration-700 group-hover:translate-x-[200%]" />
                    </Link>
                    <p className="mt-6 text-sm text-gray-400">
                        No requiere tarjeta de crédito · Configura tu cuenta en menos de 2 minutos
                    </p>
                </div>
            </div>
        </section>
    );
};
