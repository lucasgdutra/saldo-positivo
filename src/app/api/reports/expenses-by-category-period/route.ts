// import { db } from "@/lib/db"; // Removido - Usar ExpenseService
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { type NextRequest, NextResponse } from "next/server";
import ExpenseService from "@/services/ExpenseService"; // Importado
import { Decimal } from "@prisma/client/runtime/library"; // Importado para cálculo do total

// Instancia o serviço fora da função para reutilização (se aplicável, senão pode ser dentro)
const expenseService = new ExpenseService();

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      return new NextResponse(JSON.stringify({ error: "Não autorizado" }), {
        status: 401,
      });
    }

    const searchParams = request.nextUrl.searchParams;
    const categoryId = searchParams.get("categoryId");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const groupBy = searchParams.get("groupBy") || "month"; // month, week, day

    // Validação dos parâmetros de entrada
    if (!categoryId) {
      return new NextResponse(JSON.stringify({ error: "ID da categoria é obrigatório" }), {
        status: 400,
      });
    }

    if (!startDate || !endDate) {
      return new NextResponse(JSON.stringify({ error: "Datas de início e fim são obrigatórias" }), {
        status: 400,
      });
    }

    let start: Date;
    let end: Date;
    try {
      start = new Date(startDate);
      end = new Date(endDate);
      // Validação simples das datas
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new Error("Formato de data inválido");
      }
      // Garante que a data final inclua o dia inteiro
      end.setHours(23, 59, 59, 999);
    } catch (e) {
      return new NextResponse(JSON.stringify({ error: "Formato de data inválido" }), {
        status: 400,
      });
    }


    // Usar o ExpenseService para buscar dados e validar categoria
    const { category, expenses } = await expenseService.getExpensesByCategoryAndPeriodReport(
      userId,
      categoryId,
      start,
      end
    );

    // Agrupar despesas conforme solicitado (a função groupExpensesByPeriod espera amount como Decimal ou number)
    // O tipo Expense retornado pelo serviço tem 'amount' como Decimal
    const groupedExpenses = groupExpensesByPeriod(expenses, groupBy);

    // Calcular o total de despesas a partir dos dados retornados pelo serviço
    const totalAmount = expenses.reduce(
      (acc: Decimal, expense) => {
        // expense.amount já é Decimal
        return acc.add(expense.amount);
      },
      new Decimal(0)
    );

    // Preparar dados para o relatório (usando a categoria validada pelo serviço)
    const reportData = {
      category: {
        id: category.id,
        name: category.name,
      },
      period: {
        start: start.toISOString(),
        end: end.toISOString(),
        label: `${start.toLocaleDateString('pt-BR')} - ${end.toLocaleDateString('pt-BR')}`,
      },
      groupBy,
      totalAmount: totalAmount.toNumber(), // Converte Decimal para number para a resposta JSON
      expenses: groupedExpenses,
    };

    return NextResponse.json(reportData);

  } catch (error) {
     console.error("[EXPENSES_BY_CATEGORY_PERIOD_ERROR]", error);
     // Tratamento de erro específico para categoria não encontrada vindo do serviço
     if (error instanceof Error && error.message.includes('Categoria não encontrada')) {
         return new NextResponse(JSON.stringify({ error: "Categoria não encontrada ou acesso não permitido." }), {
             status: 404, // Ou 403 se preferir indicar acesso negado
         });
     }
     // Tratamento de outros erros do serviço ou erros gerais
     return new NextResponse(JSON.stringify({ error: "Erro interno do servidor ao gerar relatório." }), {
         status: 500,
     });
  }
}

// Função para agrupar despesas por período (mês, semana ou dia)
// Função para agrupar despesas por período (mês, semana ou dia)
// Ajustada para receber Expense[] onde amount é Decimal
function groupExpensesByPeriod(expenses: { date: Date; amount: Decimal }[], groupBy: string) {
  // Usar Decimal para acumular os valores para evitar problemas de precisão
  const groupedData: Record<string, { label: string; amount: Decimal }> = {};

  for (const expense of expenses) {
    const date = new Date(expense.date);
    let key: string;
    let label: string;

    if (groupBy === "month") {
      // Formato: YYYY-MM
      key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      label = date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    } else if (groupBy === "week") {
      // Obter o primeiro dia da semana (domingo)
      const firstDayOfWeek = new Date(date);
      const dayOfWeek = date.getDay(); // 0 = Domingo, 1 = Segunda, ...
      firstDayOfWeek.setDate(date.getDate() - dayOfWeek);
      firstDayOfWeek.setHours(0, 0, 0, 0); // Zera a hora para consistência da chave

      // Formato: YYYY-WW (ano-semana) - Usar ISO Week Date pode ser mais robusto, mas getWeekNumber é mantido por ora
      const weekNumber = getWeekNumber(date);
      key = `${firstDayOfWeek.getFullYear()}-W${String(weekNumber).padStart(2, '0')}`; // Usa o ano do primeiro dia da semana

      const lastDayOfWeek = new Date(firstDayOfWeek);
      lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

      label = `${firstDayOfWeek.toLocaleDateString('pt-BR')} - ${lastDayOfWeek.toLocaleDateString('pt-BR')}`;
    } else { // Agrupar por dia
      // Formato: YYYY-MM-DD
      key = date.toISOString().split('T')[0];
      label = date.toLocaleDateString('pt-BR');
    }

    if (!groupedData[key]) {
      groupedData[key] = {
        label,
        amount: new Decimal(0), // Inicializa com Decimal(0)
      };
    }
    // Acumula usando Decimal.add
    groupedData[key].amount = groupedData[key].amount.add(expense.amount);
  }

  // Converter para array, converter Decimal para number na saída e ordenar por chave
  return Object.entries(groupedData)
    .map(([key, value]) => ({
      key,
      label: value.label,
      amount: value.amount.toNumber(), // Converte para number para a resposta JSON
    }))
    .sort((a, b) => a.key.localeCompare(b.key));
}

// Função para obter o número da semana no ano
function getWeekNumber(date: Date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}