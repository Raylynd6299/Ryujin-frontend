import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Eye, EyeOff, Check, X } from 'lucide-react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
import { useChangePassword } from '../hooks/useProfile';
import { cn } from '@/lib/utils';

const passwordSchema = z
    .object({
        currentPassword: z.string().min(1),
        newPassword: z.string().min(8),
        confirmPassword: z.string().min(1),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: 'validation.passwordMismatch',
        path: ['confirmPassword'],
    });

type PasswordFormValues = z.infer<typeof passwordSchema>;

// Password strength calculation
interface StrengthResult {
    score: 0 | 1 | 2 | 3;
    requirements: {
        minLength: boolean;
        uppercase: boolean;
        lowercase: boolean;
        number: boolean;
        special: boolean;
    };
}

const calculateStrength = (password: string): StrengthResult => {
    const requirements = {
        minLength: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password),
    };

    const passed = Object.values(requirements).filter(Boolean).length;

    let score: 0 | 1 | 2 | 3 = 0;
    if (passed <= 2) score = 0;
    else if (passed === 3) score = 1;
    else if (passed === 4) score = 2;
    else score = 3;

    return { score, requirements };
};

const STRENGTH_CONFIG = [
    { label: 'settings.security.strengthLevels.weak', color: 'bg-destructive' },
    { label: 'settings.security.strengthLevels.fair', color: 'bg-amber-500' },
    { label: 'settings.security.strengthLevels.good', color: 'bg-blue-500' },
    { label: 'settings.security.strengthLevels.strong', color: 'bg-emerald-500' },
] as const;

const PasswordStrength = ({ password }: { password: string }) => {
    const { t } = useTranslation();
    if (!password) return null;

    const { score, requirements } = calculateStrength(password);
    const config = STRENGTH_CONFIG[score];

    const requirementItems = [
        { key: 'minLength', label: t('settings.security.requirements.minLength') },
        { key: 'uppercase', label: t('settings.security.requirements.uppercase') },
        { key: 'lowercase', label: t('settings.security.requirements.lowercase') },
        { key: 'number', label: t('settings.security.requirements.number') },
        { key: 'special', label: t('settings.security.requirements.special') },
    ] as const;

    return (
        <div className="space-y-3 rounded-lg border bg-muted/30 p-3">
            {/* Strength bar */}
            <div className="space-y-1">
                <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                        {t('settings.security.strength')}
                    </span>
                    <span className={cn('text-xs font-medium', {
                        'text-destructive': score === 0,
                        'text-amber-500': score === 1,
                        'text-blue-500': score === 2,
                        'text-emerald-500': score === 3,
                    })}>
                        {t(config.label)}
                    </span>
                </div>
                <div className="flex gap-1">
                    {[0, 1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className={cn(
                                'h-1.5 flex-1 rounded-full transition-all duration-300',
                                i <= score ? config.color : 'bg-border'
                            )}
                        />
                    ))}
                </div>
            </div>

            {/* Requirements checklist */}
            <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                {requirementItems.map(({ key, label }) => (
                    <div key={key} className="flex items-center gap-1.5 text-xs">
                        {requirements[key] ? (
                            <Check className="h-3.5 w-3.5 text-emerald-500" />
                        ) : (
                            <X className="h-3.5 w-3.5 text-muted-foreground" />
                        )}
                        <span className={requirements[key] ? 'text-foreground' : 'text-muted-foreground'}>
                            {label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Password field with show/hide toggle
const PasswordInput = ({
    field,
    placeholder,
}: {
    field: React.InputHTMLAttributes<HTMLInputElement> & { ref?: React.Ref<HTMLInputElement> };
    placeholder?: string;
}) => {
    const [show, setShow] = useState(false);

    return (
        <div className="relative">
            <Input
                {...field}
                type={show ? 'text' : 'password'}
                placeholder={placeholder}
                className="pr-10"
            />
            <button
                type="button"
                onClick={() => setShow((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                tabIndex={-1}
            >
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
        </div>
    );
};

export const SecurityTab = () => {
    const { t } = useTranslation();
    const changePassword = useChangePassword();

    const form = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
    });

    const newPasswordValue = form.watch('newPassword');

    const onSubmit = (values: PasswordFormValues) => {
        changePassword.mutate(
            { currentPassword: values.currentPassword, newPassword: values.newPassword },
            {
                onSuccess: () => {
                    form.reset();
                },
            }
        );
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('settings.security.title')}</CardTitle>
                <CardDescription>{t('settings.security.description')}</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md">
                        {/* Current password */}
                        <FormField
                            control={form.control}
                            name="currentPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('settings.security.currentPassword')}</FormLabel>
                                    <FormControl>
                                        <PasswordInput field={field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* New password */}
                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('settings.security.newPassword')}</FormLabel>
                                    <FormControl>
                                        <PasswordInput field={field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Strength indicator */}
                        <PasswordStrength password={newPasswordValue} />

                        {/* Confirm password */}
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('settings.security.confirmPassword')}</FormLabel>
                                    <FormControl>
                                        <PasswordInput field={field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            disabled={changePassword.isPending}
                            className="ring-1 ring-white/20"
                        >
                            {changePassword.isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {t('common.saving')}
                                </>
                            ) : (
                                t('settings.security.changePassword')
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
