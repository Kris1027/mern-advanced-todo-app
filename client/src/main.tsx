import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorComponent, Link, RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/contexts/theme-provider';
import LoadingSpinner from './components/ui/loading-spinner';

const queryClient = new QueryClient();

const router = createRouter({
    routeTree,
    defaultErrorComponent: ErrorComponent,
    defaultPendingComponent: () => <LoadingSpinner size='xl' />,
    defaultNotFoundComponent: () => {
        return (
            // create not found page later
            <div>
                <p>Page Not found!</p>
                <Link to='/'>Go home</Link>
            </div>
        );
    },
});

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
                    <RouterProvider router={router} />
                </ThemeProvider>
            </QueryClientProvider>
        </StrictMode>
    );
}
