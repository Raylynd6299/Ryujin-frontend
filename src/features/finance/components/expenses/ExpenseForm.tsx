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
import { CategorySelect } from '../shared/CategorySelect';
import { CurrencySelect } from '../shared/CurrencySelect';
import { useTranslation } from '@/hooks/useTranslation';
import type { Expense } from '@/types/finance.types';

const expenseSchema = z.object({
    name: z.string().min(1).max(150),
    description: z.string().max(500).optional(),
    amount: z.coerce.number().positive(),
    currency: z.string().length(3),
    priority: z.enum(['essential', 'important', 'optional', 'low']),
    recurrence: z.enum(['none', 'daily', 'weekly', 'biweekly', 'monthly', 'quarterly', 'annually']),
    expenseDate: z.string().min(1),
    categoryId: z.string().optional(),
});

export type ExpenseFormValues = z.infer<typeof expenseSchema>;

interface ExpenseFormProps {
    defaultValues?: Partial<Expense>;
    onSubmit: (values: ExpenseFormValues) => void;
    isPending: boolean;
    isEdit?: boolean;
}

const PRIORITIES = ['essential', 'important', 'optional', 'low'] as const;
const RECURRENCES = ['none', 'daily', 'weekly', 'biweekly', 'monthly', 'quarterly', 'annually'] as const;

export const ExpenseForm = ({ defaultValues, onSubmit, isPending, isEdit }: ExpenseFormProps) => {
    const { t } = useTranslation();

    const form = useForm<ExpenseFormValues>({
        resolver: zodResolver(expenseSchema),
        defaultValues: {
            name: defaultValues?.name ?? '',
            description: defaultValues?.description ?? '',
            amount: defaultValues?.amount ?? 0,
            currency: defaultValues?.currency ?? 'USD',
            priority: defaultValues?.priority ?? 'essential',
            recurrence: defaultValues?.recurrence ?? 'monthly',
            expenseDate: defaultValues?.expenseDate
                ? new Date(defaultValues.expenseDate).toISOString().split('T')[0]
                : new Date().toISOString().split('T')[0],
            categoryId: defaultValues?.categoryId ?? undefined,
        },
    });

    useEffect(() => {
        if (defaultValues) {
            form.reset({
                name: defaultValues.name ?? '',
                description: defaultValues.description ?? '',
                amount: defaultValues.amount ?? 0,
                currency: defaultValues.currency ?? 'USD',
                priority: defaultValues.priority ?? 'essential',
                recurrence: defaultValues.recurrence ?? 'monthly',
                expenseDate: defaultValues.expenseDate
                    ? new Date(defaultValues.expenseDate).toISOString().split('T')[0]
                    : new Date().toISOString().split('T')[0],
                categoryId: defaultValues.categoryId ?? undefined,
            });
        }
    }, [defaultValues, form]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

                <div className="flex gap-2">
                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>{t('finance.amount')}</FormLabel>
                                <FormControl>
                                    <Input type="number" step="0.01" {...field} />
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
                                    <CurrencySelect value={field.value} onValueChange={field.onChange} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('finance.priority')}</FormLabel>
                            <Select value={field.value} onValueChange={field.onChange}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {PRIORITIES.map((p) => (
                                        <SelectItem key={p} value={p}>
                                            {t(`finance.priorities.${p}`)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="recurrence"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('finance.recurrence')}</FormLabel>
                            <Select value={field.value} onValueChange={field.onChange}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {RECURRENCES.map((r) => (
                                        <SelectItem key={r} value={r}>
                                            {t(`finance.recurrences.${r}`)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="expenseDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('finance.expenseDate')}</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('finance.category')}</FormLabel>
                            <FormControl>
                                <CategorySelect
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    filterType="expense"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full" disabled={isPending}>
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
