import { create } from 'zustand';
import { STORAGE_KEYS } from '@/lib/constants';

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

interface ThemeStore {
    theme: Theme;
    resolvedTheme: ResolvedTheme;
    setTheme: (theme: Theme) => void;
    initializeTheme: () => void;
}

// Get system preference
const getSystemTheme = (): ResolvedTheme => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Resolve theme (system -> actual theme)
const resolveTheme = (theme: Theme): ResolvedTheme => {
    if (theme === 'system') {
        return getSystemTheme();
    }
    return theme;
};

// Apply theme to DOM
const applyTheme = (resolved: ResolvedTheme) => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(resolved);
};

export const useThemeStore = create<ThemeStore>((set, get) => ({
    theme: 'system',
    resolvedTheme: 'light',

    setTheme: (theme: Theme) => {
        const resolved = resolveTheme(theme);

        // Save to localStorage
        localStorage.setItem(STORAGE_KEYS.THEME, theme);

        // Apply to DOM
        applyTheme(resolved);

        // Update store
        set({ theme, resolvedTheme: resolved });
    },

    initializeTheme: () => {
        // Get saved theme or default to system
        const savedTheme = (localStorage.getItem(STORAGE_KEYS.THEME) as Theme) || 'system';
        const resolved = resolveTheme(savedTheme);

        // Apply theme
        applyTheme(resolved);

        // Set initial state
        set({ theme: savedTheme, resolvedTheme: resolved });

        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            const currentTheme = get().theme;
            if (currentTheme === 'system') {
                const newResolved = getSystemTheme();
                applyTheme(newResolved);
                set({ resolvedTheme: newResolved });
            }
        };

        mediaQuery.addEventListener('change', handleChange);

        // Cleanup function
        return () => mediaQuery.removeEventListener('change', handleChange);
    },
}));
