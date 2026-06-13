import { createFileRoute } from '@tanstack/react-router';

// Components
import Request from "@/pages/User/Request";

export const Route = createFileRoute('/_dashboard/request')({
    head: () => ({
        meta: [
            {
                title: `Purchase Stocks | Trade Lave`,
            },
        ],
    }),
    component: RouteComponent,
})

function RouteComponent() {
    return <Request />
}
