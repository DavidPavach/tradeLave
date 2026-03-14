import { createFileRoute } from '@tanstack/react-router';

// Components
import Staff from "@/pages/Admin/Staff";

export const Route = createFileRoute('/_admin/staff')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Staff />
}
