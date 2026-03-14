import { createFileRoute } from '@tanstack/react-router';

// Components
import About from "@/pages/Home/About";

export const Route = createFileRoute('/_home/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return <About />
}
