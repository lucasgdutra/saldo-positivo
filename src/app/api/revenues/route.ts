import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as z from "zod";
import { updateUserBalance } from "@/lib/balance-utils";

const revenueSchema = z.object({
  amount: z.number().positive("O valor deve ser positivo"),
  description: z.string().optional(),
  date: z.string().refine((date) => !Number.isNaN(Date.parse(date)), {
    message: "Data inválida",
  }),
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

    // Definir o tipo da query
    type QueryType = {
      where: {
        userId: string;
        date?: {
          gte?: Date;
          lte?: Date;
        };
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

    const revenues = await db.revenue.findMany({
      where: query.where,
      orderBy: query.orderBy,
    });

    // Converter os valores Decimal para números
    const formattedRevenues = revenues.map((revenue: { amount: { toNumber: () => number } }) => ({
      ...revenue,
      amount: revenue.amount.toNumber(),
    }));

    return NextResponse.json(formattedRevenues);
  } catch (error) {
    console.error("[REVENUES_ERROR]", error);
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
    const { amount, description, date } = revenueSchema.parse(body);

    const revenue = await db.revenue.create({
      data: {
        amount,
        description: description || "",
        date: new Date(date),
        userId: session.user.id,
      },
    });

    // Atualizar o saldo do usuário
    await updateUserBalance(session.user.id);

    return NextResponse.json({
      ...revenue,
      amount: revenue.amount.toNumber(),
    });
  } catch (error) {
    console.error("[REVENUES_POST_ERROR]", error);
    
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

    const searchParams = req.nextUrl.searchParams;
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
    const { amount, description, date } = revenueSchema.parse(body);

    const revenue = await db.revenue.update({
      where: {
        id,
        userId: session.user.id,
      },
      data: {
        amount,
        description: description || "",
        date: new Date(date),
      },
    });

    // Atualizar o saldo do usuário
    await updateUserBalance(session.user.id);

    return NextResponse.json({
      ...revenue,
      amount: revenue.amount.toNumber(),
    });
  } catch (error) {
    console.error("[REVENUES_PUT_ERROR]", error);
    
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

    const searchParams = req.nextUrl.searchParams;
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

    await db.revenue.delete({
      where: {
        id,
        userId: session.user.id,
      },
    });

    // Atualizar o saldo do usuário
    await updateUserBalance(session.user.id);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[REVENUES_DELETE_ERROR]", error);
    return new NextResponse(JSON.stringify({ error: "Erro interno do servidor" }), {
      status: 500,
    });
  }
}