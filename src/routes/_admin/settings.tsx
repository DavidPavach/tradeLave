import { createFileRoute } from '@tanstack/react-router';

// Components
import Settings from "@/pages/Admin/Settings";

export const Route = createFileRoute('/_admin/settings')({
  head: () => ({
    meta: [
      {
        title: `Settings | Trade Lave`,
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <Settings />
}
