import { createFileRoute } from '@tanstack/react-router';

// Components
import Legal from "@/pages/Home/Legal";

export const Route = createFileRoute('/_home/legal')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Legal />
}
