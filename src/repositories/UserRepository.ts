import { Balance, Prisma, PrismaClient, User } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library"; // Importa o tipo Decimal

// Define um tipo que representa o cliente Prisma ou um cliente de transação
// Usamos 'any' aqui para simplificar, pois a estrutura exata do cliente de transação pode variar
// e os tipos específicos 'RejectOnNotFound'/'RejectPerOperation' causaram erro.
// O importante é que ele tenha os métodos de modelo (user, balance, etc.).
type PrismaTransactionClient = any;

/**
 * Repository para gerenciar operações relacionadas a Usuários (Users) e seus Saldos (Balances) no banco de dados.
 * Encapsula toda a lógica de acesso a dados para as entidades User e Balance.
 */
export class UserRepository {
	private prisma: PrismaClient | PrismaTransactionClient; // Aceita PrismaClient ou cliente de transação

	constructor(prismaInstance: PrismaClient | PrismaTransactionClient) {
		this.prisma = prismaInstance;
	}

	/**
	 * Cria um novo usuário no banco de dados.
	 * @param data - Dados do usuário a ser criado (email, password, name).
	 * @returns O usuário criado.
	 */
	async create(data: Prisma.UserCreateInput): Promise<User> {
		// Idealmente, a senha seria hashada aqui ou em uma camada de serviço antes de salvar.
		return this.prisma.user.create({ data });
	}

	/**
	 * Busca um usuário pelo seu endereço de email.
	 * @param email - O email do usuário a ser buscado.
	 * @returns O usuário encontrado ou null se não existir.
	 */
	async findByEmail(email: string): Promise<User | null> {
		return this.prisma.user.findUnique({
			where: { email },
		});
	}

	/**
	 * Busca um usuário pelo seu ID.
	 * @param id - O ID do usuário a ser buscado.
	 * @returns O usuário encontrado ou null se não existir. Inclui o saldo.
	 */
	async findById(
		id: string,
	): Promise<(User & { balance: Balance | null }) | null> {
		return this.prisma.user.findUnique({
			where: { id },
			include: { balance: true }, // Inclui o saldo relacionado
		});
	}

	/**
	 * Atualiza os dados de um usuário existente.
	 * @param id - O ID do usuário a ser atualizado.
	 * @param data - Os dados a serem atualizados (ex: name, password).
	 * @returns O usuário atualizado.
	 */
	async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
		// Cuidado ao atualizar a senha. Hash deve ser aplicado se necessário.
		return this.prisma.user.update({
			where: { id },
			data,
		});
	}

	/**
	 * Remove um usuário do banco de dados.
	 * A remoção em cascata (onDelete: Cascade) removerá dados relacionados (categorias, despesas, receitas, saldo).
	 * @param id - O ID do usuário a ser removido.
	 * @returns O usuário removido.
	 */
	async delete(id: string): Promise<User> {
		return this.prisma.user.delete({
			where: { id },
		});
	}

	// --- Métodos relacionados ao Saldo (Balance) ---

	/**
	 * Busca o saldo de um usuário específico.
	 * @param userId - O ID do usuário cujo saldo será buscado.
	 * @returns O saldo encontrado ou null se não existir.
	 */
	async getBalance(userId: string): Promise<Balance | null> {
		return this.prisma.balance.findUnique({
			where: { userId },
		});
	}

	/**
	 * Cria ou atualiza o saldo de um usuário (upsert).
	 * Converte os valores numéricos para Decimal antes de salvar.
	 * @param userId - O ID do usuário cujo saldo será atualizado/criado.
	 * @param data - Os dados do saldo (totalAmount, totalRevenues, totalExpenses, referenceMonth).
	 * @returns O saldo criado ou atualizado.
	 */
	async upsertBalance(
		userId: string,
		data: {
			totalAmount: number;
			totalRevenues: number;
			totalExpenses: number;
			referenceMonth: Date;
		},
	): Promise<Balance> {
		const balanceData = {
			userId,
			totalAmount: new Decimal(data.totalAmount),
			totalRevenues: new Decimal(data.totalRevenues),
			totalExpenses: new Decimal(data.totalExpenses),
			referenceMonth: data.referenceMonth,
		};

		return this.prisma.balance.upsert({
			where: { userId },
			create: balanceData,
			update: balanceData, // Usa os mesmos dados para criar e atualizar
		});
	}

	/**
	 * Atualiza parcialmente o saldo de um usuário.
	 * Permite atualizar campos específicos do saldo sem fornecer todos os dados.
	 * Converte valores numéricos para Decimal.
	 * @param userId - O ID do usuário cujo saldo será atualizado.
	 * @param data - Os dados parciais a serem atualizados no saldo.
	 * @returns O saldo atualizado.
	 * @throws Error se o saldo do usuário não for encontrado.
	 */
	async updateBalancePartial(
		userId: string,
		data: Partial<{
			totalAmount: number;
			totalRevenues: number;
			totalExpenses: number;
			referenceMonth: Date;
		}>,
	): Promise<Balance> {
		const updateData: Prisma.BalanceUpdateInput = {};

		if (data.totalAmount !== undefined) {
			updateData.totalAmount = new Decimal(data.totalAmount);
		}
		if (data.totalRevenues !== undefined) {
			updateData.totalRevenues = new Decimal(data.totalRevenues);
		}
		if (data.totalExpenses !== undefined) {
			updateData.totalExpenses = new Decimal(data.totalExpenses);
		}
		if (data.referenceMonth !== undefined) {
			updateData.referenceMonth = data.referenceMonth;
		}

		// Verifica se há dados para atualizar
		if (Object.keys(updateData).length === 0) {
			// Se não houver dados, busca e retorna o saldo atual sem fazer update
			const currentBalance = await this.getBalance(userId);
			if (!currentBalance) {
				throw new Error(
					`Saldo não encontrado para o usuário com ID: ${userId}`,
				);
			}
			return currentBalance;
		}

		return this.prisma.balance.update({
			where: { userId },
			data: updateData,
		});
	}
}

// Não exporta mais uma instância padrão. A instância será criada onde for necessária.
