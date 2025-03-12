import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse(JSON.stringify({ error: "Não autorizado" }), {
        status: 401,
      });
    }

    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const compareWithPrevious = searchParams.get("compareWithPrevious") === "true";

    if (!startDate || !endDate) {
      return new NextResponse(JSON.stringify({ error: "Datas de início e fim são obrigatórias" }), {
        status: 400,
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calcular o período anterior com a mesma duração para comparação
    const periodDuration = end.getTime() - start.getTime();
    const previousStart = new Date(start.getTime() - periodDuration);
    const previousEnd = new Date(end.getTime() - periodDuration);

    // Buscar despesas do período atual
    const currentPeriodExpenses = await db.expense.groupBy({
      by: ['categoryId'],
      where: {
        userId: session.user.id,
        date: {
          gte: start,
          lte: end,
        },
      },
      _sum: { amount: true },
    });

    // Buscar despesas do período anterior para comparação (se solicitado)
    let previousPeriodExpenses = [];
    if (compareWithPrevious) {
      previousPeriodExpenses = await db.expense.groupBy({
        by: ['categoryId'],
        where: {
          userId: session.user.id,
          date: {
            gte: previousStart,
            lte: previousEnd,
          },
        },
        _sum: { amount: true },
      });
    }

    // Buscar nomes das categorias
    const categoryIds = [
      ...new Set([
        ...currentPeriodExpenses.map((item: any) => item.categoryId),
        ...previousPeriodExpenses.map((item: any) => item.categoryId),
      ]),
    ];

    const categories = await db.category.findMany({
      where: {
        id: {
          in: categoryIds,
        },
      },
    });

    // Calcular o total de despesas do período atual
    const totalCurrentExpenses = currentPeriodExpenses.reduce(
      (acc: number, item: any) => acc + (item._sum.amount?.toNumber() ?? 0),
      0
    );

    // Calcular o total de despesas do período anterior
    const totalPreviousExpenses = previousPeriodExpenses.reduce(
      (acc: number, item: any) => acc + (item._sum.amount?.toNumber() ?? 0),
      0
    );

    // Preparar dados para o relatório
    const reportData = {
      period: {
        start: start.toISOString(),
        end: end.toISOString(),
        label: `${start.toLocaleDateString('pt-BR')} - ${end.toLocaleDateString('pt-BR')}`,
      },
      previousPeriod: compareWithPrevious
        ? {
            start: previousStart.toISOString(),
            end: previousEnd.toISOString(),
            label: `${previousStart.toLocaleDateString('pt-BR')} - ${previousEnd.toLocaleDateString('pt-BR')}`,
          }
        : null,
      currentPeriodTotal: totalCurrentExpenses,
      previousPeriodTotal: compareWithPrevious ? totalPreviousExpenses : null,
      percentageChange: compareWithPrevious && totalPreviousExpenses > 0
        ? ((totalCurrentExpenses - totalPreviousExpenses) / totalPreviousExpenses) * 100
        : null,
      expensesByCategory: currentPeriodExpenses.map((item: any) => {
        const category = categories.find((cat: any) => cat.id === item.categoryId);
        const currentAmount = item._sum.amount?.toNumber() ?? 0;
        
        // Encontrar a mesma categoria no período anterior
        const previousItem = previousPeriodExpenses.find(
          (prev: any) => prev.categoryId === item.categoryId
        );
        const previousAmount = previousItem?._sum.amount?.toNumber() ?? 0;
        
        return {
          categoryId: item.categoryId,
          categoryName: category?.name || 'Sem categoria',
          currentAmount,
          previousAmount: compareWithPrevious ? previousAmount : null,
          percentageChange: compareWithPrevious && previousAmount > 0
            ? ((currentAmount - previousAmount) / previousAmount) * 100
            : null,
          percentageOfTotal: (currentAmount / totalCurrentExpenses) * 100,
        };
      }),
    };

    return NextResponse.json(reportData);
  } catch (error) {
    console.error("[EXPENSES_BY_PERIOD_ERROR]", error);
    return new NextResponse(JSON.stringify({ error: "Erro interno do servidor" }), {
      status: 500,
    });
  }
}