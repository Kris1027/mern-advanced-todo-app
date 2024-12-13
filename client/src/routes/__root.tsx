import * as React from 'react';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { Toaster } from '@/components/ui/toaster';

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <React.Fragment>
            <Outlet />
            <Toaster />
        </React.Fragment>
    );
}
