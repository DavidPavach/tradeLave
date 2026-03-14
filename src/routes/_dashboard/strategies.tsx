import { createFileRoute } from '@tanstack/react-router';

// Import Components
import Strategies from"@/pages/User/Strategies"

export const Route = createFileRoute('/_dashboard/strategies')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Strategies />
}
