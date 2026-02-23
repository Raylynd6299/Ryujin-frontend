import type React from 'react';

export const Background = (): React.ReactElement => {
    return (
        <>
            {/* Base — exact same as login/register */}
            <div className="absolute inset-0 bg-[#070709]" />

            {/* Violet glow — top left */}
            <div className="animate-drift absolute -top-40 -left-40 h-[700px] w-[700px] rounded-full bg-violet-600/[0.13] blur-[160px]" />
            {/* Indigo — bottom right */}
            <div className="animate-drift-slow absolute -bottom-40 -right-20 h-[600px] w-[600px] rounded-full bg-indigo-500/[0.10] blur-[140px]" />
            {/* Purple center — very faint */}
            <div className="animate-drift-reverse absolute top-[40%] left-[30%] h-[500px] w-[500px] rounded-full bg-purple-500/[0.06] blur-[120px]" />
            {/* Faint cyan accent — mid right */}
            <div className="animate-drift absolute top-[20%] right-[10%] h-[350px] w-[350px] rounded-full bg-cyan-500/[0.05] blur-[100px]" />

            {/* Fine line grid — same as login */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(167,139,250,1) 1px, transparent 1px),' +
                        'linear-gradient(90deg, rgba(167,139,250,1) 1px, transparent 1px)',
                    backgroundSize: '80px 80px',
                }}
            />

            {/* Radial vignette — keeps focus on content */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,transparent_40%,#070709_100%)]" />
        </>
    );
};
