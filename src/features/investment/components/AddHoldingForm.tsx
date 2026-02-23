import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { HoldingFormFields } from './HoldingFormFields';
import type { HoldingFormValues } from './HoldingFormFields';
import { useCreateHolding, useUpdateHolding } from '../hooks/useHoldings';
import type { Holding } from '@/types/investment.types';

const holdingSchema = z.object({
    symbol: z.string().min(1).max(20),
    name: z.string().min(1).max(150),
    assetType: z.enum(['stock', 'etf', 'fixed_income', 'crypto', 'reit']),
    quantity: z.coerce.number().positive(),
    buyPrice: z.coerce.number().positive(),
    currency: z.string().length(3),
    notes: z.string().max(500).optional(),
});

interface AddHoldingFormProps {
    onSuccess: () => void;
    onCancel: () => void;
    initialValues?: Holding;
}

export const AddHoldingForm = ({ onSuccess, onCancel, initialValues }: AddHoldingFormProps) => {
    const isEdit = Boolean(initialValues);
    const createMutation = useCreateHolding();
    const updateMutation = useUpdateHolding();
    const isPending = createMutation.isPending || updateMutation.isPending;

    const form = useForm<HoldingFormValues>({
        resolver: zodResolver(holdingSchema),
        defaultValues: {
            symbol: initialValues?.symbol ?? '',
            name: initialValues?.name ?? '',
            assetType: initialValues?.assetType ?? 'stock',
            quantity: initialValues ? initialValues.quantityMicro / 1_000_000 : ('' as unknown as number),
            buyPrice: initialValues ? initialValues.buyPriceCents / 100 : ('' as unknown as number),
            currency: initialValues?.currency ?? 'USD',
            notes: initialValues?.notes ?? '',
        },
    });

    useEffect(() => {
        if (initialValues) {
            form.reset({
                symbol: initialValues.symbol,
                name: initialValues.name,
                assetType: initialValues.assetType,
                quantity: initialValues.quantityMicro / 1_000_000,
                buyPrice: initialValues.buyPriceCents / 100,
                currency: initialValues.currency,
                notes: initialValues.notes ?? '',
            });
        }
    }, [initialValues, form]);

    const handleSubmit = (values: HoldingFormValues) => {
        const quantityMicro = Math.round(values.quantity * 1_000_000);
        const buyPriceCents = Math.round(values.buyPrice * 100);
        const currency = values.currency.toUpperCase();

        if (isEdit && initialValues) {
            updateMutation.mutate(
                { id: initialValues.id, data: { name: values.name, quantityMicro, buyPriceCents, currency, notes: values.notes } },
                { onSuccess }
            );
        } else {
            createMutation.mutate(
                { symbol: values.symbol.toUpperCase(), name: values.name, assetType: values.assetType, quantityMicro, buyPriceCents, currency, notes: values.notes },
                { onSuccess }
            );
        }
    };

    return (
        <HoldingFormFields
            form={form}
            isEdit={isEdit}
            isPending={isPending}
            onCancel={onCancel}
            onSubmit={handleSubmit}
        />
    );
};
