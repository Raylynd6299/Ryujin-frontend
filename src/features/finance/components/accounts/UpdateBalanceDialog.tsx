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
import { CurrencySelect } from '../shared/CurrencySelect';
import { useUpdateBalance } from '../../hooks/useAccounts';
import { useTranslation } from '@/hooks/useTranslation';
import type { Account } from '@/types/finance.types';

const schema = z.object({
    balance: z.coerce.number().min(0),
    currency: z.string().length(3),
});
type FormValues = z.infer<typeof schema>;

interface Props {
    account: Account;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const UpdateBalanceDialog = ({ account, open, onOpenChange }: Props) => {
    const { t } = useTranslation();
    const mutation = useUpdateBalance();

    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: { balance: account.balance, currency: account.currency },
    });

    const onSubmit = (values: FormValues) => {
        mutation.mutate(
            { id: account.id, data: values },
            { onSuccess: () => onOpenChange(false) }
        );
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {t('finance.updateBalance')}: {account.name}
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="flex gap-2">
                            <FormField
                                control={form.control}
                                name="balance"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>{t('finance.balance')}</FormLabel>
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
                                            <CurrencySelect
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                            >
                                {t('common.cancel')}
                            </Button>
                            <Button type="submit" disabled={mutation.isPending}>
                                {mutation.isPending ? t('common.saving') : t('common.update')}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
