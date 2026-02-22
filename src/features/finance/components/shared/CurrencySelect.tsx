import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const CURRENCIES = ['USD', 'EUR', 'MXN', 'ARS', 'BRL', 'CLP', 'COP', 'GBP'];

interface CurrencySelectProps {
    value?: string;
    onValueChange: (value: string) => void;
}

export const CurrencySelect = ({ value, onValueChange }: CurrencySelectProps) => {
    return (
        <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="USD" />
            </SelectTrigger>
            <SelectContent>
                {CURRENCIES.map((currency) => (
                    <SelectItem key={currency} value={currency}>
                        {currency}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
