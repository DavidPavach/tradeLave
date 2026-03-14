import { createFileRoute } from '@tanstack/react-router';

// Components
import Verification from "@/pages/Auth/Verification";

export const Route = createFileRoute('/_auth/verification')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Verification />
}
