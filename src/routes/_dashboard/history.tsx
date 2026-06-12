import { createFileRoute } from '@tanstack/react-router';

// Components
import History from "@/pages/User/History";

export const Route = createFileRoute('/_dashboard/history')({
  head: () => ({
    meta: [
      {
        title: `History | Trade Lave`,
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <History />
}
