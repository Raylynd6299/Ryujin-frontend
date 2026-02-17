import queryClient from '@/services/client';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { AppRouter } from '@/routes';

export const App = (): React.ReactElement => {
    return (
        <QueryClientProvider client={queryClient}>
            <AppRouter />
        </QueryClientProvider>
    );
};
