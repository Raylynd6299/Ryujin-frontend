import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import type { UseFormReturn, SubmitHandler } from 'react-hook-form';
import { HoldingIdentityFields } from './HoldingIdentityFields';
import { HoldingNumericFields } from './HoldingNumericFields';

export const ASSET_TYPES = ['stock', 'etf', 'fixed_income', 'crypto', 'reit'] as const;

export interface HoldingFormValues {
    symbol: string;
    name: string;
    assetType: 'stock' | 'etf' | 'fixed_income' | 'crypto' | 'reit';
    quantity: number;
    buyPrice: number;
    currency: string;
    notes?: string;
}

interface HoldingFormFieldsProps {
    form: UseFormReturn<HoldingFormValues>;
    isEdit: boolean;
    isPending: boolean;
    onCancel: () => void;
    onSubmit: SubmitHandler<HoldingFormValues>;
}

export const HoldingFormFields = ({ form, isEdit, isPending, onCancel, onSubmit }: HoldingFormFieldsProps) => {
    const { t } = useTranslation();

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <HoldingIdentityFields form={form} isEdit={isEdit} />
                <HoldingNumericFields form={form} />

                <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('investment.notes')}</FormLabel>
                            <FormControl>
                                <textarea
                                    {...field}
                                    rows={3}
                                    className="border-input placeholder:text-muted-foreground dark:bg-input/30 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:opacity-50 resize-none"
                                    placeholder={t('investment.notes')}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex gap-2 pt-2">
                    <Button type="button" variant="outline" onClick={onCancel} className="flex-1" disabled={isPending}>
                        {t('common.cancel')}
                    </Button>
                    <Button type="submit" className="flex-1" disabled={isPending}>
                        {isPending ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{t('common.saving')}</>
                        ) : isEdit ? t('common.update') : t('common.create')}
                    </Button>
                </div>
            </form>
        </Form>
    );
};
