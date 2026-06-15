import { createFileRoute } from '@tanstack/react-router';

// Components
import Services from "@/pages/Home/Services";

export const Route = createFileRoute('/_home/services')({
  head: () => ({
    meta: [
      {
        title: `Services | Trade Lave`,
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <Services />
}
