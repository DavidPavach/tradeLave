import { createFileRoute } from '@tanstack/react-router';

// Components
import Profile from "@/pages/User/Profile";

export const Route = createFileRoute('/_dashboard/profile')({
  head: () => ({
    meta: [
      {
        title: `Profile | Trade Lave`,
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <Profile />
}
