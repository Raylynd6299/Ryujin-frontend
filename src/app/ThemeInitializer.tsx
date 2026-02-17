import { useEffect, type ReactNode } from 'react';
import { useThemeStore } from '@/stores/themeStore';

interface ThemeInitializerProps {
    children: ReactNode;
}

export const ThemeInitializer = ({ children }: ThemeInitializerProps) => {
    const initializeTheme = useThemeStore((state) => state.initializeTheme);

    useEffect(() => {
        initializeTheme();
    }, [initializeTheme]);

    return <>{children}</>;
};
