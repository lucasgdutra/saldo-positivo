// import { db } from "@/lib/db"; // Removido - Usar ExpenseService

import { Decimal } from "@prisma/client/runtime/library"; // Importado para cálculos se necessário
import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import ExpenseService from "@/services/ExpenseService"; // Importado

// Instancia o serviço
const expenseService = new ExpenseService();

// Define o tipo esperado do resultado do serviço getGroupedExpensesByPeriod
type GroupedExpenseResult = {
	categoryId: string | null;
	categoryName: string | null;
	total: number; // O serviço já retorna como number
};

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
		const startDate = searchParams.get("startDate");
		const endDate = searchParams.get("endDate");
		const compareWithPrevious =
			searchParams.get("compareWithPrevious") === "true";

		// Validação dos parâmetros de entrada
		if (!startDate || !endDate) {
			return new NextResponse(
				JSON.stringify({ error: "Datas de início e fim são obrigatórias" }),
				{
					status: 400,
				},
			);
		}

		let start: Date;
		let end: Date;
		try {
			start = new Date(startDate);
			end = new Date(endDate);
			if (isNaN(start.getTime()) || isNaN(end.getTime())) {
				throw new Error("Formato de data inválido");
			}
			// Garante que a data final inclua o dia inteiro
			end.setHours(23, 59, 59, 999);
		} catch (e) {
			return new NextResponse(
				JSON.stringify({ error: "Formato de data inválido" }),
				{
					status: 400,
				},
			);
		}

		// Calcular o período anterior com a mesma duração para comparação
		const periodDuration = end.getTime() - start.getTime(); // Diferença em milissegundos
		// Ajuste para garantir que a duração seja de pelo menos 1 dia (86400000 ms) para evitar períodos inválidos
		const adjustedDuration = Math.max(periodDuration, 86400000);
		const previousStart = new Date(start.getTime() - adjustedDuration);
		// O fim do período anterior deve ser um instante antes do início do período atual
		const previousEnd = new Date(start.getTime() - 1); // Subtrai 1 milissegundo

		// Buscar despesas agrupadas do período atual usando o serviço
		const currentPeriodGroupedExpenses: GroupedExpenseResult[] =
			await expenseService.getGroupedExpensesByPeriod(userId, start, end);

		// Buscar despesas agrupadas do período anterior (se solicitado)
		let previousPeriodGroupedExpenses: GroupedExpenseResult[] = [];
		if (compareWithPrevious) {
			previousPeriodGroupedExpenses =
				await expenseService.getGroupedExpensesByPeriod(
					userId,
					previousStart,
					previousEnd,
				);
		}

		// Calcular o total de despesas do período atual (soma dos totais retornados pelo serviço)
		const totalCurrentExpenses = currentPeriodGroupedExpenses.reduce(
			(acc, item) => acc + item.total,
			0,
		);

		// Calcular o total de despesas do período anterior
		const totalPreviousExpenses = previousPeriodGroupedExpenses.reduce(
			(acc, item) => acc + item.total,
			0,
		);

		// Preparar dados para o relatório
		const reportData = {
			period: {
				start: start.toISOString(),
				end: end.toISOString(),
				label: `${start.toLocaleDateString("pt-BR")} - ${end.toLocaleDateString("pt-BR")}`,
			},
			previousPeriod: compareWithPrevious
				? {
						start: previousStart.toISOString(),
						end: previousEnd.toISOString(), // Usa o previousEnd calculado
						label: `${previousStart.toLocaleDateString("pt-BR")} - ${previousEnd.toLocaleDateString("pt-BR")}`,
					}
				: null,
			currentPeriodTotal: totalCurrentExpenses,
			previousPeriodTotal: compareWithPrevious ? totalPreviousExpenses : null,
			percentageChange:
				compareWithPrevious && totalPreviousExpenses !== 0 // Evita divisão por zero
					? ((totalCurrentExpenses - totalPreviousExpenses) /
							totalPreviousExpenses) *
						100
					: compareWithPrevious && totalCurrentExpenses > 0
						? 100
						: null, // Se anterior é 0 e atual > 0, aumento de 100% (ou pode ser Infinity/null)
			expensesByCategory: currentPeriodGroupedExpenses.map((item) => {
				const currentAmount = item.total;

				// Encontrar a mesma categoria no período anterior
				const previousItem = previousPeriodGroupedExpenses.find(
					(prev) => prev.categoryId === item.categoryId,
				);
				const previousAmount = previousItem?.total ?? 0;

				const percentageOfTotal =
					totalCurrentExpenses !== 0
						? (currentAmount / totalCurrentExpenses) * 100
						: 0;

				return {
					categoryId: item.categoryId,
					categoryName: item.categoryName || "Sem categoria", // Usa o nome retornado pelo serviço
					currentAmount,
					previousAmount: compareWithPrevious ? previousAmount : null,
					percentageChange:
						compareWithPrevious && previousAmount !== 0
							? ((currentAmount - previousAmount) / previousAmount) * 100
							: compareWithPrevious && currentAmount > 0
								? 100
								: null, // Lógica similar ao total
					percentageOfTotal: percentageOfTotal,
				};
			}),
		};

		return NextResponse.json(reportData);
	} catch (error) {
		console.error("[EXPENSES_BY_PERIOD_ERROR]", error);
		// Verifica se é um erro lançado pelo nosso serviço (opcional, mas bom para clareza)
		if (
			error instanceof Error &&
			error.message.startsWith("Erro ao buscar despesas")
		) {
			return new NextResponse(JSON.stringify({ error: error.message }), {
				status: 500,
			});
		}
		// Erro genérico
		return new NextResponse(
			JSON.stringify({ error: "Erro interno do servidor ao gerar relatório." }),
			{
				status: 500,
			},
		);
	}
}
