import { Category, Prisma, PrismaClient } from "@prisma/client";
// Importa o tipo estendido e a instância global para referência, mas não a usa diretamente aqui
import { PrismaClientWithExtensions, db as prismaInstance } from "@/lib/db";

// Define um tipo que pode ser PrismaClient ou um cliente de transação Prisma
type PrismaTransactionClient = any; // Simplificado

/**
 * Repository para gerenciar operações relacionadas a Categorias (Categories) no banco de dados.
 * Encapsula toda a lógica de acesso a dados para a entidade Category.
 */
export class CategoryRepository {
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
	 * Cria uma nova categoria no banco de dados.
	 * @param data - Dados da categoria a ser criada. Inclui nome e ID do usuário.
	 * @returns A categoria criada.
	 */
	async create(data: Prisma.CategoryUncheckedCreateInput): Promise<Category> {
		return this.prisma.category.create({ data });
	}

	/**
	 * Busca uma categoria pelo seu ID.
	 * @param id - O ID da categoria a ser buscada.
	 * @param userId - O ID do usuário proprietário da categoria (para segurança).
	 * @returns A categoria encontrada ou null se não existir ou não pertencer ao usuário.
	 */
	async findById(id: string, userId: string): Promise<Category | null> {
		return this.prisma.category.findUnique({
			where: { id, userId }, // Garante que a categoria pertence ao usuário
		});
	}

	/**
	 * Busca todas as categorias de um usuário específico.
	 * @param userId - O ID do usuário cujas categorias serão buscadas.
	 * @returns Uma lista de categorias do usuário.
	 */
	async findByUserId(userId: string): Promise<Category[]> {
		return this.prisma.category.findMany({
			where: { userId },
			orderBy: { name: "asc" }, // Ordena pelo nome
		});
	}

	/**
	 * Atualiza uma categoria existente.
	 * @param id - O ID da categoria a ser atualizada.
	 * @param userId - O ID do usuário proprietário da categoria (para segurança).
	 * @param data - Os dados a serem atualizados na categoria (apenas o nome).
	 * @returns A categoria atualizada.
	 */
	async update(
		id: string,
		userId: string,
		data: Prisma.CategoryUpdateInput,
	): Promise<Category> {
		// Garante que apenas o nome pode ser atualizado e que a categoria pertence ao usuário
		return this.prisma.category.update({
			where: { id, userId },
			data: {
				name: data.name, // Permite apenas a atualização do nome
			},
		});
	}

	/**
	 * Remove uma categoria do banco de dados.
	 * Antes de remover, verifica se a categoria pertence ao usuário.
	 * @param id - O ID da categoria a ser removida.
	 * @param userId - O ID do usuário proprietário da categoria (para segurança).
	 * @returns A categoria removida.
	 * @throws Error se a categoria não for encontrada ou não pertencer ao usuário.
	 */
	async delete(id: string, userId: string): Promise<Category> {
		// Verifica se a categoria existe e pertence ao usuário antes de deletar
		const category = await this.findById(id, userId);
		if (!category) {
			throw new Error("Categoria não encontrada ou não pertence ao usuário.");
		}

		// Desvincula despesas associadas (opcional, dependendo da regra de negócio)
		// await this.prisma.expense.updateMany({
		//   where: { categoryId: id, userId: userId },
		//   data: { categoryId: null },
		// });

		return this.prisma.category.delete({
			where: { id }, // O where do findById já garantiu a propriedade
		});
	}
}

// Não exporta mais uma instância padrão.
