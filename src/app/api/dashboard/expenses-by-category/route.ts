// import { db } from "@/lib/db"; // Removido - Acesso direto ao DB não é mais necessário
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import ExpenseService from "@/services/ExpenseService"; // Importa o ExpenseService
import { db } from "@/lib/db"; // Importa a instância do Prisma para o Service

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse(JSON.stringify({ error: "Não autorizado" }), {
        status: 401,
      });
    }

    // Instancia o ExpenseService com a conexão do Prisma
    const expenseService = new ExpenseService(db);

    // Chama o método do service para buscar as despesas por categoria do mês atual
    const expensesData = await expenseService.getExpensesByCategoryForCurrentMonth(session.user.id);

    return NextResponse.json(expensesData);
  } catch (error) {
    // Loga o erro específico que pode vir do service
    console.error("[API_EXPENSES_BY_CATEGORY_ERROR]", error);

    // Retorna uma resposta de erro genérica para o cliente
    let errorMessage = "Erro interno do servidor ao buscar despesas por categoria.";
    if (error instanceof Error) {
        // Poderia personalizar a mensagem baseada no tipo de erro, se necessário
        // errorMessage = error.message; // Cuidado ao expor mensagens de erro internas
    }

    return new NextResponse(JSON.stringify({ error: errorMessage }), {
      status: 500, // Mantém o status 500 para erros internos
    });
  }
}