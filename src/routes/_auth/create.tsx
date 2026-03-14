import { createFileRoute } from '@tanstack/react-router';

//Components
import Create from "@/pages/Auth/Create";

export const Route = createFileRoute('/_auth/create')({
  validateSearch: (search: Record<string, unknown>) => ({
    ref: search.ref as string | undefined,
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <Create />
}
