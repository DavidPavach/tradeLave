import { createFileRoute } from '@tanstack/react-router';

// Components
import WatchList from "@/pages/User/WatchList";

export const Route = createFileRoute('/_dashboard/watchlist')({
  head: () => ({
    meta: [
      {
        title: `Watchlist | Trade Lave`,
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <WatchList />
}
