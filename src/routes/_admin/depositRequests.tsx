import { createFileRoute } from '@tanstack/react-router';

// Components
import DepositRequest from "@/pages/Admin/DepositRequest";

export const Route = createFileRoute('/_admin/depositRequests')({
  component: RouteComponent,
})

function RouteComponent() {
  return <DepositRequest />
}
