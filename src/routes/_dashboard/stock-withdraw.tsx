import { createFileRoute } from '@tanstack/react-router';

// Components
import Withdraw from "@/pages/User/StockWithdraw";

export const Route = createFileRoute('/_dashboard/stock-withdraw')({
  head: () => ({
    meta: [
      {
        title: `Stock Withdrawal | Trade Lave`,
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <Withdraw />
}
