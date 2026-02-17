import { User, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuthStore } from '@/stores/authStore';
import { ROUTES } from '@/lib/constants';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

export const UserMenu = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { user, clearAuth } = useAuthStore();

    const handleLogout = () => {
        clearAuth();
        navigate(ROUTES.LOGIN);
    };

    const handleSettings = () => {
        navigate(ROUTES.SETTINGS);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all hover:ring-2 hover:ring-primary hover:ring-offset-2"
                    aria-label="User menu"
                >
                    <User className="h-5 w-5" />
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-0" align="end">
                <div className="p-2">
                    <div className="px-2 py-1.5">
                        <p className="text-sm font-medium">
                            {user?.first_name || user?.last_name
                                ? `${user.first_name || ''} ${user.last_name || ''}`.trim()
                                : 'Usuario'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {user?.email || 'usuario@example.com'}
                        </p>
                    </div>
                </div>
                <Separator />
                <div className="p-1">
                    <button
                        onClick={() => navigate(ROUTES.DASHBOARD)}
                        className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted"
                    >
                        <User className="h-4 w-4" />
                        {t('navigation.profile')}
                    </button>
                    <button
                        onClick={handleSettings}
                        className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted"
                    >
                        <Settings className="h-4 w-4" />
                        {t('navigation.settings')}
                    </button>
                    <Separator className="my-1" />
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-destructive transition-colors hover:bg-muted"
                    >
                        <LogOut className="h-4 w-4" />
                        {t('auth.logout')}
                    </button>
                </div>
            </PopoverContent>
        </Popover>
    );
};
