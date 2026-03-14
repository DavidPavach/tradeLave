import { createFileRoute } from '@tanstack/react-router';

// Components
import Users from "@/pages/Admin/Users";

export const Route = createFileRoute('/_admin/users')({
    validateSearch: (search: Record<string, unknown>) => ({
        profile: search.profile as string | undefined,
    }),
    component: RouteComponent,
})

function RouteComponent() {
    return <Users />
}
