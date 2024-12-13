import * as React from 'react';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { ThemeProvider } from '@/contexts/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { ThemeModeToggle } from '@/components/theme-mode-toggle';

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <React.Fragment>
            <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
                <ThemeModeToggle />
                <Outlet />
                <Toaster />
            </ThemeProvider>
        </React.Fragment>
    );
}
