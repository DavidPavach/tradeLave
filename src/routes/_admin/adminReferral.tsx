import { createFileRoute } from '@tanstack/react-router';

// Components
import Referral from "@/pages/Admin/Referral";

export const Route = createFileRoute('/_admin/adminReferral')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Referral />
}
