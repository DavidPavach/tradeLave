import { Outlet, createFileRoute } from '@tanstack/react-router';

// Layout
import AdminLayout from '@/layouts/AdminLayout';

export const Route = createFileRoute('/_admin')({
  component: AdminLayoutWrapper,
})

function AdminLayoutWrapper() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  )
}