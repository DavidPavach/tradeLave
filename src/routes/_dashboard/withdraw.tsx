import { createFileRoute } from '@tanstack/react-router';

// Components
import Withdraw from '@/pages/User/Withdraw';

export const Route = createFileRoute('/_dashboard/withdraw')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Withdraw />
}
