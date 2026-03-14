import { createFileRoute } from '@tanstack/react-router';

// Components
import Transaction from "@/pages/Admin/Transactions";

export const Route = createFileRoute('/_admin/transactions')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Transaction />
}
