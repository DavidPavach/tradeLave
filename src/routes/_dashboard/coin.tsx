import { createFileRoute } from '@tanstack/react-router';

// Components
import Coin from "@/pages/User/Coin";

export const Route = createFileRoute('/_dashboard/coin')({
    validateSearch: (search: Record<string, unknown>) => ({
    coin: search.coin as string,
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <Coin />
}
