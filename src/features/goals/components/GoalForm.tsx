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
import { CurrencySelect } from '@/features/finance/components/shared/CurrencySelect';
import { useTranslation } from '@/hooks/useTranslation';
import type { Goal } from '@/types/goal.types';

const goalSchema = z.object({
    name: z.string().min(1).max(150),
    description: z.string().max(500).optional(),
    icon: z.string().max(10).optional(),
    targetAmount: z.coerce.number().positive(),
    currency: z.string().length(3),
    priority: z.enum(['low', 'medium', 'high']),
    deadline: z.string().optional(),
});

export type GoalFormValues = z.infer<typeof goalSchema>;

const PRIORITIES = ['low', 'medium', 'high'] as const;

interface GoalFormProps {
    defaultValues?: Partial<Goal>;
    onSubmit: (values: GoalFormValues) => void;
    isPending: boolean;
    isEdit?: boolean;
}

export const GoalForm = ({ defaultValues, onSubmit, isPending, isEdit }: GoalFormProps) => {
    const { t } = useTranslation();

    const form = useForm<GoalFormValues>({
        resolver: zodResolver(goalSchema),
        defaultValues: {
            name: defaultValues?.name ?? '',
            description: defaultValues?.description ?? '',
            icon: defaultValues?.icon ?? '',
            targetAmount: defaultValues?.targetAmount ?? 0,
            currency: defaultValues?.currency ?? 'USD',
            priority: defaultValues?.priority ?? 'medium',
            deadline: defaultValues?.deadline
                ? new Date(defaultValues.deadline).toISOString().split('T')[0]
                : '',
        },
    });

    useEffect(() => {
        if (defaultValues) {
            form.reset({
                name: defaultValues.name ?? '',
                description: defaultValues.description ?? '',
                icon: defaultValues.icon ?? '',
                targetAmount: defaultValues.targetAmount ?? 0,
                currency: defaultValues.currency ?? 'USD',
                priority: defaultValues.priority ?? 'medium',
                deadline: defaultValues.deadline
                    ? new Date(defaultValues.deadline).toISOString().split('T')[0]
                    : '',
            });
        }
    }, [defaultValues, form]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Name + Icon */}
                <div className="flex gap-2">
                    <FormField
                        control={form.control}
                        name="icon"
                        render={({ field }) => (
                            <FormItem className="w-[72px]">
                                <FormLabel>{t('goals.icon')}</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        value={field.value ?? ''}
                                        placeholder="🎯"
                                        className="text-center text-lg"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>{t('goals.name')}</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder={t('goals.namePlaceholder')} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Description */}
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('goals.description')}</FormLabel>
                            <FormControl>
                                <Input {...field} value={field.value ?? ''} placeholder={t('goals.descriptionPlaceholder')} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Target Amount + Currency */}
                <div className="flex gap-2">
                    <FormField
                        control={form.control}
                        name="targetAmount"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>{t('goals.targetAmount')}</FormLabel>
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
                                <FormLabel>{t('goals.currency')}</FormLabel>
                                <FormControl>
                                    <CurrencySelect value={field.value} onValueChange={field.onChange} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Priority */}
                <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('goals.priority')}</FormLabel>
                            <Select value={field.value} onValueChange={field.onChange}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {PRIORITIES.map((p) => (
                                        <SelectItem key={p} value={p}>
                                            {t(`goals.priorities.${p}`)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Deadline */}
                <FormField
                    control={form.control}
                    name="deadline"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('goals.deadline')}</FormLabel>
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
