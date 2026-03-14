import { createFileRoute } from '@tanstack/react-router';

// Components
import Referrals from "@/pages/User/Referral";

export const Route = createFileRoute('/_dashboard/referrals')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Referrals />
}
