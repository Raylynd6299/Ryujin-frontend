import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string): boolean => {
    const [matches, setMatches] = useState(() => {
        return window.matchMedia(query).matches;
    });

    useEffect(() => {
        const media = window.matchMedia(query);

        // Create listener
        const listener = (e: MediaQueryListEvent) => {
            setMatches(e.matches);
        };

        // Add listener
        media.addEventListener('change', listener);

        // Cleanup
        return () => media.removeEventListener('change', listener);
    }, [query]);

    return matches;
};

// Common breakpoints
export const useIsMobile = () => useMediaQuery('(max-width: 768px)');
export const useIsTablet = () => useMediaQuery('(min-width: 768px) and (max-width: 1024px)');
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)');
