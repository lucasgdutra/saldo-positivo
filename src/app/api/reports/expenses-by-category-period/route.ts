import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse(JSON.stringify({ error: "Não autorizado" }), {
        status: 401,
      });
    }

    const searchParams = request.nextUrl.searchParams;
    const categoryId = searchParams.get("categoryId");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const groupBy = searchParams.get("groupBy") || "month"; // month, week, day

    if (!categoryId) {
      return new NextResponse(JSON.stringify({ error: "ID da categoria é obrigatório" }), {
        status: 400,
      });
    }

    if (!startDate || !endDate) {
      return new NextResponse(JSON.stringify({ error: "Datas de início e fim são obrigatórias" }), {
        status: 400,
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Verificar se a categoria pertence ao usuário
    const category = await db.category.findUnique({
      where: {
        id: categoryId,
        userId: session.user.id,
      },
    });

    if (!category) {
      return new NextResponse(JSON.stringify({ error: "Categoria não encontrada" }), {
        status: 404,
      });
    }

    // Buscar todas as despesas da categoria no período
    const expenses = await db.expense.findMany({
      where: {
        userId: session.user.id,
        categoryId,
        date: {
          gte: start,
          lte: end,
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    // Agrupar despesas conforme solicitado
    const groupedExpenses = groupExpensesByPeriod(expenses, groupBy);

    // Calcular o total de despesas
    const totalAmount = expenses.reduce(
      (acc: number, expense: { amount: { toNumber(): number } }) => {
        return acc + expense.amount.toNumber();
      },
      0
    );

    // Preparar dados para o relatório
    const reportData = {
      category: {
        id: category.id,
        name: category.name,
      },
      period: {
        start: start.toISOString(),
        end: end.toISOString(),
        label: `${start.toLocaleDateString('pt-BR')} - ${end.toLocaleDateString('pt-BR')}`,
      },
      groupBy,
      totalAmount,
      expenses: groupedExpenses,
    };

    return NextResponse.json(reportData);
  } catch (error) {
    console.error("[EXPENSES_BY_CATEGORY_PERIOD_ERROR]", error);
    return new NextResponse(JSON.stringify({ error: "Erro interno do servidor" }), {
      status: 500,
    });
  }
}

// Função para agrupar despesas por período (mês, semana ou dia)
function groupExpensesByPeriod(expenses: { date: Date; amount: { toNumber(): number } }[], groupBy: string) {
  const groupedData: Record<string, { label: string; amount: number }> = {};

  for (const expense of expenses) {
    const date = new Date(expense.date);
    let key: string;
    let label: string;

    if (groupBy === "month") {
      // Formato: YYYY-MM
      key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      label = date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    } else if (groupBy === "week") {
      // Obter o primeiro dia da semana (domingo)
      const firstDayOfWeek = new Date(date);
      const dayOfWeek = date.getDay();
      firstDayOfWeek.setDate(date.getDate() - dayOfWeek);
      
      // Formato: YYYY-WW (ano-semana)
      const weekNumber = getWeekNumber(date);
      key = `${date.getFullYear()}-W${weekNumber}`;
      
      const lastDayOfWeek = new Date(firstDayOfWeek);
      lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
      
      label = `${firstDayOfWeek.toLocaleDateString('pt-BR')} - ${lastDayOfWeek.toLocaleDateString('pt-BR')}`;
    } else {
      // Formato: YYYY-MM-DD
      key = date.toISOString().split('T')[0];
      label = date.toLocaleDateString('pt-BR');
    }

    if (!groupedData[key]) {
      groupedData[key] = {
        label,
        amount: 0,
      };
    }

    groupedData[key].amount += expense.amount.toNumber();
  }

  // Converter para array e ordenar por chave
  return Object.entries(groupedData)
    .map(([key, value]) => ({
      key,
      ...value,
    }))
    .sort((a, b) => a.key.localeCompare(b.key));
}

// Função para obter o número da semana no ano
function getWeekNumber(date: Date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}