import { NavLink } from 'react-router-dom';
import {
    Home,
    DollarSign,
    Wallet,
    CreditCard,
    TrendingUp,
    BarChart3,
    PieChart,
    LineChart,
    Search,
    Calculator,
    Target,
    Settings,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
} from 'lucide-react';
import { useState } from 'react';
import { useSidebarStore } from '@/stores/sidebarStore';
import { useTranslation } from '@/hooks/useTranslation';
import { ROUTES } from '@/lib/constants';
import { useIsMobile } from '@/hooks/useMediaQuery';

interface NavItem {
    label: string;
    icon: typeof Home;
    path?: string;
    children?: NavItem[];
}

export const Sidebar = () => {
    const { isCollapsed, toggleSidebar, setSidebarCollapsed } = useSidebarStore();
    const { t } = useTranslation();
    const isMobile = useIsMobile();
    const [expandedSections, setExpandedSections] = useState<string[]>(['finance', 'investment']);

    const toggleSection = (label: string) => {
        setExpandedSections((prev) =>
            prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
        );
    };

    // Close sidebar on mobile when clicking a link
    const handleLinkClick = () => {
        if (isMobile) {
            setSidebarCollapsed(true);
        }
    };

    const navItems: NavItem[] = [
        {
            label: t('navigation.dashboard'),
            icon: Home,
            path: ROUTES.DASHBOARD,
        },
        {
            label: t('navigation.finance'),
            icon: DollarSign,
            children: [
                { label: t('navigation.income'), icon: Wallet, path: ROUTES.FINANCE_INCOME },
                { label: t('navigation.expenses'), icon: CreditCard, path: ROUTES.FINANCE_EXPENSES },
                { label: t('navigation.accounts'), icon: PieChart, path: ROUTES.FINANCE_ACCOUNTS },
                { label: t('navigation.debts'), icon: TrendingUp, path: ROUTES.FINANCE_DEBTS },
                { label: t('navigation.analysis'), icon: BarChart3, path: ROUTES.FINANCE_ANALYSIS },
            ],
        },
        {
            label: t('navigation.investments'),
            icon: LineChart,
            children: [
                { label: t('navigation.portfolio'), icon: PieChart, path: ROUTES.INVESTMENT_PORTFOLIO },
                { label: t('navigation.performance'), icon: BarChart3, path: ROUTES.INVESTMENT_PERFORMANCE },
                { label: t('navigation.stockAnalysis'), icon: Search, path: ROUTES.INVESTMENT_ANALYSIS },
                { label: t('navigation.calculator'), icon: Calculator, path: ROUTES.INVESTMENT_CALCULATOR },
            ],
        },
        {
            label: t('navigation.goals'),
            icon: Target,
            path: ROUTES.GOALS,
        },
        {
            label: t('navigation.settings'),
            icon: Settings,
            path: ROUTES.SETTINGS,
        },
    ];

    return (
        <>
            {/* Mobile Overlay Backdrop */}
            {isMobile && !isCollapsed && (
                <div
                    className="fixed inset-0 z-40 bg-black/50"
                    onClick={() => setSidebarCollapsed(true)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 z-50 flex h-screen flex-col border-r bg-sidebar transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-60'
                    } ${isMobile && isCollapsed ? '-translate-x-full' : 'translate-x-0'}`}
            >
                {/* Sidebar Content */}
                <div className="flex-1 overflow-y-auto py-4">
                    <nav className="space-y-1 px-2">
                        {navItems.map((item) => (
                            <NavItem
                                key={item.label}
                                item={item}
                                isCollapsed={isCollapsed}
                                expandedSections={expandedSections}
                                toggleSection={toggleSection}
                                onLinkClick={handleLinkClick}
                            />
                        ))}
                    </nav>
                </div>

                {/* Toggle Button */}
                {!isMobile && (
                    <button
                        onClick={toggleSidebar}
                        className="flex h-12 items-center justify-center border-t text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
                        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    >
                        {isCollapsed ? (
                            <ChevronRight className="h-5 w-5" />
                        ) : (
                            <ChevronLeft className="h-5 w-5" />
                        )}
                    </button>
                )}
            </aside>
        </>
    );
};

interface NavItemProps {
    item: NavItem;
    isCollapsed: boolean;
    expandedSections: string[];
    toggleSection: (label: string) => void;
    onLinkClick: () => void;
    level?: number;
}

const NavItem = ({
    item,
    isCollapsed,
    expandedSections,
    toggleSection,
    onLinkClick,
    level = 0,
}: NavItemProps) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedSections.includes(item.label);
    const Icon = item.icon;

    if (hasChildren) {
        return (
            <div>
                <button
                    onClick={() => toggleSection(item.label)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent ${level > 0 ? 'pl-8' : ''
                        }`}
                >
                    <Icon className="h-5 w-5 shrink-0" />
                    {!isCollapsed && (
                        <>
                            <span className="flex-1 text-left">{item.label}</span>
                            <ChevronDown
                                className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                            />
                        </>
                    )}
                </button>

                {!isCollapsed && isExpanded && item.children && (
                    <div className="mt-1 space-y-1">
                        {item.children.map((child) => (
                            <NavItem
                                key={child.label}
                                item={child}
                                isCollapsed={isCollapsed}
                                expandedSections={expandedSections}
                                toggleSection={toggleSection}
                                onLinkClick={onLinkClick}
                                level={level + 1}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <NavLink
            to={item.path || '#'}
            onClick={onLinkClick}
            className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent'
                } ${level > 0 ? 'pl-11' : ''}`
            }
            title={isCollapsed ? item.label : undefined}
        >
            <Icon className="h-5 w-5 shrink-0" />
            {!isCollapsed && <span>{item.label}</span>}
        </NavLink>
    );
};
