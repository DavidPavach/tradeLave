import { createFileRoute } from '@tanstack/react-router';

// Components
import Withdraw from '@/pages/User/Withdraw';

export const Route = createFileRoute('/_dashboard/withdraw')({
  head: () => ({
    meta: [
      {
        title: `Withdrawal | Trade Lave`,
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <Withdraw />
}
