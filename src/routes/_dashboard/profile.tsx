import { createFileRoute } from '@tanstack/react-router';

// Components
import Profile from "@/pages/User/Profile";

export const Route = createFileRoute('/_dashboard/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Profile />
}
