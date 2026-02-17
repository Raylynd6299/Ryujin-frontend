import { Wallet } from 'lucide-react';

export const Footer = (): React.ReactElement => {
    return (
        <footer className="border-t border-white/5 bg-slate-950/50 backdrop-blur-xl">
            <div className="container mx-auto px-6 py-12">
                <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                    <div className="flex items-center gap-3">
                        <Wallet className="h-8 w-8 text-violet-400" />
                        <span className="text-xl font-bold text-white">Ryujin</span>
                    </div>
                    <p className="text-sm text-gray-500">
                        © 2026 Ryujin. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
};
