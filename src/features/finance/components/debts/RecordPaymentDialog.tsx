import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
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
import { useRecordPayment } from '../../hooks/useDebts';
import { useTranslation } from '@/hooks/useTranslation';
import type { Debt } from '@/types/finance.types';

const schema = z.object({ paymentAmount: z.coerce.number().positive() });
type FormValues = z.infer<typeof schema>;

interface Props {
    debt: Debt;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const RecordPaymentDialog = ({ debt, open, onOpenChange }: Props) => {
    const { t } = useTranslation();
    const mutation = useRecordPayment();

    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: { paymentAmount: debt.monthlyPayment },
    });

    const onSubmit = (values: FormValues) => {
        mutation.mutate(
            { id: debt.id, data: { paymentAmount: values.paymentAmount } },
            { onSuccess: () => onOpenChange(false) }
        );
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {t('finance.recordPayment')}: {debt.name}
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="paymentAmount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {t('finance.paymentAmount')} ({debt.currency})
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="number" step="0.01" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                            >
                                {t('common.cancel')}
                            </Button>
                            <Button type="submit" disabled={mutation.isPending}>
                                {mutation.isPending
                                    ? t('common.saving')
                                    : t('finance.recordPayment')}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
