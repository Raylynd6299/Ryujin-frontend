import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useSidebarStore } from '@/stores/sidebarStore';
import { useIsMobile } from '@/hooks/useMediaQuery';

interface AppLayoutProps {
    children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
    const { isCollapsed } = useSidebarStore();
    const isMobile = useIsMobile();

    return (
        <div className="min-h-screen bg-background">
            <Sidebar />

            {/* Main Content Area */}
            <div
                className={`flex min-h-screen flex-col transition-all duration-300 ${isMobile ? 'ml-0' : isCollapsed ? 'ml-16' : 'ml-60'
                    }`}
            >
                <Header />

                <main className="flex-1 p-6">
                    <div className="mx-auto max-w-7xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};
