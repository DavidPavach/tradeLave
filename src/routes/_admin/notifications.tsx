import { createFileRoute } from '@tanstack/react-router';

// Components
import Notification from "@/pages/Admin/Notifications";

export const Route = createFileRoute('/_admin/notifications')({
  head: () => ({
    meta: [
      {
        title: `Notifications | Trade Lave`,
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <Notification />
}
