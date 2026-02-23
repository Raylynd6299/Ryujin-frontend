import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useCategories } from '../../hooks/useCategories';
import { useTranslation } from '@/hooks/useTranslation';
import type { CategoryType } from '@/types/finance.types';

interface CategorySelectProps {
    value?: string;
    onValueChange: (value: string) => void;
    filterType?: CategoryType;
    placeholder?: string;
}

export const CategorySelect = ({
    value,
    onValueChange,
    filterType,
    placeholder,
}: CategorySelectProps) => {
    const { t } = useTranslation();
    const { data = [] } = useCategories();

    const categories = filterType
        ? data.filter((c) => c.type === filterType || c.type === 'both')
        : data;

    return (
        <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger>
                <SelectValue placeholder={placeholder ?? t('finance.selectCategory')} />
            </SelectTrigger>
            <SelectContent>
                {categories?.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                        {cat.icon ? `${cat.icon} ` : ''}
                        {cat.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
