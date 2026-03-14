import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Moon, Sun, Monitor } from 'lucide-react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
import { CurrencySelect } from '@/features/finance/components/shared/CurrencySelect';
import { useUpdateCurrencies } from '../hooks/useProfile';
import { useThemeStore } from '@/stores/themeStore';
import { cn } from '@/lib/utils';
import type { User } from '@/types/auth.types';

const currenciesSchema = z.object({
    defaultSavingsCurrency: z.string().length(3),
    defaultInvestmentCurrency: z.string().length(3),
});

type CurrenciesFormValues = z.infer<typeof currenciesSchema>;

type Theme = 'light' | 'dark' | 'system';

interface ThemeOptionProps {
    value: Theme;
    current: Theme;
    icon: React.ReactNode;
    label: string;
    onSelect: (t: Theme) => void;
}

const ThemeOption = ({ value, current, icon, label, onSelect }: ThemeOptionProps) => (
    <button
        type="button"
        onClick={() => onSelect(value)}
        className={cn(
            'flex flex-1 flex-col items-center gap-2 rounded-lg border-2 p-3 text-sm font-medium transition-colors',
            current === value
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-border hover:border-primary/50 hover:bg-accent'
        )}
    >
        {icon}
        {label}
    </button>
);

interface PreferencesTabProps {
    user: User;
}

export const PreferencesTab = ({ user }: PreferencesTabProps) => {
    const { t } = useTranslation();
    const updateCurrencies = useUpdateCurrencies();
    const { theme, setTheme } = useThemeStore();

    const form = useForm<CurrenciesFormValues>({
        resolver: zodResolver(currenciesSchema),
        defaultValues: {
            defaultSavingsCurrency: user.defaultSavingsCurrency,
            defaultInvestmentCurrency: user.defaultInvestmentCurrency,
        },
    });

    useEffect(() => {
        form.reset({
            defaultSavingsCurrency: user.defaultSavingsCurrency,
            defaultInvestmentCurrency: user.defaultInvestmentCurrency,
        });
    }, [user, form]);

    const onSubmit = (values: CurrenciesFormValues) => {
        updateCurrencies.mutate(values);
    };

    return (
        <div className="space-y-6">
            {/* Currencies Card */}
            <Card>
                <CardHeader>
                    <CardTitle>{t('settings.preferences.currencies')}</CardTitle>
                    <CardDescription>{t('settings.preferences.currenciesDescription')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="defaultSavingsCurrency"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {t('settings.preferences.savingsCurrency')}
                                            </FormLabel>
                                            <FormControl>
                                                <CurrencySelect
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="defaultInvestmentCurrency"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {t('settings.preferences.investmentCurrency')}
                                            </FormLabel>
                                            <FormControl>
                                                <CurrencySelect
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={updateCurrencies.isPending || !form.formState.isDirty}
                                className="ring-1 ring-white/20"
                            >
                                {updateCurrencies.isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        {t('common.saving')}
                                    </>
                                ) : (
                                    t('settings.profile.saveChanges')
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            {/* Appearance Card */}
            <Card>
                <CardHeader>
                    <CardTitle>{t('settings.preferences.appearance')}</CardTitle>
                    <CardDescription>{t('settings.preferences.appearanceDescription')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <p className="text-sm font-medium">{t('settings.preferences.theme')}</p>
                        <div className="flex gap-3">
                            <ThemeOption
                                value="light"
                                current={theme}
                                icon={<Sun className="h-5 w-5" />}
                                label={t('settings.preferences.themes.light')}
                                onSelect={setTheme}
                            />
                            <ThemeOption
                                value="dark"
                                current={theme}
                                icon={<Moon className="h-5 w-5" />}
                                label={t('settings.preferences.themes.dark')}
                                onSelect={setTheme}
                            />
                            <ThemeOption
                                value="system"
                                current={theme}
                                icon={<Monitor className="h-5 w-5" />}
                                label={t('settings.preferences.themes.system')}
                                onSelect={setTheme}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
