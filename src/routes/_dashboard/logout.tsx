import { createFileRoute } from '@tanstack/react-router';

// Components
import Logout from "@/pages/User/Logout";

export const Route = createFileRoute('/_dashboard/logout')({
  head: () => ({
    meta: [
      {
        title: `Logout | Trade Lave`,
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <Logout />
}
