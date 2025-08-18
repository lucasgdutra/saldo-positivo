import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as z from "zod";
import RevenueService from "@/services/RevenueService"; // Importar o serviço
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

// Instanciar o serviço
const revenueService = new RevenueService();

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

    // Usar o serviço para buscar todas as receitas do usuário
    let revenues = await revenueService.getRevenuesByUser(session.user.id);

    // Aplicar filtros de data manualmente (se fornecidos)
    // Similar à lógica de despesas, idealmente o serviço teria um método com filtros.
    if (startDate) {
        const start = new Date(startDate);
        revenues = revenues.filter(rev => rev.date >= start);
    }
    if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999); // Incluir todo o dia final
        revenues = revenues.filter(rev => rev.date <= end);
    }

    // Ordenar por data descendente (como na implementação original)
    revenues.sort((a, b) => b.date.getTime() - a.date.getTime());

    // O serviço já deve retornar o amount como number
    return NextResponse.json(revenues);
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

    // Usar o serviço para criar a receita
    // O serviço deve lidar com a atualização do saldo
    const revenue = await revenueService.createRevenue({
      amount,
      description: description || "",
      date: new Date(date),
      userId: session.user.id,
    });

    // O serviço já deve retornar o amount como number
    return NextResponse.json(revenue);
  } catch (error) {
    console.error("[REVENUES_POST_ERROR]", error);
    
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify({ error: "Dados inválidos", details: error.issues }), {
        status: 422,
      });
    }

    // Adicionar tratamento de erro mais específico se necessário
    return new NextResponse(
      JSON.stringify({ error: "Erro interno do servidor ao criar receita" }),
      { status: 500 },
    );
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

    // Usar o serviço para atualizar a receita
    // Passar id, userId e os dados da atualização
    const updatedRevenue = await revenueService.updateRevenue(
        id,
        session.user.id,
        {
            amount,
            description: description || "",
            date: new Date(date),
        }
    );

    // O serviço lança erro se não encontrar ou não pertencer ao usuário
    // O bloco catch tratará esses erros.

    // O serviço já deve retornar o amount como number
    return NextResponse.json(updatedRevenue);
  } catch (error) {
    console.error("[REVENUES_PUT_ERROR]", error);
    
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify({ error: "Dados inválidos", details: error.message }), {
        status: 422,
      });
    }

    // Tratar erros específicos do serviço ou Prisma
    if (error instanceof Error && (error.message.includes("não encontrada") || error.message.includes("Acesso não permitido"))) {
       return new NextResponse(
        JSON.stringify({ error: error.message }),
        { status: 404 },
      );
    }
    if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
       return new NextResponse(
        JSON.stringify({ error: "Recurso não encontrado (Prisma P2025)" }),
        { status: 404 },
      );
    }

    return new NextResponse(
      JSON.stringify({ error: "Erro interno do servidor ao atualizar receita" }),
      { status: 500 },
    );
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

    // Usar o serviço para deletar a receita
    // O serviço lida com a verificação de permissão e atualização do saldo
    await revenueService.deleteRevenue(id, session.user.id);

    // O serviço lança erro se não encontrar ou não pertencer ao usuário
    // O bloco catch tratará esses erros.

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[REVENUES_DELETE_ERROR]", error);
    // Tratar erros específicos do serviço ou Prisma
    if (error instanceof Error && (error.message.includes("não encontrada") || error.message.includes("Acesso não permitido"))) {
       return new NextResponse(
        JSON.stringify({ error: error.message }),
        { status: 404 },
      );
    }
     if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
       return new NextResponse(
        JSON.stringify({ error: "Recurso não encontrado (Prisma P2025)" }),
        { status: 404 },
      );
    }
    return new NextResponse(
      JSON.stringify({ error: "Erro interno do servidor ao deletar receita" }),
      { status: 500 },
    );
  }
}