import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ToastContainer } from 'react-fox-toast';

// Components
import Smartsupp from '@/components/Smartsupps';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 3,
            retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
            refetchOnWindowFocus: false,
            staleTime: 5 * 60000,
            refetchOnReconnect: true,
            refetchOnMount: true,
            gcTime: 10 * 60000
        }
    }
})


export const Route = createRootRoute({
    component: RootComponent,
})

function RootComponent() {
    return (
        <QueryClientProvider client={queryClient}>
            <ToastContainer position="top-center" isPausedOnHover={true} duration={5000} />
            <Outlet />
            <Smartsupp />
            <TanStackRouterDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
