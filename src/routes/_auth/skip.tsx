import { createFileRoute } from '@tanstack/react-router';

// Components
import Skip from '@/pages/Auth/Skip';

export const Route = createFileRoute('/_auth/skip')({
    component: RouteComponent,
})

function RouteComponent() {
    return <Skip />;
}
