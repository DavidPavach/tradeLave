import { createFileRoute } from '@tanstack/react-router';

// Components
import Kyc from '@/pages/Auth/Kyc';

export const Route = createFileRoute('/_auth/kyc')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Kyc />;
}
