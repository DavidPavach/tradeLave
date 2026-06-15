import { createFileRoute } from '@tanstack/react-router';

// Components
import About from "@/pages/Home/About";

export const Route = createFileRoute('/_home/about')({
  head: () => ({
    meta: [
      {
        title: `About | Trade Lave`,
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <About />
}
