import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";
import { updateUserBalance } from "@/lib/balance-utils";

const revenueSchema = z.object({
  amount: z.number().positive("O valor deve ser positivo"),
  description: z.string().optional(),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
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

    // Construir a query
    const query: any = {
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

    const revenues = await db.revenue.findMany(query);

    // Converter os valores Decimal para números
    const formattedRevenues = revenues.map((revenue: any) => ({
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

export async function POST(req: Request) {
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

export async function PUT(req: Request) {
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

export async function DELETE(req: Request) {
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