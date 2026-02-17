import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();

    const themes: Array<{ value: 'light' | 'dark' | 'system'; icon: typeof Sun; label: string }> = [
        { value: 'light', icon: Sun, label: 'Light' },
        { value: 'dark', icon: Moon, label: 'Dark' },
        { value: 'system', icon: Monitor, label: 'System' },
    ];

    return (
        <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
            {themes.map(({ value, icon: Icon, label }) => (
                <button
                    key={value}
                    onClick={() => setTheme(value)}
                    className={`flex items-center justify-center rounded-md p-2 transition-colors ${theme === value
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:bg-background hover:text-foreground'
                        }`}
                    title={label}
                    aria-label={`Switch to ${label} theme`}
                >
                    <Icon className="h-4 w-4" />
                </button>
            ))}
        </div>
    );
};
