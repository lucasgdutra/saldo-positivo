// import { db } from "@/lib/db"; // Removido
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import ExpenseService from "@/services/ExpenseService"; // Importa ExpenseService
import RevenueService from "@/services/RevenueService"; // Importa RevenueService
import { db } from "@/lib/db"; // Importa a instância do Prisma para os Services
import { Decimal } from "@prisma/client/runtime/library"; // Importa Decimal

// Define um tipo para a transação combinada para melhor clareza
type CombinedTransaction = {
  id: string;
  type: 'expense' | 'revenue';
  amount: number;
  description: string;
  date: string; // Manter como string para consistência com a saída original
  category?: string;
};

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse(JSON.stringify({ error: "Não autorizado" }), {
        status: 401,
      });
    }

    const userId = session.user.id;
    const limit = 5; // Define o limite para buscar de cada tipo

    // Instancia os services
    const expenseService = new ExpenseService(db);
    const revenueService = new RevenueService(db);

    // Busca as últimas despesas e receitas usando os services
    const [recentExpenses, recentRevenues] = await Promise.all([
      expenseService.getRecentExpenses(userId, limit),
      revenueService.getRecentRevenues(userId, limit),
    ]);

    // Mapeia e combina as transações
    const combinedTransactions: CombinedTransaction[] = [
      ...recentExpenses.map(expense => ({
        id: expense.id,
        type: 'expense' as const, // Define o tipo explicitamente
        // Converte Decimal para number
        amount: expense.amount instanceof Decimal ? expense.amount.toNumber() : expense.amount,
        description: expense.description || 'Sem descrição',
        date: expense.date.toISOString(), // Usa ISO string para ordenação consistente
        category: expense.category?.name, // A categoria já vem incluída do service
      })),
      ...recentRevenues.map(revenue => ({
        id: revenue.id,
        type: 'revenue' as const, // Define o tipo explicitamente
        // Converte Decimal para number
        amount: revenue.amount instanceof Decimal ? revenue.amount.toNumber() : revenue.amount,
        description: revenue.description || 'Sem descrição',
        date: revenue.date.toISOString(), // Usa ISO string para ordenação consistente
      })),
    ];

    // Ordena as transações combinadas pela data (mais recentes primeiro)
    // e pega as 5 mais recentes no geral
    const sortedAndSlicedTransactions = combinedTransactions
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit); // Usa o mesmo limite aqui

     // Converte a data de volta para string no formato original da API se necessário
     // A API original usava .toString(), que pode variar. ISOString é mais padronizado.
     // Se for crucial manter o formato .toString(), ajuste aqui:
     const finalTransactions = sortedAndSlicedTransactions.map(tx => ({
         ...tx,
         date: new Date(tx.date).toString(), // Converte de volta para o formato string original
     }));


    return NextResponse.json(finalTransactions); // Retorna as 5 transações mais recentes combinadas

  } catch (error) {
    console.error("[API_RECENT_TRANSACTIONS_ERROR]", error);
    let errorMessage = "Erro interno do servidor ao buscar transações recentes.";
    // Não expor detalhes do erro ao cliente
    return new NextResponse(JSON.stringify({ error: errorMessage }), {
      status: 500,
    });
  }
}