import { createFileRoute } from '@tanstack/react-router';

// Components
import Referrals from "@/pages/User/Referral";

export const Route = createFileRoute('/_dashboard/referrals')({
  head: () => ({
    meta: [
      {
        title: `Referrals | Trade Lave`,
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <Referrals />
}
