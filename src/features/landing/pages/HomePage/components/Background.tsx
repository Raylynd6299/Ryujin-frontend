import type React from 'react';

export const Background = (): React.ReactElement => {
    return (
        <>
            {/* Deep base gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[#0c0a1e] to-slate-950" />

            {/* Colored drifting orbs */}
            <div className="animate-drift absolute -left-32 -top-32 h-[600px] w-[600px] rounded-full bg-violet-600/20 blur-[150px]" />
            <div className="animate-drift-slow absolute -right-20 top-[20%] h-[500px] w-[500px] rounded-full bg-cyan-500/15 blur-[130px]" />
            <div className="animate-drift-reverse absolute bottom-[10%] left-[30%] h-[450px] w-[450px] rounded-full bg-fuchsia-500/15 blur-[120px]" />
            <div className="animate-drift absolute bottom-0 right-[10%] h-[350px] w-[350px] rounded-full bg-emerald-500/10 blur-[100px]" />

            {/* Radial spotlight */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-5%,rgba(139,92,246,0.25),transparent)]" />

            {/* Dot grid pattern */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(167,139,250,0.8) 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                }}
            />

            {/* Noise texture */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
            />
        </>
    );
};
