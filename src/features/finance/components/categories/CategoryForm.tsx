import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
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
import { ColorPicker } from '@/components/ui/color-picker';
import { useTranslation } from '@/hooks/useTranslation';
import type { Category } from '@/types/finance.types';

const categorySchema = z.object({
    name: z.string().min(1).max(100),
    type: z.enum(['income', 'expense', 'both']),
    icon: z.string().max(10).optional(),
    color: z
        .string()
        .regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color')
        .optional()
        .or(z.literal('')),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;

interface CategoryFormProps {
    defaultValues?: Partial<Category>;
    onSubmit: (values: CategoryFormValues) => void;
    isPending: boolean;
    isEdit?: boolean;
}

const CATEGORY_TYPES = ['income', 'expense', 'both'] as const;

export const CategoryForm = ({ defaultValues, onSubmit, isPending, isEdit }: CategoryFormProps) => {
    const { t } = useTranslation();

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: defaultValues?.name ?? '',
            type: defaultValues?.type ?? 'expense',
            icon: defaultValues?.icon ?? '',
            color: defaultValues?.color ?? '#6366f1',
        },
    });

    useEffect(() => {
        if (defaultValues) {
            form.reset({
                name: defaultValues.name ?? '',
                type: defaultValues.type ?? 'expense',
                icon: defaultValues.icon ?? '',
                color: defaultValues.color ?? '#6366f1',
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
                                <Input {...field} placeholder={t('finance.categoryNamePlaceholder')} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('finance.categoryType')}</FormLabel>
                            <Select value={field.value} onValueChange={field.onChange} disabled={isEdit}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {CATEGORY_TYPES.map((type) => (
                                        <SelectItem key={type} value={type}>
                                            {t(`finance.categoryTypes.${type}`)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="icon"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('finance.categoryIcon')}</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="💰" maxLength={2} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="color"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('finance.categoryColor')}</FormLabel>
                                <FormControl>
                                    <ColorPicker
                                        value={field.value ?? '#6366f1'}
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button type="submit" className="w-full ring-1 ring-white/20" disabled={isPending}>
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
