import { createFileRoute } from '@tanstack/react-router';

// Components
import StockRequests from "@/pages/Admin/Requests";

export const Route = createFileRoute('/_admin/requests')({
  head: () => ({
    meta: [
      {
        title: `Settings | Trade Lave`,
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <StockRequests />
}
