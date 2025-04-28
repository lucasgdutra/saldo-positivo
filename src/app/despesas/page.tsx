import { AuthGuard } from "@/components/auth/auth-guard";
import { AppLayout } from "@/components/layout/app-layout";
import { ExpensesList } from "@/components/expenses/expenses-list";
import { ImportarHistorico } from "@/components/expenses/importar-historico";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function DespesasPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/");
  }

  const despesas = await db.expense.findMany({
    where: { userId: session.user.id },
    orderBy: { date: "desc" },
    include: {
      category: true,
    },
  });

  const formattedDespesas = despesas.map((despesa: any) => ({
    ...despesa,
    amount: despesa.amount.toNumber(),
    description: despesa.description || null,
    category: despesa.category
  ? {
      ...despesa.category,
      color: despesa.category.color || "#6E56CF",
    }
  : {
      id: "",
      name: "Não categorizado",
      userId: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      color: "#999999",
    },
  }));

  return (
    <AuthGuard requireAuth>
      <AppLayout>
        <ImportarHistorico />
        <ExpensesList initialExpenses={formattedDespesas} />
      </AppLayout>
    </AuthGuard>
  );
}
