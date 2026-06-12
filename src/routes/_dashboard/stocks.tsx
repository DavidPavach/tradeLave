import { createFileRoute } from '@tanstack/react-router';

// Components
import Stocks from "@/pages/User/Stocks";

export const Route = createFileRoute('/_dashboard/stocks')({
  head: () => ({
    meta: [
      {
        title: `Stocks | Trade Lave`,
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <Stocks />
}
