import { useThemeStore } from '@/stores/themeStore';

export const useTheme = () => {
    const { theme, resolvedTheme, setTheme, initializeTheme } = useThemeStore();

    return {
        theme,
        resolvedTheme,
        setTheme,
        initializeTheme,
        isDark: resolvedTheme === 'dark',
        isLight: resolvedTheme === 'light',
    };
};
