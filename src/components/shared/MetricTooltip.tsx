import { HelpCircle } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface Props {
    /** The metric label rendered next to the icon */
    label: string;
    /** Tooltip explanation text */
    tooltip: string;
    /** Extra classes for the wrapper span */
    className?: string;
}

/**
 * Renders a metric label with a small help icon.
 * Clicking/tapping the icon opens a Popover with an educational explanation.
 *
 * Accessible: the trigger has an aria-label and role="button".
 */
export const MetricTooltip = ({ label, tooltip, className }: Props) => (
    <span className={cn('inline-flex items-center gap-1', className)}>
        {label}
        <Popover>
            <PopoverTrigger
                aria-label={`More info about ${label}`}
                className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm"
            >
                <HelpCircle className="h-3.5 w-3.5" />
            </PopoverTrigger>
            <PopoverContent className="w-72 text-sm leading-relaxed" side="top">
                {tooltip}
            </PopoverContent>
        </Popover>
    </span>
);
