import { createFileRoute } from '@tanstack/react-router';

// Components
import Index from "@/pages/User/Stock-Deposit";

export const Route = createFileRoute('/_dashboard/stock-deposit')({
  head: () => ({
    meta: [
      {
        title: `Stock-Deposit | Trade Lave`,
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <Index />
}
