import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse(JSON.stringify({ error: "Não autorizado" }), {
        status: 401,
      });
    }

    // Buscar as últimas despesas
    const expenses = await db.expense.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        date: 'desc',
      },
      take: 5,
      include: {
        category: true,
      },
    });

    // Buscar as últimas receitas
    const revenues = await db.revenue.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        date: 'desc',
      },
      take: 5,
    });

    // Combinar e ordenar transações recentes
    const combinedTransactions = [
      ...expenses.map((expense: any) => ({
        id: expense.id,
        type: 'expense',
        amount: expense.amount.toNumber(),
        description: expense.description || 'Sem descrição',
        // Preservar o fuso horário local ao enviar a data para o frontend
        date: expense.date.toString(),
        category: expense.category?.name,
      })),
      ...revenues.map((revenue: any) => ({
        id: revenue.id,
        type: 'revenue',
        amount: revenue.amount.toNumber(),
        description: revenue.description || 'Sem descrição',
        // Preservar o fuso horário local ao enviar a data para o frontend
        date: revenue.date.toString(),
      })),
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
     .slice(0, 5);

    return NextResponse.json(combinedTransactions);
  } catch (error) {
    console.error("[RECENT_TRANSACTIONS_ERROR]", error);
    return new NextResponse(JSON.stringify({ error: "Erro interno do servidor" }), {
      status: 500,
    });
  }
}