import { Expense, Prisma, PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library"; // Importa o tipo Decimal
// Importa o tipo estendido e a instância global para referência
import { PrismaClientWithExtensions, db as prismaInstance } from "@/lib/db";

// Define um tipo que pode ser PrismaClient ou um cliente de transação Prisma
type PrismaTransactionClient = any; // Simplificado

/**
 * Repository para gerenciar operações relacionadas a Despesas (Expenses) no banco de dados.
 * Encapsula toda a lógica de acesso a dados para a entidade Expense.
 */
export class ExpenseRepository {
	// Aceita o cliente Prisma base, o estendido ou um cliente de transação
	private prisma:
		| PrismaClient
		| PrismaClientWithExtensions
		| PrismaTransactionClient;

	constructor(
		prismaClient:
			| PrismaClient
			| PrismaClientWithExtensions
			| PrismaTransactionClient,
	) {
		this.prisma = prismaClient;
	}

	/**
	 * Cria uma nova despesa no banco de dados.
	 * @param data - Dados da despesa a ser criada. Inclui valor, descrição, data, ID do usuário e ID da categoria.
	 * @returns A despesa criada.
	 */
	async create(data: Prisma.ExpenseUncheckedCreateInput): Promise<Expense> {
		return this.prisma.expense.create({ data });
	}

	/**
	 * Busca uma despesa pelo seu ID.
	 * @param id - O ID da despesa a ser buscada.
	 * @returns A despesa encontrada (com categoria incluída) ou null se não existir.
	 */
	async findById(
		id: string,
	): Promise<Prisma.ExpenseGetPayload<{ include: { category: true } }> | null> {
		return this.prisma.expense.findUnique({
			where: { id },
			include: { category: true }, // Inclui a categoria relacionada
		});
	}

	/**
	 * Busca todas as despesas de um usuário específico.
	 * @param userId - O ID do usuário cujas despesas serão buscadas.
	 * @returns Uma lista de despesas do usuário (com categorias incluídas).
	 */
	async findByUserId(
		userId: string,
	): Promise<Prisma.ExpenseGetPayload<{ include: { category: true } }>[]> {
		return this.prisma.expense.findMany({
			where: { userId },
			include: { category: true }, // Inclui a categoria relacionada
			orderBy: { date: "desc" }, // Ordena pela data mais recente
		});
	}

	/**
	 * Atualiza uma despesa existente.
	 * @param id - O ID da despesa a ser atualizada.
	 * @param data - Os dados a serem atualizados na despesa.
	 * @returns A despesa atualizada.
	 */
	async update(id: string, data: Prisma.ExpenseUpdateInput): Promise<Expense> {
		return this.prisma.expense.update({
			where: { id },
			data,
		});
	}

	/**
	 * Remove uma despesa do banco de dados.
	 * @param id - O ID da despesa a ser removida.
	 * @returns A despesa removida.
	 */
	async delete(id: string): Promise<Expense> {
		return this.prisma.expense.delete({
			where: { id },
		});
	}

	/**
	 * Busca despesas de um usuário dentro de um período específico.
	 * @param userId - O ID do usuário.
	 * @param startDate - Data de início do período.
	 * @param endDate - Data de fim do período.
	 * @returns Uma lista de despesas dentro do período especificado (com categorias incluídas).
	 */
	async findByUserIdAndPeriod(
		userId: string,
		startDate: Date,
		endDate: Date,
	): Promise<Prisma.ExpenseGetPayload<{ include: { category: true } }>[]> {
		return this.prisma.expense.findMany({
			where: {
				userId,
				date: {
					gte: startDate, // Greater than or equal to startDate
					lte: endDate, // Less than or equal to endDate
				},
			},
			include: { category: true },
			orderBy: { date: "desc" },
		});
	}

	/**
	 * Busca as despesas recentes de um usuário.
	 * @param userId - O ID do usuário.
	 * @param limit - O número máximo de despesas a serem retornadas (padrão: 5).
	 * @returns Uma lista das despesas mais recentes do usuário (com categorias incluídas).
	 */
	async findRecentByUserId(
		userId: string,
		limit: number = 5,
	): Promise<Prisma.ExpenseGetPayload<{ include: { category: true } }>[]> {
		return this.prisma.expense.findMany({
			where: { userId },
			include: { category: true },
			orderBy: { date: "desc" },
			take: limit,
		});
	}

	/**
	 * Calcula o total de despesas de um usuário em um período específico, agrupado por categoria.
	 * @param userId - O ID do usuário.
	 * @param startDate - Data de início do período.
	 * @param endDate - Data de fim do período.
	 * @returns Um array com o total de despesas por categoria.
	 */
	async getTotalExpensesByCategoryAndPeriod(
		userId: string,
		startDate: Date,
		endDate: Date,
	): Promise<
		{ categoryId: string; categoryName: string | null; total: number }[]
	> {
		const result = await this.prisma.expense.groupBy({
			by: ["categoryId"],
			where: {
				userId,
				date: {
					gte: startDate,
					lte: endDate,
				},
			},
			_sum: {
				amount: true,
			},
		});

		// Busca os nomes das categorias para enriquecer o resultado
		// Define o tipo esperado para os itens no resultado do groupBy
		type GroupByResultItem = {
			categoryId: string | null;
			_sum: { amount: Decimal | null };
		};

		const categoryIds = result
			.map((item: GroupByResultItem) => item.categoryId)
			// Adiciona o tipo para 'id' no filter
			.filter((id: string | null): id is string => id !== null); // Type guard para filtrar nulls

		const categories = await this.prisma.category.findMany({
			where: {
				id: { in: categoryIds },
				userId: userId, // Garante que a categoria pertence ao usuário
			},
			select: { id: true, name: true },
		});

		// Define o tipo para o item do map
		const categoryMap = new Map(
			categories.map((cat: { id: string; name: string }) => [cat.id, cat.name]),
		);

		return result.map((item: GroupByResultItem) => {
			// Converte o valor Decimal ou null para number
			let totalAmount: number;
			if (item._sum.amount instanceof Decimal) {
				totalAmount = Number(item._sum.amount.toNumber());
			} else if (item._sum.amount !== null) {
				totalAmount = Number(item._sum.amount);
			} else {
				totalAmount = 0;
			}

			return {
				categoryId: item.categoryId ?? "unknown", // Trata categoria nula
				categoryName: item.categoryId
					? (categoryMap.get(item.categoryId) ?? "Desconhecida")
					: "Sem Categoria",
				total: totalAmount,
			};
		});
	}
}

// Não exporta mais uma instância padrão.
