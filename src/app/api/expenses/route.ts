import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as z from "zod";
import { updateUserBalance } from "@/lib/balance-utils";

const expenseSchema = z.object({
  amount: z.number().positive("O valor deve ser positivo"),
  description: z.string().optional(),
  date: z.string().refine((date) => !Number.isNaN(Date.parse(date)), {
    message: "Data inválida",
  }),
  categoryId: z.string().min(1, "Categoria é obrigatória"),
});

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
    const categoryId = searchParams.get("categoryId");

    // Definir o tipo da query
    type QueryType = {
      where: {
        userId: string;
        date?: {
          gte?: Date;
          lte?: Date;
        };
        categoryId?: string;
      };
      orderBy: {
        date: "desc" | "asc";
      };
    };

    // Construir a query
    const query: QueryType = {
      where: {
        userId: session.user.id,
      },
      orderBy: {
        date: "desc" as const,
      },
    };

    // Adicionar filtros de data se fornecidos
    if (startDate || endDate) {
      query.where.date = {};
      
      if (startDate) {
        query.where.date.gte = new Date(startDate);
      }
      
      if (endDate) {
        query.where.date.lte = new Date(endDate);
      }
    }

    // Adicionar filtro de categoria se fornecido
    if (categoryId) {
      query.where.categoryId = categoryId;
    }

    const expenses = await db.expense.findMany({
      ...query,
      include: {
        category: true,
      },
    });

    // Converter os valores Decimal para números
    const formattedExpenses = expenses.map((expense) => ({
      ...expense,
      amount: expense.amount.toNumber(),
    }));

    return NextResponse.json(formattedExpenses);
  } catch (error) {
    console.error("[EXPENSES_ERROR]", error);
    return new NextResponse(JSON.stringify({ error: "Erro interno do servidor" }), {
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse(JSON.stringify({ error: "Não autorizado" }), {
        status: 401,
      });
    }

    const body = await req.json();
    const { amount, description, date, categoryId } = expenseSchema.parse(body);

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

    const expense = await db.expense.create({
      data: {
        amount,
        description: description || "",
        date: new Date(date),
        userId: session.user.id,
        categoryId,
      },
      include: {
        category: true,
      },
    });

    // Atualizar o saldo do usuário
    await updateUserBalance(session.user.id);

    return NextResponse.json({
      ...expense,
      amount: expense.amount.toNumber(),
    });
  } catch (error) {
    console.error("[EXPENSES_POST_ERROR]", error);
    
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify({ error: "Dados inválidos", details: error.errors }), {
        status: 422,
      });
    }

    return new NextResponse(JSON.stringify({ error: "Erro interno do servidor" }), {
      status: 500,
    });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse(JSON.stringify({ error: "Não autorizado" }), {
        status: 401,
      });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new NextResponse(JSON.stringify({ error: "ID não fornecido" }), {
        status: 400,
      });
    }

    // Verificar se o ID é um UUID válido
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
      return new NextResponse(JSON.stringify({ error: "ID inválido" }), {
        status: 400,
      });
    }

    const body = await req.json();
    const { amount, description, date, categoryId } = expenseSchema.parse(body);

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

    const expense = await db.expense.update({
      where: {
        id,
        userId: session.user.id,
      },
      data: {
        amount,
        description: description || "",
        date: new Date(date),
        categoryId,
      },
      include: {
        category: true,
      },
    });

    // Atualizar o saldo do usuário
    await updateUserBalance(session.user.id);

    return NextResponse.json({
      ...expense,
      amount: expense.amount.toNumber(),
    });
  } catch (error) {
    console.error("[EXPENSES_PUT_ERROR]", error);
    
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify({ error: "Dados inválidos", details: error.errors }), {
        status: 422,
      });
    }

    return new NextResponse(JSON.stringify({ error: "Erro interno do servidor" }), {
      status: 500,
    });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse(JSON.stringify({ error: "Não autorizado" }), {
        status: 401,
      });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new NextResponse(JSON.stringify({ error: "ID não fornecido" }), {
        status: 400,
      });
    }

    // Verificar se o ID é um UUID válido
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
      return new NextResponse(JSON.stringify({ error: "ID inválido" }), {
        status: 400,
      });
    }

    await db.expense.delete({
      where: {
        id,
        userId: session.user.id,
      },
    });

    // Atualizar o saldo do usuário
    await updateUserBalance(session.user.id);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[EXPENSES_DELETE_ERROR]", error);
    return new NextResponse(JSON.stringify({ error: "Erro interno do servidor" }), {
      status: 500,
    });
  }
}