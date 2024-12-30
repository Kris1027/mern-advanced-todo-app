import { Outlet, createRootRoute, useLoaderData } from '@tanstack/react-router';
import axios from 'axios';
import * as React from 'react';
import Navbar from '@/components/nav-bar';
import { Toaster } from 'react-hot-toast';
import Footer from '@/components/footer';

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
            <div className='min-h-screen max-w-[1080px] mx-auto flex flex-col px-2 md:px-4'>
                {user && <Navbar />}
                <main className='flex-grow flex justify-center'>
                    <Outlet />
                </main>
                <Footer />
                <Toaster />
            </div>
        </React.Fragment>
    );
}
