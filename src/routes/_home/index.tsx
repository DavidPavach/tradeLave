import { createFileRoute } from '@tanstack/react-router';

// Components
import LandingPage from "@/pages/Home/LandingPage";

export const Route = createFileRoute('/_home/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <LandingPage />
}
