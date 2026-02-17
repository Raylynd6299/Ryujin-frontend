import { ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';

export const Breadcrumbs = () => {
    const location = useLocation();
    const { t } = useTranslation();

    // Parse pathname into breadcrumb segments
    const pathnames = location.pathname.split('/').filter((x) => x);

    if (pathnames.length === 0) return null;

    return (
        <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
            {pathnames.map((segment, index) => {
                const isLast = index === pathnames.length - 1;
                const path = `/${pathnames.slice(0, index + 1).join('/')}`;

                // Translate segment key if it exists
                const label = t(`navigation.${segment}`) || segment;

                return (
                    <div key={path} className="flex items-center gap-2">
                        {index > 0 && (
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        )}
                        {isLast ? (
                            <span className="font-medium text-primary">
                                {label}
                            </span>
                        ) : (
                            <Link
                                to={path}
                                className="text-muted-foreground transition-colors hover:text-foreground"
                            >
                                {label}
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
};
