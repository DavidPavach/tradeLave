import { createFileRoute } from '@tanstack/react-router';

// Components
import Operations from "@/pages/Auth/Operations";

export const Route = createFileRoute('/_auth/operations')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Operations />
}
