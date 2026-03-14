import { createFileRoute } from '@tanstack/react-router';

// Components
import Services from "@/pages/Home/Services";

export const Route = createFileRoute('/_home/services')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Services />
}
