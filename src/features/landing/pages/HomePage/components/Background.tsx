import type React from "react";

export const Background = (): React.ReactElement => {
    return (
        <>
            {/* Animated Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(0,0,0,0))]" />
            <div className="absolute inset-0">
                <div className="absolute left-1/4 top-0 h-96 w-96 animate-pulse rounded-full bg-violet-500/20 blur-3xl" />
                <div className="absolute right-1/4 top-1/3 h-96 w-96 animate-pulse rounded-full bg-purple-500/20 blur-3xl animation-delay-2000" />
                <div className="absolute bottom-0 left-1/2 h-96 w-96 animate-pulse rounded-full bg-fuchsia-500/20 blur-3xl animation-delay-4000" />
            </div>

            {/* Noise Texture Overlay */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />
        </>
    );
};
