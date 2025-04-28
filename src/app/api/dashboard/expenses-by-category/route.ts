import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse(JSON.stringify({ error: "Não autorizado" }), {
        status: 401,
      });
    }

    const { searchParams } = new URL(req.url);
    const month = parseInt(searchParams.get("month") || "");
    const year = parseInt(searchParams.get("year") || "");

    if (isNaN(month) || isNaN(year)) {
      return new NextResponse(JSON.stringify({ error: "Parâmetros inválidos" }), {
        status: 400,
      });
    }

    const inicioMes = new Date(year, month - 1, 1);
    const fimMes = new Date(year, month, 0);

    const expensesByCategory = await db.expense.groupBy({
      by: ["categoryId"],
      where: {
        userId: session.user.id,
        categoryId: {
          not: null,
        },
        date: {
          gte: inicioMes,
          lte: fimMes,
        },
      },
      _sum: { amount: true },
    });

    const categoryIds = expensesByCategory
      .map((item) => item.categoryId)
      .filter((id): id is string => id !== null);

    const categories = await db.category.findMany({
      where: {
        id: {
          in: categoryIds,
        },
      },
    });

    const data = expensesByCategory.map((item) => {
      const category = categories.find((cat) => cat.id === item.categoryId);
      return {
        name: category?.name || "Sem categoria",
        value: item._sum.amount?.toNumber() ?? 0,
      };
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("[EXPENSES_BY_CATEGORY_ERROR]", error);
    return new NextResponse(JSON.stringify({ error: "Erro interno do servidor" }), {
      status: 500,
    });
  }
}
