// import { db } from "@/lib/db"; // Removido - Acesso direto ao DB não é mais necessário
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import UserService from "@/services/UserService"; // Importa o UserService
import { db } from "@/lib/db"; // Importa a instância do Prisma para o Service

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse(JSON.stringify({ error: "Não autorizado" }), {
        status: 401,
      });
    }

    // Instancia o UserService com a conexão do Prisma
    const userService = new UserService(db);

    // Chama o método do service para buscar o histórico de saldo
    const balanceHistory = await userService.getBalanceHistory(session.user.id);

    return NextResponse.json(balanceHistory);
  } catch (error) {
    // Loga o erro específico que pode vir do service
    console.error("[API_BALANCE_HISTORY_ERROR]", error);

    // Retorna uma resposta de erro genérica para o cliente
    // O erro específico já foi logado no servidor
    let errorMessage = "Erro interno do servidor ao buscar histórico de saldo.";
    if (error instanceof Error) {
        // Poderia personalizar a mensagem baseada no tipo de erro, se necessário
        // errorMessage = error.message; // Cuidado ao expor mensagens de erro internas
    }

    return new NextResponse(JSON.stringify({ error: errorMessage }), {
      status: 500, // Mantém o status 500 para erros internos
    });
  }
}