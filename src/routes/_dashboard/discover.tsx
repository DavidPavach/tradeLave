import { createFileRoute } from '@tanstack/react-router';

// Components
import Discover from "@/pages/User/Discover";

export const Route = createFileRoute('/_dashboard/discover')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Discover />
}
