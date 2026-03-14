import { createFileRoute } from '@tanstack/react-router';

// Components
import Notification from "@/pages/Admin/Notifications";

export const Route = createFileRoute('/_admin/notifications')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Notification />
}
