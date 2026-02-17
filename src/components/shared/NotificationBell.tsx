import { Bell } from 'lucide-react';
import { useState } from 'react';

export const NotificationBell = () => {
    const [count] = useState(3); // Placeholder count

    return (
        <button
            className="relative rounded-lg p-2 text-foreground transition-colors hover:bg-muted"
            aria-label="Notifications"
        >
            <Bell className="h-5 w-5" />
            {count > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                    {count > 9 ? '9+' : count}
                </span>
            )}
        </button>
    );
};
