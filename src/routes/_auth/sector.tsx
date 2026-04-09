import { createFileRoute } from '@tanstack/react-router';

// Components
import Sector from "@/pages/Auth/Sector";

export const Route = createFileRoute('/_auth/sector')({
    component: RouteComponent,
})

function RouteComponent() {
    return <Sector />
}
