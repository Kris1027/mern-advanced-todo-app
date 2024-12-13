import * as React from 'react';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/contexts/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { ThemeModeToggle } from '@/components/theme-mode-toggle';

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    const queryClient = new QueryClient();

    return (
        <React.Fragment>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
                    <ThemeModeToggle />
                    <Outlet />
                    <Toaster />
                </ThemeProvider>
            </QueryClientProvider>
        </React.Fragment>
    );
}
