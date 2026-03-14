import { createFileRoute } from '@tanstack/react-router';

// Components
import Dashboard from "@/pages/User/Dashboard"

export const Route = createFileRoute('/_dashboard/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Dashboard />;
}
