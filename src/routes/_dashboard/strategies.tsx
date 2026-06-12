import { createFileRoute } from '@tanstack/react-router';

// Components
import Strategies from "@/pages/User/Strategies"

export const Route = createFileRoute('/_dashboard/strategies')({
  head: () => ({
    meta: [
      {
        title: `Strategies | Trade Lave`,
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <Strategies />
}
