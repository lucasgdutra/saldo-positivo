import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as z from "zod";
import ExpenseService from "@/services/ExpenseService"; // Importar o serviço
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

// Instanciar o serviço
const expenseService = new ExpenseService();

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

    // Usar o serviço para buscar todas as despesas do usuário
    let expenses = await expenseService.getExpensesByUser(session.user.id);

    // Aplicar filtros de data e categoria manualmente (se fornecidos)
    // Isso mantém a funcionalidade da API original, embora possa ser menos eficiente
    // do que filtrar no banco de dados. Idealmente, o serviço teria um método
    // que aceitasse todos os filtros.
    if (startDate) {
        const start = new Date(startDate);
        expenses = expenses.filter(exp => exp.date >= start);
    }
    if (endDate) {
        const end = new Date(endDate);
        // Ajustar a data final para incluir todo o dia
        end.setHours(23, 59, 59, 999);
        expenses = expenses.filter(exp => exp.date <= end);
    }
    if (categoryId) {
        expenses = expenses.filter(exp => exp.categoryId === categoryId);
    }

    // Ordenar por data descendente (como na implementação original)
    expenses.sort((a, b) => b.date.getTime() - a.date.getTime());


    // O serviço já deve retornar o amount como number e incluir a categoria
    return NextResponse.json(expenses);
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

    // Usar o serviço para criar a despesa
    // O serviço deve lidar com a verificação da categoria e atualização do saldo
    const expense = await expenseService.createExpense({
      amount,
      description: description || "",
      date: new Date(date),
      userId: session.user.id,
      categoryId,
    });

    // O serviço já deve retornar o amount como number
    return NextResponse.json(expense);
  } catch (error) {
    console.error("[EXPENSES_POST_ERROR]", error);
    
    if (error instanceof z.ZodError) {
      return new NextResponse(
        JSON.stringify({ error: "Dados inválidos", details: error.issues }),
        { status: 422 },
      );
    }
    // Tratar erros específicos do Prisma ou do serviço, se necessário
    if (error instanceof PrismaClientKnownRequestError && error.code === "P2003") {
      // Foreign key constraint failed (e.g., categoryId not found)
      return new NextResponse(
        JSON.stringify({ error: "Categoria não encontrada" }),
        { status: 404 },
      );
    }

    return new NextResponse(
      JSON.stringify({ error: "Erro interno do servidor ao criar despesa" }),
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
    const { amount, description, date, categoryId } = expenseSchema.parse(body);

    // Usar o serviço para atualizar a despesa
    // Passar id, userId e os dados da atualização
    const updatedExpense = await expenseService.updateExpense(
        id,
        session.user.id, // Passar userId como segundo argumento
        {
            amount,
            description: description || "", // Mantém a lógica original
            date: new Date(date),
            categoryId,
        }
    );

    // A verificação de !updatedExpense não é mais necessária aqui,
    // pois o serviço lança um erro se a despesa não for encontrada ou não pertencer ao usuário.
    // O bloco catch tratará esses erros.
    // if (!updatedExpense) {
    //   return new NextResponse(
    //     JSON.stringify({ error: "Despesa não encontrada ou não pertence ao usuário" }),
    //     { status: 404 },
    //   );
    // }

    // O serviço já deve retornar o amount como number
    return NextResponse.json(updatedExpense);
    // Remover as linhas duplicadas e incorretas abaixo
  } catch (error) {
    console.error("[EXPENSES_PUT_ERROR]", error);
    
    if (error instanceof z.ZodError) {
      return new NextResponse(
        JSON.stringify({ error: "Dados inválidos", details: error.message }),
        { status: 422 },
      );
    }
    // Tratar erros específicos do Prisma ou do serviço, se necessário
    if (error instanceof PrismaClientKnownRequestError && error.code === "P2003") {
      // Foreign key constraint failed (e.g., categoryId not found)
      return new NextResponse(
        JSON.stringify({ error: "Categoria não encontrada" }),
        { status: 404 },
      );
    }
    // O serviço agora lança erros específicos que podemos capturar
    if (error instanceof Error && (error.message.includes("não encontrada") || error.message.includes("Acesso não permitido"))) {
       return new NextResponse(
        JSON.stringify({ error: error.message }), // Usar a mensagem de erro do serviço
        { status: 404 }, // Ou 403 para acesso não permitido, mas 404 é comum
      );
    }
    // Manter o erro P2025 genérico caso algo escape do serviço
    if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
       return new NextResponse(
        JSON.stringify({ error: "Recurso não encontrado (Prisma P2025)" }),
        { status: 404 },
      );
    }


    return new NextResponse(
      JSON.stringify({ error: "Erro interno do servidor ao atualizar despesa" }),
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

    // Usar o serviço para deletar a despesa
    // O serviço lida com a verificação de permissão e atualização do saldo
    // Ele também lança erro se não encontrar ou não pertencer ao usuário
    await expenseService.deleteExpense(id, session.user.id);

    // A verificação de !deleted não é mais necessária, o catch tratará os erros.
    // if (!deleted) {
    //    return new NextResponse(
    //     JSON.stringify({ error: "Despesa não encontrada ou não pertence ao usuário" }),
    //     { status: 404 },
    //   );
    // }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[EXPENSES_DELETE_ERROR]", error);
    // Tratar erros específicos do serviço ou Prisma
    if (error instanceof Error && (error.message.includes("não encontrada") || error.message.includes("Acesso não permitido"))) {
       return new NextResponse(
        JSON.stringify({ error: error.message }), // Usar a mensagem de erro do serviço
        { status: 404 }, // Ou 403 para acesso não permitido
      );
    }
     if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
       return new NextResponse(
        JSON.stringify({ error: "Recurso não encontrado (Prisma P2025)" }),
        { status: 404 },
      );
    }
    return new NextResponse(
      JSON.stringify({ error: "Erro interno do servidor ao deletar despesa" }),
      { status: 500 },
    );
  }
}