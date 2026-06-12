import { createFileRoute } from '@tanstack/react-router';

// Components
import Portfolio from "@/pages/User/Portfolio";

export const Route = createFileRoute('/_dashboard/portfolio')({
  head: () => ({
    meta: [
      {
        title: `Portfolio | Trade Lave`,
      },
    ],
  }),
  validateSearch: (search: Record<string, string | undefined>) => ({
    stock: search.stock as string,
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <Portfolio />
}
