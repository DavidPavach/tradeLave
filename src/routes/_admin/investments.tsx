import { createFileRoute } from '@tanstack/react-router';

// Components
import Investments from "@/pages/Admin/Investments";

export const Route = createFileRoute('/_admin/investments')({
    head: () => ({
        meta: [
            {
                title: `Investments | Trade Lave`,
            },
        ],
    }),
    component: RouteComponent,
})

function RouteComponent() {
    return <Investments />
}
