// src/services/RevenueService.ts
import { PrismaClient, Revenue, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { RevenueRepository } from '../repositories/RevenueRepository';
import UserService from './UserService'; // Importa o UserService
import { db as prismaInstance, PrismaClientWithExtensions } from '@/lib/db';

// Helper type para inferir o tipo do cliente de transação da instância estendida
type TransactionClient = Parameters<Parameters<PrismaClientWithExtensions['$transaction']>[0]>[0];

/**
 * Camada de serviço para gerenciar receitas.
 * Contém a lógica de negócio relacionada às receitas, incluindo atualização de saldo.
 */
class RevenueService {
  private revenueRepository: RevenueRepository;
  private userService: UserService;
  private prisma: PrismaClientWithExtensions;

  constructor(prisma: PrismaClientWithExtensions = prismaInstance) {
    this.prisma = prisma;
    // Instancia os repositórios e serviços necessários passando o cliente Prisma
    this.revenueRepository = new RevenueRepository(this.prisma);
    this.userService = new UserService(this.prisma); // UserService também precisa da instância Prisma
  }

  /**
   * Cria uma nova receita e atualiza o saldo do usuário atomicamente.
   * @param data - Dados da receita (amount, description, date, userId).
   * @returns A receita criada.
   * @throws Error se os dados forem inválidos ou a operação falhar.
   */
  async createRevenue(data: { amount: number | Decimal; description?: string; date: Date; userId: string }): Promise<Revenue> {
    const { amount, description, date, userId } = data;
    const revenueAmount = new Decimal(amount);

    if (revenueAmount.isNaN() || !revenueAmount.isFinite() || revenueAmount.isNegative() || revenueAmount.isZero()) {
      console.error(`RevenueService: Tentativa de criar receita com valor inválido (${amount}) para usuário ${userId}.`);
      throw new Error('O valor da receita deve ser um número positivo.');
    }
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
        console.error(`RevenueService: Data inválida fornecida para criação de receita: ${date}`);
        throw new Error('Data inválida fornecida.');
    }


    console.log(`RevenueService: Iniciando criação de receita para usuário ${userId}, valor: ${revenueAmount}`);

    return this.prisma.$transaction(async (tx: TransactionClient) => {
      // Cria instância do repositório com o cliente de transação
      const revenueRepoTx = new RevenueRepository(tx);
      // Não cria nova instância de UserService, usa a existente (this.userService)
      // e passa 'tx' para o método updateUserBalance

      // 1. Cria a receita
      const createData: Prisma.RevenueUncheckedCreateInput = {
        userId,
        amount: revenueAmount,
        description,
        date,
      };
      console.log(`RevenueService (TX): Criando registro de receita...`, createData);
      const newRevenue = await revenueRepoTx.create(createData);
      console.log(`RevenueService (TX): Receita ID ${newRevenue.id} criada.`);

      // 2. Atualiza o saldo do usuário (recalcula totais)
      console.log(`RevenueService (TX): Recalculando saldo do usuário ${userId}.`);
      await this.userService.updateUserBalance(userId, tx); // Passa tx aqui
      console.log(`RevenueService (TX): Saldo do usuário ${userId} recalculado.`);

      return newRevenue;
    });
  }

  /**
   * Busca uma receita pelo ID, garantindo que pertence ao usuário.
   * @param id - O ID da receita.
   * @param userId - O ID do usuário proprietário.
   * @returns A receita encontrada ou null.
   * @throws Error se a receita encontrada não pertencer ao usuário especificado.
   */
  async getRevenueById(id: string, userId: string): Promise<Revenue | null> {
    console.log(`RevenueService: Buscando receita ID ${id} para usuário ${userId}.`);
    const revenue = await this.revenueRepository.findById(id);

    if (revenue && revenue.userId !== userId) {
      console.error(`RevenueService: Receita ${id} encontrada, mas pertence a outro usuário (requisitado por ${userId}).`);
      throw new Error('Receita não encontrada ou acesso não permitido.');
    }
     if (!revenue) {
        console.warn(`RevenueService: Receita ${id} não encontrada.`);
        return null;
     }

    return revenue;
  }

  /**
   * Lista todas as receitas de um usuário.
   * @param userId - O ID do usuário.
   * @returns Uma lista de receitas.
   */
  async getRevenuesByUser(userId: string): Promise<Revenue[]> {
    console.log(`RevenueService: Listando receitas para usuário ${userId}.`);
    return this.revenueRepository.findByUserId(userId);
  }

   /**
   * Lista receitas de um usuário dentro de um período.
   * @param userId - O ID do usuário.
   * @param startDate - Data de início.
   * @param endDate - Data de fim.
   * @returns Uma lista de receitas no período.
   */
  async getRevenuesByUserAndPeriod(userId: string, startDate: Date, endDate: Date): Promise<Revenue[]> {
    console.log(`RevenueService: Listando receitas para usuário ${userId} entre ${startDate.toISOString()} e ${endDate.toISOString()}.`);
    return this.revenueRepository.findByUserIdAndPeriod(userId, startDate, endDate);
  }

  /**
   * Atualiza uma receita existente e ajusta o saldo do usuário atomicamente.
   * @param id - O ID da receita a ser atualizada.
   * @param userId - O ID do usuário proprietário.
   * @param data - Novos dados (amount, description, date).
   * @returns A receita atualizada.
   * @throws Error se os dados forem inválidos, a receita não for encontrada ou a operação falhar.
   */
  async updateRevenue(id: string, userId: string, data: { amount?: number | Decimal; description?: string; date?: Date }): Promise<Revenue> {
    const { amount, description, date } = data;
    let newAmount: Decimal | undefined = undefined;

    if (amount !== undefined) {
        newAmount = new Decimal(amount);
        if (newAmount.isNaN() || !newAmount.isFinite() || newAmount.isNegative() || newAmount.isZero()) {
            console.error(`RevenueService: Tentativa de atualizar receita ${id} com valor inválido (${amount}) para usuário ${userId}.`);
            throw new Error('O valor da receita deve ser um número positivo.');
        }
    }
     if (date !== undefined && (!(date instanceof Date) || isNaN(date.getTime()))) {
        console.error(`RevenueService: Data inválida fornecida para atualização da receita ${id}: ${date}`);
        throw new Error('Data inválida fornecida.');
    }


    console.log(`RevenueService: Iniciando atualização da receita ID ${id} para usuário ${userId}.`);

    return this.prisma.$transaction(async (tx: TransactionClient) => {
      // Cria instância do repositório com o cliente de transação
      const revenueRepoTx = new RevenueRepository(tx);
      // Não cria nova instância de UserService

      // 1. Busca a receita original para verificar propriedade e obter valor antigo
      const originalRevenue = await revenueRepoTx.findById(id);
      if (!originalRevenue) {
        console.error(`RevenueService (TX): Receita ${id} não encontrada para atualização.`);
        throw new Error('Receita não encontrada.');
      }
      if (originalRevenue.userId !== userId) {
        console.error(`RevenueService (TX): Usuário ${userId} tentando atualizar receita ${id} de outro usuário.`);
        throw new Error('Acesso não permitido para atualizar esta receita.');
      }
      const oldAmount = originalRevenue.amount;
      console.log(`RevenueService (TX): Receita ${id} encontrada. Valor antigo: ${oldAmount}.`);

      // 2. Prepara os dados para atualização
      const updateData: Prisma.RevenueUpdateInput = {};
      if (newAmount !== undefined) updateData.amount = newAmount;
      if (description !== undefined) updateData.description = description; // Permite string vazia para limpar
      if (date !== undefined) updateData.date = date;

       if (Object.keys(updateData).length === 0) {
           console.warn(`RevenueService (TX): Nenhuma alteração detectada para a receita ${id}. Retornando original.`);
           return originalRevenue; // Nenhuma alteração necessária
       }

      console.log(`RevenueService (TX): Atualizando receita ${id} com dados:`, updateData);
      const updatedRevenue = await revenueRepoTx.update(id, updateData);
      console.log(`RevenueService (TX): Receita ${id} atualizada. Novo valor: ${updatedRevenue.amount}.`);

      // 3. Atualiza o saldo do usuário (recalcula totais se houve mudança no valor)
      if (newAmount !== undefined && !newAmount.equals(oldAmount)) {
        console.log(`RevenueService (TX): Valor da receita alterado. Recalculando saldo do usuário ${userId}.`);
        await this.userService.updateUserBalance(userId, tx);
        console.log(`RevenueService (TX): Saldo do usuário ${userId} recalculado.`);
      } else {
          console.log(`RevenueService (TX): Valor da receita ${id} não alterado. Saldo do usuário ${userId} não precisa de ajuste.`);
      }

      return updatedRevenue;
    });
  }

  /**
   * Deleta uma receita e atualiza o saldo do usuário atomicamente.
   * @param id - O ID da receita a ser deletada.
   * @param userId - O ID do usuário proprietário.
   * @returns A receita deletada.
   * @throws Error se a receita não for encontrada ou a operação falhar.
   */
  async deleteRevenue(id: string, userId: string): Promise<Revenue> {
    console.log(`RevenueService: Iniciando deleção da receita ID ${id} para usuário ${userId}.`);

    return this.prisma.$transaction(async (tx: TransactionClient) => {
      // Cria instância do repositório com o cliente de transação
      const revenueRepoTx = new RevenueRepository(tx);
       // Não cria nova instância de UserService

      // 1. Busca a receita original para verificar propriedade e obter valor
      const revenueToDelete = await revenueRepoTx.findById(id);
      if (!revenueToDelete) {
        console.error(`RevenueService (TX): Receita ${id} não encontrada para deleção.`);
        throw new Error('Receita não encontrada.');
      }
      if (revenueToDelete.userId !== userId) {
        console.error(`RevenueService (TX): Usuário ${userId} tentando deletar receita ${id} de outro usuário.`);
        throw new Error('Acesso não permitido para deletar esta receita.');
      }
      const amountToDelete = revenueToDelete.amount;
      console.log(`RevenueService (TX): Receita ${id} encontrada. Valor: ${amountToDelete}.`);

      // 2. Deleta a receita
      console.log(`RevenueService (TX): Deletando receita ${id}.`);
      await revenueRepoTx.delete(id);
      console.log(`RevenueService (TX): Receita ${id} deletada.`);

      // 3. Atualiza o saldo do usuário (recalcula totais)
      console.log(`RevenueService (TX): Recalculando saldo do usuário ${userId} após deleção.`);
      await this.userService.updateUserBalance(userId, tx);
      console.log(`RevenueService (TX): Saldo do usuário ${userId} recalculado.`);

      return revenueToDelete; // Retorna o objeto que foi deletado
    });
  }
  /**
   * Busca as receitas mais recentes de um usuário.
   * @param userId - O ID do usuário.
   * @param limit - O número máximo de receitas a serem retornadas (padrão: 5).
   * @returns Uma lista das receitas mais recentes.
   * @throws Error se ocorrer um erro ao buscar os dados.
   */
  async getRecentRevenues(userId: string, limit: number = 5): Promise<Revenue[]> {
    console.log(`RevenueService: Buscando ${limit} receitas recentes para usuário ${userId}.`);
    try {
      // Utiliza o método do repositório que já busca as recentes com limite
      const recentRevenues = await this.revenueRepository.findRecentByUserId(userId, limit);
      console.log(`RevenueService: ${recentRevenues.length} receitas recentes encontradas para ${userId}.`);
      return recentRevenues;
    } catch (error) {
      console.error(`RevenueService: Erro ao buscar receitas recentes para ${userId}:`, error);
      throw new Error('Erro ao buscar receitas recentes.');
    }
  }
}

export default RevenueService;