import { createFileRoute } from '@tanstack/react-router';

// Components
import Dashboard from "@/pages/User/Dashboard"

export const Route = createFileRoute('/_dashboard/dashboard')({
  head: () => ({
    meta: [
      {
        title: `Dashboard | Trade Lave`,
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <Dashboard />;
}
