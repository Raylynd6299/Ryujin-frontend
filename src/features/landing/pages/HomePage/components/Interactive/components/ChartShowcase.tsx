import { BarChart3, PieChart } from 'lucide-react';

export const ChartShowcase = (): React.ReactElement => (
    <div className="relative space-y-6">
        {/* Bar Chart Representation */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 p-8 backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between">
                <h4 className="font-semibold text-white">Gastos por Categoría</h4>
                <BarChart3 className="h-5 w-5 text-violet-400" />
            </div>
            <div className="space-y-4">
                <BarItem label="Vivienda" value={65} color="bg-violet-500" />
                <BarItem label="Alimentación" value={45} color="bg-purple-500" />
                <BarItem label="Transporte" value={30} color="bg-fuchsia-500" />
                <BarItem label="Entretenimiento" value={20} color="bg-pink-500" />
            </div>
        </div>

        {/* Pie Chart Representation */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 p-8 backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between">
                <h4 className="font-semibold text-white">Distribución de Activos</h4>
                <PieChart className="h-5 w-5 text-emerald-400" />
            </div>
            <div className="flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="h-40 w-40">
                    <circle
                        cx="100"
                        cy="100"
                        r="80"
                        fill="none"
                        stroke="#8b5cf6"
                        strokeWidth="40"
                        strokeDasharray="251 251"
                        transform="rotate(-90 100 100)"
                        className="opacity-80"
                    />
                    <circle
                        cx="100"
                        cy="100"
                        r="80"
                        fill="none"
                        stroke="#a855f7"
                        strokeWidth="40"
                        strokeDasharray="126 377"
                        strokeDashoffset="-251"
                        transform="rotate(-90 100 100)"
                        className="opacity-80"
                    />
                    <circle
                        cx="100"
                        cy="100"
                        r="80"
                        fill="none"
                        stroke="#d946ef"
                        strokeWidth="40"
                        strokeDasharray="63 440"
                        strokeDashoffset="-377"
                        transform="rotate(-90 100 100)"
                        className="opacity-80"
                    />
                    <circle
                        cx="100"
                        cy="100"
                        r="80"
                        fill="none"
                        stroke="#ec4899"
                        strokeWidth="40"
                        strokeDasharray="63 440"
                        strokeDashoffset="-440"
                        transform="rotate(-90 100 100)"
                        className="opacity-80"
                    />
                </svg>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                <LegendItem color="bg-violet-500" label="Acciones" value="40%" />
                <LegendItem color="bg-purple-500" label="Bonos" value="25%" />
                <LegendItem color="bg-fuchsia-500" label="ETFs" value="20%" />
                <LegendItem color="bg-pink-500" label="Crypto" value="15%" />
            </div>
        </div>
    </div>
);

const BarItem = ({ label, value, color }: { label: string; value: number; color: string }) => (
    <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">{label}</span>
            <span className="font-semibold text-white">{value}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/5">
            <div
                className={`h-full ${color} transition-all duration-1000`}
                style={{ width: `${value}%` }}
            />
        </div>
    </div>
);

const LegendItem = ({ color, label, value }: { color: string; label: string; value: string }) => (
    <div className="flex items-center gap-2">
        <div className={`h-3 w-3 rounded-sm ${color}`} />
        <span className="text-gray-400">{label}</span>
        <span className="ml-auto font-semibold text-white">{value}</span>
    </div>
);
