import { create } from 'zustand';
import { STORAGE_KEYS } from '@/lib/constants';

interface SidebarStore {
    isCollapsed: boolean;
    toggleSidebar: () => void;
    setSidebarCollapsed: (collapsed: boolean) => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
    isCollapsed: localStorage.getItem(STORAGE_KEYS.SIDEBAR_COLLAPSED) === 'true',

    toggleSidebar: () => {
        set((state) => {
            const newCollapsed = !state.isCollapsed;
            localStorage.setItem(STORAGE_KEYS.SIDEBAR_COLLAPSED, String(newCollapsed));
            return { isCollapsed: newCollapsed };
        });
    },

    setSidebarCollapsed: (collapsed: boolean) => {
        localStorage.setItem(STORAGE_KEYS.SIDEBAR_COLLAPSED, String(collapsed));
        set({ isCollapsed: collapsed });
    },
}));
