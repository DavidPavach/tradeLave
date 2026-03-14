import { createFileRoute } from '@tanstack/react-router';

// Components
import Deposit from "@/pages/User/Deposits/index";

export const Route = createFileRoute('/_dashboard/deposit')({
  validateSearch: (search: Record<string, unknown>) => ({
    method: search.method as string | undefined,
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <Deposit />;
}
