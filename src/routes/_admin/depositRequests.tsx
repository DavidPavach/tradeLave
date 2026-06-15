import { createFileRoute } from '@tanstack/react-router';

// Components
import DepositRequest from "@/pages/Admin/DepositRequest";

export const Route = createFileRoute('/_admin/depositRequests')({
  head: () => ({
    meta: [
      {
        title: `Deposit Request | Trade Lave`,
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <DepositRequest />
}
