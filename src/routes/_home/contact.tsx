import { createFileRoute } from '@tanstack/react-router';

// Components
import Contact from "@/pages/Home/Contact";

export const Route = createFileRoute('/_home/contact')({
  head: () => ({
    meta: [
      {
        title: `Contact | Trade Lave`,
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <Contact />
}
