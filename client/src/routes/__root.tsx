import { Outlet, createRootRoute, useLoaderData } from '@tanstack/react-router';
import * as React from 'react';
import Navbar from '@/components/layout/nav-bar';
import { Toaster } from 'react-hot-toast';
import Footer from '@/components/layout/footer';
import { authUserLoader } from '@/loaders/auth-user-loader';

export const Route = createRootRoute({
    component: RootComponent,
    loader: authUserLoader,
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
