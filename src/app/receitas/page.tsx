import { AuthGuard } from "@/components/auth/auth-guard";
import { AppLayout } from "@/components/layout/app-layout";
import { RevenuesList } from "@/components/revenues/revenues-list";
// Remover imports não utilizados: db, getServerSession, redirect, authOptions

// A página agora é mais simples, apenas renderiza o layout e o componente cliente
export default function ReceitasPage() {
  // A verificação de autenticação pode ser feita pelo AuthGuard ou pelo próprio componente cliente com tRPC
  return (
    <AuthGuard requireAuth>
      <AppLayout>
        {/* Remover a prop initialRevenues */}
        <RevenuesList />
      </AppLayout>
    </AuthGuard>
  );
}