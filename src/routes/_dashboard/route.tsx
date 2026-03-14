import { Outlet, createFileRoute } from '@tanstack/react-router';

//Layout
import UserLayout from '@/layouts/UserLayout';

export const Route = createFileRoute('/_dashboard')({
  component: UserLayoutWrapper,
})

function UserLayoutWrapper() {
  return (
    <UserLayout>
      <Outlet />
    </UserLayout>
  )
}