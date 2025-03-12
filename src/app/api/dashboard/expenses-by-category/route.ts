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

    // Buscar o mês atual
    const hoje = new Date();
    const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    const fimMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);

    // Buscar despesas agrupadas por categoria
    const expensesByCategory = await db.expense.groupBy({
      by: ['categoryId'],
      where: {
        userId: session.user.id,
        date: {
          gte: inicioMes,
          lte: fimMes,
        },
      },
      _sum: { amount: true },
    });

    // Buscar nomes das categorias
    const categoryIds = expensesByCategory.map((item: any) => item.categoryId);
    const categories = await db.category.findMany({
      where: {
        id: {
          in: categoryIds,
        },
      },
    });

    // Preparar dados para o gráfico de pizza
    const expensesByCategoryData = expensesByCategory.map((item: any) => {
      const category = categories.find((cat: any) => cat.id === item.categoryId);
      return {
        name: category?.name || 'Sem categoria',
        value: item._sum.amount?.toNumber() ?? 0,
      };
    });

    return NextResponse.json(expensesByCategoryData);
  } catch (error) {
    console.error("[EXPENSES_BY_CATEGORY_ERROR]", error);
    return new NextResponse(JSON.stringify({ error: "Erro interno do servidor" }), {
      status: 500,
    });
  }
}