import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import {
    Dialog,
    DialogContent,
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { CurrencySelect } from '@/features/finance/components/shared/CurrencySelect';
import { useAddContribution } from '../hooks/useGoals';
import { useTranslation } from '@/hooks/useTranslation';
import type { Goal } from '@/types/goal.types';

const contributionSchema = z.object({
    amount: z.coerce.number().positive(),
    currency: z.string().length(3),
    date: z.string().min(1),
    notes: z.string().max(300).optional(),
});

type ContributionFormValues = z.infer<typeof contributionSchema>;

interface ContributionDialogProps {
    goal: Goal;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const ContributionDialog = ({ goal, open, onOpenChange }: ContributionDialogProps) => {
    const { t } = useTranslation();
    const addMutation = useAddContribution(goal.id);
    const [dateOpen, setDateOpen] = useState(false);

    const today = new Date().toISOString().split('T')[0];

    const form = useForm<ContributionFormValues>({
        resolver: zodResolver(contributionSchema),
        defaultValues: {
            amount: 0,
            currency: goal.currency,
            date: today,
            notes: '',
        },
    });

    const handleSubmit = (values: ContributionFormValues) => {
        addMutation.mutate(values, {
            onSuccess: () => {
                form.reset({ amount: 0, currency: goal.currency, date: today, notes: '' });
                onOpenChange(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>
                        {goal.icon && <span className="mr-2">{goal.icon}</span>}
                        {t('goals.addContribution')} — {goal.name}
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 mt-2">
                        {/* Amount + Currency */}
                        <div className="flex gap-2">
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>{t('goals.contributionAmount')}</FormLabel>
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

                        {/* Date */}
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('goals.contributionDate')}</FormLabel>
                                    <Popover open={dateOpen} onOpenChange={setDateOpen}>
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
                                                        setDateOpen(false);
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

                        {/* Notes */}
                        <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('goals.contributionNotes')}</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            value={field.value ?? ''}
                                            placeholder={t('goals.contributionNotesPlaceholder')}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full ring-1 ring-white/20"
                            disabled={addMutation.isPending}
                        >
                            {addMutation.isPending ? t('common.saving') : t('goals.saveContribution')}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
