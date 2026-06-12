import { createFileRoute } from '@tanstack/react-router';

// Components
import MarketTrends from "@/pages/User/MarketTrends";

export const Route = createFileRoute('/_dashboard/market-trends')({
  head: () => ({
    meta: [
      {
        title: `Market Trends | Trade Lave`,
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <MarketTrends />
}
