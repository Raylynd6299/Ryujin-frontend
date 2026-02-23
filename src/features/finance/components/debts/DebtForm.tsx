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
import type { Debt } from '@/types/finance.types';

const debtSchema = z.object({
    name: z.string().min(1).max(150),
    description: z.string().max(500).optional(),
    debtType: z.enum([
        'credit_card',
        'personal_loan',
        'mortgage',
        'car_loan',
        'student_loan',
        'other',
    ]),
    totalAmount: z.coerce.number().positive(),
    remainingAmount: z.coerce.number().min(0),
    monthlyPayment: z.coerce.number().positive(),
    currency: z.string().length(3),
    interestRate: z.coerce.number().min(0).optional(),
    startDate: z.string().optional(),
    dueDate: z.string().optional(),
});

export type DebtFormValues = z.infer<typeof debtSchema>;

// Update form has fewer fields
const updateDebtSchema = z.object({
    name: z.string().min(1).max(150),
    description: z.string().max(500).optional(),
    monthlyPayment: z.coerce.number().positive(),
    currency: z.string().length(3),
    interestRate: z.coerce.number().min(0).optional(),
    dueDate: z.string().optional(),
});

export type UpdateDebtFormValues = z.infer<typeof updateDebtSchema>;

const DEBT_TYPES = [
    'credit_card',
    'personal_loan',
    'mortgage',
    'car_loan',
    'student_loan',
    'other',
] as const;

interface DebtFormProps {
    defaultValues?: Partial<Debt>;
    onSubmit: (values: DebtFormValues | UpdateDebtFormValues) => void;
    isPending: boolean;
    isEdit?: boolean;
}

export const DebtForm = ({ defaultValues, onSubmit, isPending, isEdit }: DebtFormProps) => {
    const { t } = useTranslation();

    const schema = isEdit ? updateDebtSchema : debtSchema;

    const form = useForm<DebtFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: defaultValues?.name ?? '',
            description: defaultValues?.description ?? '',
            debtType: defaultValues?.debtType ?? 'personal_loan',
            totalAmount: defaultValues?.totalAmount ?? 0,
            remainingAmount: defaultValues?.remainingAmount ?? 0,
            monthlyPayment: defaultValues?.monthlyPayment ?? 0,
            currency: defaultValues?.currency ?? 'USD',
            interestRate: defaultValues?.interestRate ?? 0,
            startDate: defaultValues?.startDate
                ? new Date(defaultValues.startDate).toISOString().split('T')[0]
                : '',
            dueDate: defaultValues?.dueDate
                ? new Date(defaultValues.dueDate).toISOString().split('T')[0]
                : '',
        },
    });

    useEffect(() => {
        if (defaultValues) {
            form.reset({
                name: defaultValues.name ?? '',
                description: defaultValues.description ?? '',
                debtType: defaultValues.debtType ?? 'personal_loan',
                totalAmount: defaultValues.totalAmount ?? 0,
                remainingAmount: defaultValues.remainingAmount ?? 0,
                monthlyPayment: defaultValues.monthlyPayment ?? 0,
                currency: defaultValues.currency ?? 'USD',
                interestRate: defaultValues.interestRate ?? 0,
                startDate: defaultValues.startDate
                    ? new Date(defaultValues.startDate).toISOString().split('T')[0]
                    : '',
                dueDate: defaultValues.dueDate
                    ? new Date(defaultValues.dueDate).toISOString().split('T')[0]
                    : '',
            });
        }
    }, [defaultValues, form]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit as (v: DebtFormValues) => void)} className="space-y-4">
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

                {!isEdit && (
                    <FormField
                        control={form.control}
                        name="debtType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('finance.debtType')}</FormLabel>
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {DEBT_TYPES.map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {t(`finance.debtTypes.${type}`)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                {!isEdit && (
                    <div className="grid grid-cols-2 gap-2">
                        <FormField
                            control={form.control}
                            name="totalAmount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('finance.totalAmount')}</FormLabel>
                                    <FormControl>
                                        <Input type="number" step="0.01" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="remainingAmount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('finance.remainingAmount')}</FormLabel>
                                    <FormControl>
                                        <Input type="number" step="0.01" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                )}

                <div className="flex gap-2">
                    <FormField
                        control={form.control}
                        name="monthlyPayment"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>{t('finance.monthlyPayment')}</FormLabel>
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
                    name="interestRate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('finance.interestRate')}</FormLabel>
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

                {!isEdit && (
                    <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('finance.startDate')}</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} value={field.value ?? ''} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('finance.endDate')}</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} value={field.value ?? ''} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

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
