import { ThemeModeToggle } from '@/components/theme-mode-toggle';
import { Toaster } from '@/components/ui/toaster';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import * as React from 'react';

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <React.Fragment>
            <ThemeModeToggle />
            <Outlet />
            <Toaster />
        </React.Fragment>
    );
}
