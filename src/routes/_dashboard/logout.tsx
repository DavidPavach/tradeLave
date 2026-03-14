import { createFileRoute } from '@tanstack/react-router';

// Components
import Logout from "@/pages/User/Logout";

export const Route = createFileRoute('/_dashboard/logout')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Logout />
}
