import { createFileRoute } from '@tanstack/react-router';

// Components
import Legal from "@/pages/Home/Legal";

export const Route = createFileRoute('/_home/legal')({
  head: () => ({
    meta: [
      {
        title: `Legal | Trade Lave`,
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <Legal />
}
