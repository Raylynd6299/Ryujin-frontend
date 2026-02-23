import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, Check } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useRegister } from '../hooks/useAuth';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/lib/constants';
import { RyujinLogo } from '@/components/shared/RyujinLogo';

interface FormFields {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

type FieldErrors = Partial<Record<keyof FormFields, string>>;

/* ─── Password strength indicator ─────────────────────────────────────── */
const getStrength = (pw: string): number => {
    if (!pw) return 0;
    let score = 0;
    if (pw.length >= 8) score++;
    if (pw.length >= 12) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
};

const STRENGTH_COLORS = ['', 'bg-red-500', 'bg-orange-500', 'bg-yellow-400', 'bg-emerald-400', 'bg-emerald-400'];
const STRENGTH_LABELS = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];

/* ─── Floating decorative card ─────────────────────────────────────────── */
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

export const RegisterPage = () => {
    const { t } = useTranslation();
    const { mutate: register, isPending, error } = useRegister();

    const [fields, setFields] = useState<FormFields>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

    const update = (key: keyof FormFields) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFields((p) => ({ ...p, [key]: e.target.value }));
        if (fieldErrors[key]) setFieldErrors((p) => ({ ...p, [key]: undefined }));
    };

    const validate = (): boolean => {
        const errors: FieldErrors = {};
        if (!fields.firstName.trim()) errors.firstName = t('validation.required');
        if (!fields.lastName.trim()) errors.lastName = t('validation.required');
        if (!fields.email.trim()) errors.email = t('validation.required');
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errors.email = t('validation.invalidEmail');
        if (!fields.password) errors.password = t('validation.required');
        else if (fields.password.length < 8) errors.password = t('validation.minLength', { min: 8 });
        if (!fields.confirmPassword) errors.confirmPassword = t('validation.required');
        else if (fields.password !== fields.confirmPassword) errors.confirmPassword = t('validation.passwordMismatch');
        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        register({
            firstName: fields.firstName.trim(),
            lastName: fields.lastName.trim(),
            email: fields.email.trim(),
            password: fields.password,
            confirmPassword: fields.confirmPassword,
        });
    };

    const pwStrength = getStrength(fields.password);

    const inputClass = (hasError?: string) =>
        cn(
            'h-11 w-full rounded-xl border bg-white/[0.06] px-4 text-sm text-white outline-none',
            'placeholder:text-white/20',
            'transition-all duration-200',
            'focus:bg-white/[0.09] focus:ring-2',
            hasError
                ? 'border-red-500/40 focus:ring-red-500/20'
                : 'border-white/[0.08] focus:border-violet-500/50 focus:ring-violet-500/20',
        );

    return (
        <div className="relative flex min-h-screen w-full overflow-hidden bg-[#070709]">

            {/* ── BACKGROUND CANVAS ──────────────────────────────────────── */}
            <div className="pointer-events-none absolute inset-0">
                {/* Violet top-right */}
                <div className="animate-drift-slow absolute -top-20 -right-20 h-[550px] w-[550px] rounded-full bg-violet-600/[0.14] blur-[130px]" />
                {/* Indigo bottom-left */}
                <div className="animate-drift absolute -bottom-32 -left-16 h-[480px] w-[480px] rounded-full bg-indigo-500/[0.11] blur-[110px]" />
                {/* Soft center */}
                <div className="animate-drift-reverse absolute top-1/3 left-1/2 -translate-x-1/2 h-[350px] w-[350px] rounded-full bg-purple-500/[0.06] blur-[90px]" />

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

            {/* ── DECORATIVE WIDGETS (desktop only) ───────────────────────── */}
            {/* Onboarding steps */}
            <FloatingCard className="left-[5%] top-[20%] w-44 animate-float hidden xl:block">
                <div className="mb-2 text-[10px] text-white/30 tracking-widest uppercase">Getting Started</div>
                {[
                    { label: 'Create account', done: true },
                    { label: 'Connect finances', done: false },
                    { label: 'Set your goals', done: false },
                ].map((step, i) => (
                    <div key={i} className="flex items-center gap-2 py-1">
                        <div
                            className={cn(
                                'flex h-4 w-4 shrink-0 items-center justify-center rounded-full',
                                step.done
                                    ? 'bg-violet-500/80'
                                    : 'border border-white/15',
                            )}
                        >
                            {step.done && <Check size={9} className="text-white" />}
                        </div>
                        <span className={cn('text-[11px]', step.done ? 'text-white/70' : 'text-white/25')}>
                            {step.label}
                        </span>
                    </div>
                ))}
            </FloatingCard>

            {/* Security badge */}
            <FloatingCard className="right-[4%] top-[22%] w-36 animate-float-delayed hidden xl:block">
                <div className="mb-1 text-[10px] text-white/30 uppercase tracking-widest">Security</div>
                <div className="flex items-center gap-2 mt-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/20">
                        <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3">
                            <path d="M8 1L2 4v4c0 3.3 2.5 6 6 7 3.5-1 6-3.7 6-7V4L8 1z" fill="#34d399" opacity="0.7"/>
                            <path d="M5 8l2 2 4-4" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <span className="text-[11px] text-emerald-400">AES-256</span>
                </div>
                <div className="mt-2 text-[10px] text-white/25 leading-relaxed">
                    Bank-grade encryption on all your data
                </div>
            </FloatingCard>

            {/* Net worth preview */}
            <FloatingCard className="left-[6%] bottom-[20%] w-40 animate-float-slow hidden xl:block">
                <div className="mb-1 text-[10px] text-white/30 tracking-widest uppercase">Net Worth</div>
                <div className="text-lg font-bold text-white">$0</div>
                <div className="mt-0.5 text-[11px] text-white/30">Start tracking today</div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
                    <div className="h-full w-0 rounded-full bg-gradient-to-r from-violet-500 to-purple-400 transition-all duration-1000" />
                </div>
            </FloatingCard>

            {/* Currencies chip */}
            <FloatingCard className="right-[5%] bottom-[24%] animate-float hidden xl:block">
                <div className="text-[10px] text-white/30 uppercase tracking-widest mb-2">Multi-currency</div>
                <div className="flex gap-2">
                    {['USD', 'EUR', 'MXN', 'BTC'].map((c) => (
                        <div key={c} className="rounded-md border border-white/[0.08] bg-white/[0.05] px-2 py-0.5 text-[10px] text-white/40">
                            {c}
                        </div>
                    ))}
                </div>
            </FloatingCard>

            {/* ── CENTERED CONTENT ─────────────────────────────────────────── */}
            <div className="relative z-10 flex w-full flex-col items-center justify-center px-5 py-10">

                {/* Logo + wordmark */}
                <div className="mb-7 flex flex-col items-center gap-3 animate-fade-up">
                    <RyujinLogo size={56} />
                    <span className="text-xl font-bold tracking-tight text-white">{t('app.name')}</span>
                </div>

                {/* Glass form card */}
                <div
                    className={cn(
                        'w-full max-w-[420px] animate-fade-up delay-100',
                        'rounded-3xl border border-white/[0.08]',
                        'bg-white/[0.04] backdrop-blur-2xl',
                        'p-8 shadow-[0_8px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.04)]',
                    )}
                >
                    {/* Header */}
                    <div className="mb-7">
                        <h1 className="text-2xl font-bold tracking-tight text-white">{t('auth.createAccount')}</h1>
                        <p className="mt-1 text-sm text-white/40">{t('auth.registerSubtitle')}</p>
                    </div>

                    {/* API error */}
                    {error && (
                        <div className="mb-5 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/[0.08] px-4 py-3">
                            <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                            <p className="text-sm text-red-400">{t('auth.registerError')}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} noValidate className="space-y-4">
                        {/* Name row */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1.5">
                                <label htmlFor="firstName" className="block text-[13px] font-medium text-white/60">
                                    {t('auth.firstName')}
                                </label>
                                <input
                                    id="firstName"
                                    type="text"
                                    autoComplete="given-name"
                                    value={fields.firstName}
                                    onChange={update('firstName')}
                                    className={inputClass(fieldErrors.firstName)}
                                    placeholder="John"
                                />
                                {fieldErrors.firstName && (
                                    <p className="text-xs text-red-400">{fieldErrors.firstName}</p>
                                )}
                            </div>
                            <div className="space-y-1.5">
                                <label htmlFor="lastName" className="block text-[13px] font-medium text-white/60">
                                    {t('auth.lastName')}
                                </label>
                                <input
                                    id="lastName"
                                    type="text"
                                    autoComplete="family-name"
                                    value={fields.lastName}
                                    onChange={update('lastName')}
                                    className={inputClass(fieldErrors.lastName)}
                                    placeholder="Doe"
                                />
                                {fieldErrors.lastName && (
                                    <p className="text-xs text-red-400">{fieldErrors.lastName}</p>
                                )}
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                            <label htmlFor="email" className="block text-[13px] font-medium text-white/60">
                                {t('auth.email')}
                            </label>
                            <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                value={fields.email}
                                onChange={update('email')}
                                className={inputClass(fieldErrors.email)}
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
                                    autoComplete="new-password"
                                    value={fields.password}
                                    onChange={update('password')}
                                    className={cn(inputClass(fieldErrors.password), 'pr-11')}
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

                            {/* Strength bar */}
                            {fields.password && (
                                <div className="space-y-1">
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <div
                                                key={i}
                                                className={cn(
                                                    'h-1 flex-1 rounded-full transition-all duration-300',
                                                    i <= pwStrength ? STRENGTH_COLORS[pwStrength] : 'bg-white/[0.08]',
                                                )}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-[11px] text-white/30">{STRENGTH_LABELS[pwStrength]}</p>
                                </div>
                            )}

                            {fieldErrors.password && (
                                <p className="text-xs text-red-400">{fieldErrors.password}</p>
                            )}
                        </div>

                        {/* Confirm password */}
                        <div className="space-y-1.5">
                            <label htmlFor="confirmPassword" className="block text-[13px] font-medium text-white/60">
                                {t('auth.confirmPassword')}
                            </label>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    type={showConfirm ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    value={fields.confirmPassword}
                                    onChange={update('confirmPassword')}
                                    className={cn(inputClass(fieldErrors.confirmPassword), 'pr-11')}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer p-1 text-white/25 transition-colors duration-150 hover:text-white/60"
                                    tabIndex={-1}
                                    aria-label={showConfirm ? 'Hide password' : 'Show password'}
                                >
                                    {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                                </button>
                            </div>
                            {/* Match indicator */}
                            {fields.confirmPassword && fields.password && (
                                <p className={cn(
                                    'text-[11px] transition-colors',
                                    fields.password === fields.confirmPassword ? 'text-emerald-400' : 'text-red-400',
                                )}>
                                    {fields.password === fields.confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                                </p>
                            )}
                            {fieldErrors.confirmPassword && !fields.confirmPassword && (
                                <p className="text-xs text-red-400">{fieldErrors.confirmPassword}</p>
                            )}
                        </div>

                        {/* CTA */}
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
                            <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-15deg] bg-white/10 transition-transform duration-700 group-hover:translate-x-[250%]" />

                            {isPending ? (
                                <>
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                    {t('auth.signingUp')}
                                </>
                            ) : (
                                <>
                                    {t('auth.signUp')}
                                    <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="mt-6 text-center text-[13px] text-white/30">
                        {t('auth.haveAccount')}{' '}
                        <Link
                            to={ROUTES.LOGIN}
                            className="font-medium text-violet-400 transition-colors hover:text-violet-300"
                        >
                            {t('auth.signIn')}
                        </Link>
                    </p>
                </div>

                {/* Fine print */}
                <p className="mt-5 text-center text-[11px] text-white/15 animate-fade-up delay-200">
                    {t('app.description')}
                </p>
            </div>
        </div>
    );
};
