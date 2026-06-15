import { createFileRoute } from '@tanstack/react-router';

// Components
import StockTxs from "@/pages/Admin/Stock";

export const Route = createFileRoute('/_admin/stock')({
  head: () => ({
    meta: [
      {
        title: `Stock Transactions | Trade Lave`,
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <StockTxs />
}
