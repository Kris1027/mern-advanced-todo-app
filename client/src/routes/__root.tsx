import Navbar from '@/components/nav-bar';
import { Toaster } from '@/components/ui/toaster';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import * as React from 'react';

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <React.Fragment>
            <Navbar />
            <Outlet />
            <Toaster />
        </React.Fragment>
    );
}
