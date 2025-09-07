// src/services/CategoryService.ts
import { Category, Prisma, PrismaClient } from "@prisma/client";
import { PrismaClientWithExtensions, db as prismaInstance } from "@/lib/db";
import { CategoryRepository } from "../repositories/CategoryRepository";

/**
 * Camada de serviço para gerenciar categorias.
 * Contém a lógica de negócio relacionada às categorias.
 */
class CategoryService {
	private categoryRepository: CategoryRepository;
	private prisma: PrismaClientWithExtensions; // Usar o cliente estendido

	constructor(prisma: PrismaClientWithExtensions = prismaInstance) {
		this.prisma = prisma;
		this.categoryRepository = new CategoryRepository(this.prisma);
	}

	/**
	 * Cria uma nova categoria para um usuário.
	 * @param data - Dados da categoria (nome, cor, ícone, userId).
	 * @returns A categoria criada.
	 * @throws Error se o nome estiver vazio ou se já existir uma categoria com o mesmo nome (case-insensitive).
	 */
	async createCategory(data: {
		name: string;
		color?: string;
		icon?: string;
		userId: string;
	}): Promise<Category> {
		const { name, color, icon, userId } = data;
		const trimmedName = name?.trim(); // Usa optional chaining e trim

		if (!trimmedName) {
			console.error(
				`CategoryService: Tentativa de criar categoria sem nome para usuário ${userId}.`,
			);
			throw new Error("O nome da categoria não pode estar vazio.");
		}

		// Verifica se já existe uma categoria com o mesmo nome para o usuário (case-insensitive)
		const existingCategory = await this.prisma.category.findFirst({
			where: {
				userId: userId,
				name: {
					equals: trimmedName,
					mode: "insensitive", // Busca case-insensitive
				},
			},
		});

		if (existingCategory) {
			console.warn(
				`CategoryService: Categoria '${trimmedName}' já existe para o usuário ${userId}.`,
			);
			throw new Error(`Categoria '${trimmedName}' já existe.`);
		}

		console.log(
			`CategoryService: Criando categoria '${trimmedName}' para usuário ${userId}.`,
		);
		// O repositório espera Prisma.CategoryUncheckedCreateInput
		return this.categoryRepository.create({
			name: trimmedName,
			color: color || "#3B82F6",
			icon: icon || "folder",
			userId,
		});
	}

	/**
	 * Busca uma categoria pelo ID, garantindo que pertence ao usuário.
	 * @param id - O ID da categoria.
	 * @param userId - O ID do usuário proprietário.
	 * @returns A categoria encontrada ou null.
	 */
	async getCategoryById(id: string, userId: string): Promise<Category | null> {
		console.log(
			`CategoryService: Buscando categoria ID ${id} para usuário ${userId}.`,
		);
		return this.categoryRepository.findById(id, userId);
	}

	/**
	 * Lista todas as categorias de um usuário.
	 * @param userId - O ID do usuário.
	 * @returns Uma lista de categorias.
	 */
	async getCategoriesByUser(userId: string): Promise<Category[]> {
		console.log(`CategoryService: Listando categorias para usuário ${userId}.`);
		return this.categoryRepository.findByUserId(userId);
	}

	/**
	 * Atualiza uma categoria existente.
	 * @param id - O ID da categoria a ser atualizada.
	 * @param userId - O ID do usuário proprietário.
	 * @param data - Novos dados (nome, cor, ícone).
	 * @returns A categoria atualizada.
	 * @throws Error se o nome estiver vazio, se a categoria não for encontrada, ou se já existir outra categoria com o novo nome (case-insensitive).
	 */
	async updateCategory(
		id: string,
		userId: string,
		data: { name: string; color?: string; icon?: string },
	): Promise<Category> {
		const { name, color, icon } = data;
		const trimmedName = name?.trim();

		if (!trimmedName) {
			console.error(
				`CategoryService: Tentativa de atualizar categoria ${id} sem nome para usuário ${userId}.`,
			);
			throw new Error("O nome da categoria não pode estar vazio.");
		}

		// Verifica se a categoria existe e pertence ao usuário
		const existingCategory = await this.getCategoryById(id, userId);
		if (!existingCategory) {
			console.error(
				`CategoryService: Categoria ${id} não encontrada para atualização pelo usuário ${userId}.`,
			);
			throw new Error("Categoria não encontrada ou não pertence ao usuário.");
		}

		// Verifica se já existe OUTRA categoria com o mesmo nome para o usuário (case-insensitive)
		const conflictingCategory = await this.prisma.category.findFirst({
			where: {
				userId: userId,
				name: {
					equals: trimmedName,
					mode: "insensitive",
				},
				id: {
					not: id, // Exclui a própria categoria que está sendo atualizada
				},
			},
		});

		if (conflictingCategory) {
			console.warn(
				`CategoryService: Já existe outra categoria '${trimmedName}' para o usuário ${userId}.`,
			);
			throw new Error(`Já existe outra categoria com o nome '${trimmedName}'.`);
		}

		console.log(
			`CategoryService: Atualizando categoria ID ${id} para usuário ${userId} com nome '${trimmedName}'.`,
		);
		// O repositório espera Prisma.CategoryUpdateInput
		const updateData: any = { name: trimmedName };
		if (color !== undefined) updateData.color = color;
		if (icon !== undefined) updateData.icon = icon;

		return this.categoryRepository.update(id, userId, updateData);
	}

	/**
	 * Deleta uma categoria, verificando antes se ela está em uso por despesas ou receitas.
	 * @param id - O ID da categoria a ser deletada.
	 * @param userId - O ID do usuário proprietário.
	 * @returns A categoria deletada.
	 * @throws Error se a categoria não for encontrada, não pertencer ao usuário, ou estiver em uso.
	 */
	async deleteCategory(id: string, userId: string): Promise<Category> {
		console.log(
			`CategoryService: Tentando deletar categoria ID ${id} para usuário ${userId}.`,
		);

		// 1. Verifica se a categoria existe e pertence ao usuário
		const category = await this.getCategoryById(id, userId);
		if (!category) {
			console.error(
				`CategoryService: Categoria ${id} não encontrada para deleção pelo usuário ${userId}.`,
			);
			throw new Error("Categoria não encontrada ou não pertence ao usuário.");
		}

		// 2. Verifica se a categoria está sendo usada em Despesas
		const expenseCount = await this.prisma.expense.count({
			where: {
				categoryId: id,
				userId: userId, // Garante que estamos contando apenas as despesas do usuário
			},
		});

		if (expenseCount > 0) {
			console.warn(
				`CategoryService: Categoria ${id} ('${category.name}') está em uso por ${expenseCount} despesa(s) do usuário ${userId}. Deleção bloqueada.`,
			);
			throw new Error(
				`Não é possível deletar a categoria '${category.name}' pois ela está associada a ${expenseCount} despesa(s).`,
			);
		}

		// 3. Receitas não estão associadas a categorias neste schema.
		// A verificação de revenueCount foi removida.

		// 4. Se não estiver em uso por despesas, deleta a categoria
		console.log(
			`CategoryService: Categoria ${id} ('${category.name}') não está em uso. Procedendo com a deleção para usuário ${userId}.`,
		);
		return this.categoryRepository.delete(id, userId);
	}
}

export default CategoryService;
