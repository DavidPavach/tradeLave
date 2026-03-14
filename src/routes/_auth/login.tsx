import { createFileRoute } from '@tanstack/react-router';

//Components
import Login from "@/pages/Auth/Login";

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Login />
}
