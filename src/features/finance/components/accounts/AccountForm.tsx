import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { CurrencySelect } from '../shared/CurrencySelect';
import { useTranslation } from '@/hooks/useTranslation';
import type { Account } from '@/types/finance.types';

const createAccountSchema = z.object({
    name: z.string().min(1).max(150),
    description: z.string().max(500).optional(),
    accountType: z.enum(['checking', 'savings', 'cash', 'wallet']),
    balance: z.coerce.number().min(0).optional(),
    currency: z.string().length(3),
});

const updateAccountSchema = z.object({
    name: z.string().min(1).max(150),
    description: z.string().max(500).optional(),
    accountType: z.enum(['checking', 'savings', 'cash', 'wallet']),
});

export type CreateAccountFormValues = z.infer<typeof createAccountSchema>;
export type UpdateAccountFormValues = z.infer<typeof updateAccountSchema>;
export type AccountFormValues = CreateAccountFormValues | UpdateAccountFormValues;

const ACCOUNT_TYPES = ['checking', 'savings', 'cash', 'wallet'] as const;

interface AccountFormProps {
    defaultValues?: Partial<Account>;
    onSubmit: (values: AccountFormValues) => void;
    isPending: boolean;
    isEdit?: boolean;
}

export const AccountForm = ({ defaultValues, onSubmit, isPending, isEdit }: AccountFormProps) => {
    const { t } = useTranslation();
    const schema = isEdit ? updateAccountSchema : createAccountSchema;

    const form = useForm<CreateAccountFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: defaultValues?.name ?? '',
            description: defaultValues?.description ?? '',
            accountType: defaultValues?.accountType ?? 'checking',
            balance: defaultValues?.balance ?? 0,
            currency: defaultValues?.currency ?? 'USD',
        },
    });

    useEffect(() => {
        if (defaultValues) {
            form.reset({
                name: defaultValues.name ?? '',
                description: defaultValues.description ?? '',
                accountType: defaultValues.accountType ?? 'checking',
                balance: defaultValues.balance ?? 0,
                currency: defaultValues.currency ?? 'USD',
            });
        }
    }, [defaultValues, form]);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit as (v: CreateAccountFormValues) => void)}
                className="space-y-4"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('finance.name')}</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('finance.description')}</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="accountType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('finance.accountType')}</FormLabel>
                            <Select value={field.value} onValueChange={field.onChange}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {ACCOUNT_TYPES.map((type) => (
                                        <SelectItem key={type} value={type}>
                                            {t(`finance.accountTypes.${type}`)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {!isEdit && (
                    <div className="flex gap-2">
                        <FormField
                            control={form.control}
                            name="balance"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>{t('finance.balance')}</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            {...field}
                                            value={field.value ?? ''}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="currency"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('finance.currency')}</FormLabel>
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
                )}

                <Button type="submit" className="w-full ring-1 ring-white/20" disabled={isPending}>
                    {isPending
                        ? t('common.saving')
                        : isEdit
                          ? t('common.update')
                          : t('common.create')}
                </Button>
            </form>
        </Form>
    );
};
