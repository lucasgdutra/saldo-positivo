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

  // Buscar categorias para o filtro
  const categorias = await db.category.findMany({
    where: { userId: session.user.id },
    orderBy: { name: "asc" },
  });

  return (
    <AuthGuard requireAuth>
      <AppLayout>
        <ReportsList initialCategories={categorias} />
      </AppLayout>
    </AuthGuard>
  );
}