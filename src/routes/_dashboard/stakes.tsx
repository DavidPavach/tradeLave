import { createFileRoute } from '@tanstack/react-router';

// Components
import Stakes from '@/pages/User/Stakes';

export const Route = createFileRoute('/_dashboard/stakes')({
  validateSearch: (search: Record<string, unknown>) => ({
        plan: search.plan as string | undefined,
    }),
  component: RouteComponent,
})

function RouteComponent() {
  return <Stakes />
}
