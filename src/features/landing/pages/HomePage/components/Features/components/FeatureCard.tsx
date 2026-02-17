interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    gradient: string;
}

export const FeatureCard = ({ icon, title, description, gradient }: FeatureCardProps): React.ReactElement => (
    <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-white/10 hover:bg-white/10">
        <div className={`mb-6 inline-flex rounded-xl bg-linear-to-br ${gradient} p-4 text-white shadow-lg`}>
            <div className="h-7 w-7">{icon}</div>
        </div>
        <h3 className="mb-3 text-xl font-semibold text-white">{title}</h3>
        <p className="leading-relaxed text-gray-400">{description}</p>
        <div
            className={`absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-linear-to-br ${gradient} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20`}
        />
    </div>
);
