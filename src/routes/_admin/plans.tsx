import { createFileRoute } from '@tanstack/react-router';

// Components
import Plans from "@/pages/Admin/Plans";

export const Route = createFileRoute('/_admin/plans')({
  head: () => ({
    meta: [
      {
        title: `Plans | Trade Lave`,
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <Plans />
}
