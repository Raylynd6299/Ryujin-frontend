interface PlaceholderPageProps {
    title: string;
    description?: string;
}

export const PlaceholderPage = ({ title, description }: PlaceholderPageProps) => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">{title}</h1>
                {description && (
                    <p className="mt-2 text-muted-foreground">{description}</p>
                )}
            </div>

            <div className="rounded-lg border bg-card p-6">
                <p className="text-center text-muted-foreground">
                    🚧 Page under construction
                </p>
            </div>
        </div>
    );
};
