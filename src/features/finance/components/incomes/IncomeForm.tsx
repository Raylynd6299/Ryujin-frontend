import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon, Loader2 } from 'lucide-react';
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { CategorySelect } from '../shared/CategorySelect';
import { CurrencySelect } from '../shared/CurrencySelect';
import { useTranslation } from '@/hooks/useTranslation';
import type { IncomeSource } from '@/types/finance.types';

const incomeSchema = z.object({
    name: z.string().min(1).max(150),
    description: z.string().max(500).optional(),
    amount: z.coerce.number().positive(),
    currency: z.string().length(3),
    incomeType: z.enum(['salary', 'freelance', 'rental', 'dividend', 'business', 'other']),
    recurrence: z.enum(['none', 'daily', 'weekly', 'biweekly', 'monthly', 'quarterly', 'annually']),
    startDate: z.string().min(1),
    categoryId: z.string().optional(),
});

export type IncomeFormValues = z.infer<typeof incomeSchema>;

interface IncomeFormProps {
    defaultValues?: Partial<IncomeSource>;
    onSubmit: (values: IncomeFormValues) => void;
    isPending: boolean;
    isEdit?: boolean;
}

const INCOME_TYPES = ['salary', 'freelance', 'rental', 'dividend', 'business', 'other'] as const;
const RECURRENCES = ['none', 'daily', 'weekly', 'biweekly', 'monthly', 'quarterly', 'annually'] as const;

export const IncomeForm = ({ defaultValues, onSubmit, isPending, isEdit }: IncomeFormProps) => {
    const { t } = useTranslation();
    const [calendarOpen, setCalendarOpen] = useState(false);

    const form = useForm<IncomeFormValues>({
        resolver: zodResolver(incomeSchema),
        defaultValues: {
            name: defaultValues?.name ?? '',
            description: defaultValues?.description ?? '',
            amount: defaultValues?.amount ?? 0,
            currency: defaultValues?.currency ?? 'USD',
            incomeType: defaultValues?.incomeType ?? 'salary',
            recurrence: defaultValues?.recurrence ?? 'monthly',
            startDate: defaultValues?.startDate
                ? new Date(defaultValues.startDate).toISOString().split('T')[0]
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
                incomeType: defaultValues.incomeType ?? 'salary',
                recurrence: defaultValues.recurrence ?? 'monthly',
                startDate: defaultValues.startDate
                    ? new Date(defaultValues.startDate).toISOString().split('T')[0]
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
                    name="incomeType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('finance.incomeType')}</FormLabel>
                            <Select value={field.value} onValueChange={field.onChange}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {INCOME_TYPES.map((type) => (
                                        <SelectItem key={type} value={type}>
                                            {t(`finance.incomeTypes.${type}`)}
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

                {!isEdit && (
                    <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('finance.startDate')}</FormLabel>
                                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    'w-full justify-start text-left font-normal',
                                                    !field.value && 'text-muted-foreground'
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {field.value
                                                    ? format(parseISO(field.value), 'PPP', { locale: es })
                                                    : t('finance.pickDate')}
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            locale={es}
                                            selected={field.value ? parseISO(field.value) : undefined}
                                            onSelect={(date) => {
                                                if (date) {
                                                    field.onChange(format(date, 'yyyy-MM-dd'));
                                                    setCalendarOpen(false);
                                                }
                                            }}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

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
                                    filterType="income"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {t('common.saving')}
                        </>
                    ) : isEdit ? (
                        t('common.update')
                    ) : (
                        t('common.create')
                    )}
                </Button>
            </form>
        </Form>
    );
};
