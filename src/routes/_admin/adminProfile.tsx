import { createFileRoute } from '@tanstack/react-router';

// Component
import Profile from "@/pages/Admin/Profile";

export const Route = createFileRoute('/_admin/adminProfile')({
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
