import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useLogin } from '../hooks/useAuth';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/lib/constants';
import { RyujinLogo } from '@/components/shared/RyujinLogo';

/* ─── Floating financial ticker ─────────────────────────────────────────── */
const TICKERS = [
    { symbol: 'BTC', value: '+4.2%', positive: true },
    { symbol: 'SPY', value: '+1.8%', positive: true },
    { symbol: 'AAPL', value: '+2.1%', positive: true },
    { symbol: 'TSLA', value: '-0.9%', positive: false },
    { symbol: 'NVDA', value: '+6.3%', positive: true },
    { symbol: 'EUR/USD', value: '+0.3%', positive: true },
    { symbol: 'MSFT', value: '+1.4%', positive: true },
    { symbol: 'GLD', value: '-0.5%', positive: false },
];

/* ─── Abstract chart sparkline (pure SVG) ───────────────────────────────── */
const SparkLine = ({ points, color }: { points: string; color: string }) => (
    <svg viewBox="0 0 120 40" fill="none" className="w-full h-full">
        <polyline
            points={points}
            stroke={color}
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.6"
        />
    </svg>
);

/* ─── Floating card widget ───────────────────────────────────────────────── */
const FloatingCard = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => (
    <div
        className={cn(
            'absolute rounded-2xl border border-white/[0.06] bg-white/[0.04] p-3 backdrop-blur-sm',
            className,
        )}
    >
        {children}
    </div>
);

