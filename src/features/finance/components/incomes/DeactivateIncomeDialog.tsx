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
import { useDeactivateIncome } from '../../hooks/useIncomes';
import { useTranslation } from '@/hooks/useTranslation';
import type { IncomeSource } from '@/types/finance.types';

const schema = z.object({ endDate: z.string().min(1) });
type FormValues = z.infer<typeof schema>;

interface Props {
    income: IncomeSource;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const DeactivateIncomeDialog = ({ income, open, onOpenChange }: Props) => {
    const { t } = useTranslation();
    const mutation = useDeactivateIncome();

    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: { endDate: new Date().toISOString().split('T')[0] },
    });

    const onSubmit = (values: FormValues) => {
        mutation.mutate(
            { id: income.id, data: { endDate: values.endDate } },
            { onSuccess: () => onOpenChange(false) }
        );
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {t('finance.deactivateIncome')}: {income.name}
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="endDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('finance.endDate')}</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
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
                                {mutation.isPending ? t('common.saving') : t('finance.deactivate')}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
