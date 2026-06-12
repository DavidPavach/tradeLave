import { createFileRoute } from '@tanstack/react-router';

// Components
import Discover from "@/pages/User/Discover";

export const Route = createFileRoute('/_dashboard/discover')({
  head: () => ({
    meta: [
      {
        title: `Discover | Trade Lave`,
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <Discover />
}
