import { Menu } from 'lucide-react';
import { useSidebarStore } from '@/stores/sidebarStore';
import { Breadcrumbs } from './Breadcrumbs';
import { ThemeToggle } from '../shared/ThemeToggle';
import { LanguageToggle } from '../shared/LanguageToggle';
import { NotificationBell } from '../shared/NotificationBell';
import { UserMenu } from '../shared/UserMenu';
import { APP_NAME } from '@/lib/constants';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { RyujinLogo } from '@/components/shared/RyujinLogo';

export const Header = () => {
    const { toggleSidebar } = useSidebarStore();
    const isMobile = useIsMobile();

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
            {/* Toggle Sidebar Button */}
            <button
                onClick={toggleSidebar}
                className="rounded-lg p-2 text-foreground transition-colors hover:bg-muted"
                aria-label="Toggle sidebar"
            >
                <Menu className="h-5 w-5" />
            </button>

            {/* Logo */}
            <div className="flex items-center gap-2">
                <RyujinLogo size={28} />
                <span className="text-xl font-bold text-foreground">{APP_NAME}</span>
            </div>

            {/* Breadcrumbs - Hidden on mobile */}
            {!isMobile && (
                <div className="flex-1">
                    <Breadcrumbs />
                </div>
            )}

            {/* Spacer for mobile */}
            {isMobile && <div className="flex-1" />}

            {/* Actions */}
            <div className="flex items-center gap-2">
                {!isMobile && (
                    <>
                        <ThemeToggle />
                        <LanguageToggle />
                    </>
                )}
                <NotificationBell />
                <UserMenu />
            </div>
        </header>
    );
};
