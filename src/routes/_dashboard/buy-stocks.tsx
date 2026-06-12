import { createFileRoute } from '@tanstack/react-router';

// Components
import BuyStocks from "@/pages/User/BuyStocks";

export const Route = createFileRoute('/_dashboard/buy-stocks')({
  head: () => ({
    meta: [
      {
        title: `Buy Stocks | Trade Lave`,
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <BuyStocks />
}