export const LoginPage = () => {
    const { t } = useTranslation();
    const { mutate: login, isPending, error } = useLogin();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

    const validate = () => {
        const errors: typeof fieldErrors = {};
        if (!email.trim()) errors.email = t('validation.required');
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = t('validation.invalidEmail');
        if (!password) errors.password = t('validation.required');
        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        login({ email: email.trim(), password });
    };

    return (
        <div className="relative flex min-h-screen w-full overflow-hidden bg-[#070709]">

            {/* ── BACKGROUND CANVAS ──────────────────────────────────────── */}
            <div className="pointer-events-none absolute inset-0">
                {/* Deep violet glow — top left */}
                <div className="animate-drift absolute -top-32 -left-32 h-[600px] w-[600px] rounded-full bg-violet-600/[0.15] blur-[140px]" />
                {/* Indigo glow — bottom right */}
                <div className="animate-drift-slow absolute -bottom-40 -right-20 h-[500px] w-[500px] rounded-full bg-indigo-500/[0.12] blur-[120px]" />
                {/* Faint center accent */}
                <div className="animate-drift-reverse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-purple-400/[0.06] blur-[100px]" />

                {/* Fine grid */}
                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(167,139,250,1) 1px, transparent 1px),' +
                            'linear-gradient(90deg, rgba(167,139,250,1) 1px, transparent 1px)',
                        backgroundSize: '80px 80px',
                    }}
                />
            </div>

            {/* ── DECORATIVE FLOATING WIDGETS (desktop) ───────────────────── */}
            {/* Portfolio balance card */}
            <FloatingCard className="left-[5%] top-[14%] w-44 animate-float hidden xl:block">
                <div className="mb-1 text-[10px] text-white/30 tracking-widest uppercase">Portfolio</div>
                <div className="text-lg font-bold text-white tabular-nums">$84,231</div>
                <div className="mt-0.5 text-xs text-emerald-400">↑ +12.4% this month</div>
                <div className="mt-2 h-8">
                    <SparkLine
                        points="0,30 15,22 30,25 45,14 60,18 75,8 90,12 105,6 120,2"
                        color="#34d399"
                    />
                </div>
            </FloatingCard>

            {/* Ticker strip */}
            <FloatingCard className="right-[4%] top-[18%] animate-float-delayed hidden xl:block">
                <div className="flex flex-col gap-1.5">
                    {TICKERS.slice(0, 4).map((t) => (
                        <div key={t.symbol} className="flex items-center justify-between gap-6">
                            <span className="text-[11px] font-medium text-white/60">{t.symbol}</span>
                            <span
                                className={cn(
                                    'text-[11px] font-semibold tabular-nums',
                                    t.positive ? 'text-emerald-400' : 'text-red-400',
                                )}
                            >
                                {t.value}
                            </span>
                        </div>
                    ))}
                </div>
            </FloatingCard>

            {/* Savings goal card */}
            <FloatingCard className="left-[6%] bottom-[18%] w-40 animate-float-slow hidden xl:block">
                <div className="mb-1 text-[10px] text-white/30 tracking-widest uppercase">Savings Goal</div>
                <div className="mb-2 text-sm font-semibold text-white">MacBook Pro</div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-violet-500 to-purple-400" />
                </div>
                <div className="mt-1 text-right text-[10px] text-violet-400">68%</div>
            </FloatingCard>

            {/* Monthly cashflow chip */}
            <FloatingCard className="right-[5%] bottom-[22%] animate-float hidden xl:block">
                <div className="text-[10px] text-white/30 uppercase tracking-widest mb-1.5">Cash Flow</div>
                <div className="flex items-center gap-3">
                    <div className="text-center">
                        <div className="text-[10px] text-white/40">In</div>
                        <div className="text-sm font-bold text-emerald-400">+$6,200</div>
                    </div>
                    <div className="h-6 w-px bg-white/10" />
                    <div className="text-center">
                        <div className="text-[10px] text-white/40">Out</div>
                        <div className="text-sm font-bold text-red-400">-$3,840</div>
                    </div>
                </div>
            </FloatingCard>

            {/* ── CENTERED CONTENT ─────────────────────────────────────────── */}
            <div className="relative z-10 flex w-full flex-col items-center justify-center px-5 py-10">

                {/* Logo + wordmark */}
                <div className="mb-8 flex flex-col items-center gap-3 animate-fade-up">
                    <RyujinLogo size={56} />
                    <span className="text-xl font-bold tracking-tight text-white">{t('app.name')}</span>
                </div>

                {/* Glass form card */}
                <div
                    className={cn(
                        'w-full max-w-[400px] animate-fade-up delay-100',
                        'rounded-3xl border border-white/[0.08]',
                        'bg-white/[0.04] backdrop-blur-2xl',
                        'p-8 shadow-[0_8px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.04)]',
                    )}
                >
                    {/* Card header */}
                    <div className="mb-7">
                        <h1 className="text-2xl font-bold tracking-tight text-white">{t('auth.welcomeBack')}</h1>
                        <p className="mt-1 text-sm text-white/40">{t('auth.loginSubtitle')}</p>
                    </div>

                    {/* API error */}
                    {error && (
                        <div className="mb-5 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/[0.08] px-4 py-3">
                            <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                            <p className="text-sm text-red-400">{t('auth.loginError')}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} noValidate className="space-y-4">
                        {/* Email */}
                        <div className="space-y-1.5">
                            <label htmlFor="email" className="block text-[13px] font-medium text-white/60">
                                {t('auth.email')}
                            </label>
                            <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (fieldErrors.email) setFieldErrors((p) => ({ ...p, email: undefined }));
                                }}
                                className={cn(
                                    'h-11 w-full rounded-xl border bg-white/[0.06] px-4 text-sm text-white outline-none',
                                    'placeholder:text-white/20',
                                    'transition-all duration-200',
                                    'focus:bg-white/[0.09] focus:ring-2',
                                    fieldErrors.email
                                        ? 'border-red-500/40 focus:ring-red-500/20'
                                        : 'border-white/[0.08] focus:border-violet-500/50 focus:ring-violet-500/20',
                                )}
                                placeholder="you@example.com"
                            />
                            {fieldErrors.email && (
                                <p className="text-xs text-red-400">{fieldErrors.email}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label htmlFor="password" className="block text-[13px] font-medium text-white/60">
                                {t('auth.password')}
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (fieldErrors.password) setFieldErrors((p) => ({ ...p, password: undefined }));
                                    }}
                                    className={cn(
                                        'h-11 w-full rounded-xl border bg-white/[0.06] px-4 pr-11 text-sm text-white outline-none',
                                        'placeholder:text-white/20',
                                        'transition-all duration-200',
                                        'focus:bg-white/[0.09] focus:ring-2',
                                        fieldErrors.password
                                            ? 'border-red-500/40 focus:ring-red-500/20'
                                            : 'border-white/[0.08] focus:border-violet-500/50 focus:ring-violet-500/20',
                                    )}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer p-1 text-white/25 transition-colors duration-150 hover:text-white/60"
                                    tabIndex={-1}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                </button>
                            </div>
                            {fieldErrors.password && (
                                <p className="text-xs text-red-400">{fieldErrors.password}</p>
                            )}
                        </div>

                        {/* CTA button */}
                        <button
                            type="submit"
                            disabled={isPending}
                            className={cn(
                                'group relative mt-2 flex h-11 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl',
                                'bg-gradient-to-r from-violet-600 to-violet-500',
                                'text-sm font-semibold text-white',
                                'shadow-[0_0_20px_rgba(139,92,246,0.35)]',
                                'transition-all duration-200',
                                'hover:shadow-[0_0_30px_rgba(139,92,246,0.55)] hover:brightness-110',
                                'focus:outline-none focus:ring-2 focus:ring-violet-500/50',
                                isPending && 'cursor-not-allowed opacity-50',
                            )}
                        >
                            {/* Shimmer sweep */}
                            <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-15deg] bg-white/10 transition-transform duration-700 group-hover:translate-x-[250%]" />

                            {isPending ? (
                                <>
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                    {t('auth.signingIn')}
                                </>
                            ) : (
                                <>
                                    {t('auth.signIn')}
                                    <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="mt-6 text-center text-[13px] text-white/30">
                        {t('auth.noAccount')}{' '}
                        <Link
                            to={ROUTES.REGISTER}
                            className="font-medium text-violet-400 transition-colors hover:text-violet-300"
                        >
                            {t('auth.signUp')}
                        </Link>
                    </p>
                </div>

                {/* Bottom ticker strip */}
                <div className="mt-6 flex items-center gap-4 animate-fade-up delay-200">
                    {TICKERS.map((tick) => (
                        <div key={tick.symbol} className="flex items-center gap-1.5">
                            <span className="text-[11px] text-white/25">{tick.symbol}</span>
                            <span
                                className={cn(
                                    'text-[11px] font-medium tabular-nums',
                                    tick.positive ? 'text-emerald-500/70' : 'text-red-500/70',
                                )}
                            >
                                {tick.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
