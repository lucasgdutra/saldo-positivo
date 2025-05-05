import { AuthGuard } from "@/components/auth/auth-guard";
import { AppLayout } from "@/components/layout/app-layout";
import { ReportsList } from "@/components/reports/reports-list";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function RelatoriosPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/");
  }

  // Remove a busca de categorias inicial, o componente buscará via tRPC
  // const categorias = await db.category.findMany({
  //   where: { userId: session.user.id },
  //   orderBy: { name: "asc" },
  // });

  return (
    <AuthGuard requireAuth>
      <AppLayout>
        {/* Remove a prop initialCategories */}
        <ReportsList />
      </AppLayout>
    </AuthGuard>
  );
}