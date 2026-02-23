import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/hooks/useTranslation';
import type { UseFormReturn } from 'react-hook-form';
import type { HoldingFormValues } from './HoldingFormFields';

interface HoldingNumericFieldsProps {
    form: UseFormReturn<HoldingFormValues>;
}

export const HoldingNumericFields = ({ form }: HoldingNumericFieldsProps) => {
    const { t } = useTranslation();

    return (
        <>
            <div className="grid grid-cols-2 gap-3">
                <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('investment.quantity')}</FormLabel>
                            <FormControl>
                                <Input type="number" step="0.0001" min="0" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="buyPrice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('investment.buyPrice')}</FormLabel>
                            <FormControl>
                                <Input type="number" step="0.01" min="0" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{t('investment.currency')}</FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                maxLength={3}
                                onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                                placeholder="USD"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    );
};
