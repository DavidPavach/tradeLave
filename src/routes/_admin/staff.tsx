import { createFileRoute } from '@tanstack/react-router';

// Components
import Staff from "@/pages/Admin/Staff";

export const Route = createFileRoute('/_admin/staff')({
  head: () => ({
    meta: [
      {
        title: `Staff | Trade Lave`,
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <Staff />
}
