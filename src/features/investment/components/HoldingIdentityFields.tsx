import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useTranslation } from '@/hooks/useTranslation';
import type { UseFormReturn } from 'react-hook-form';
import type { HoldingFormValues } from './HoldingFormFields';
import { ASSET_TYPES } from './HoldingFormFields';

interface HoldingIdentityFieldsProps {
    form: UseFormReturn<HoldingFormValues>;
    isEdit: boolean;
}

export const HoldingIdentityFields = ({ form, isEdit }: HoldingIdentityFieldsProps) => {
    const { t } = useTranslation();

    return (
        <>
            <div className="grid grid-cols-2 gap-3">
                <FormField
                    control={form.control}
                    name="symbol"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('investment.symbol')}</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    disabled={isEdit}
                                    onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                                    placeholder="AAPL"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="assetType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('investment.assetType')}</FormLabel>
                            <Select value={field.value} onValueChange={field.onChange} disabled={isEdit}>
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {ASSET_TYPES.map((type) => (
                                        <SelectItem key={type} value={type}>
                                            {t(`investment.assetTypes.${type}`)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{t('investment.name')}</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="Apple Inc." />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    );
};
