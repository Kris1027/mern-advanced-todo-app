import Navbar from '@/components/nav-bar';
import { Toaster } from '@/components/ui/toaster';
import { Outlet, createRootRoute, useLoaderData } from '@tanstack/react-router';
import axios from 'axios';
import * as React from 'react';

export const Route = createRootRoute({
    component: RootComponent,
    loader: async () => {
        try {
            const res = await axios.get('/api/auth/user');
            return res.data;
        } catch {
            return null;
        }
    },
});

function RootComponent() {
    const user = useLoaderData({ from: '__root__' });

    return (
        <React.Fragment>
            {user && <Navbar />}
            <Outlet />
            <Toaster />
        </React.Fragment>
    );
}
