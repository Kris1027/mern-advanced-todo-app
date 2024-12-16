import { Outlet, createRootRoute, useLoaderData } from '@tanstack/react-router';
import axios from 'axios';
import * as React from 'react';
import Navbar from '@/components/nav-bar';
import { Toaster } from '@/components/ui/toaster';

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
            <div className='max-w-[1080px] mx-auto'>
                {user && <Navbar />}
                <Outlet />
                <Toaster />
            </div>
        </React.Fragment>
    );
}
