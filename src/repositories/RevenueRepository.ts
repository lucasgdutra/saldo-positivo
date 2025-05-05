import { PrismaClient, Revenue, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library'; // Importa o tipo Decimal
// Importa o tipo estendido e a instância global para referência
import { PrismaClientWithExtensions, db as prismaInstance } from '@/lib/db';

// Define um tipo que pode ser PrismaClient ou um cliente de transação Prisma
type PrismaTransactionClient = any; // Simplificado

/**
 * Repository para gerenciar operações relacionadas a Receitas (Revenues) no banco de dados.
 * Encapsula toda a lógica de acesso a dados para a entidade Revenue.
 */
export class RevenueRepository {
  // Aceita o cliente Prisma base, o estendido ou um cliente de transação
  private prisma: PrismaClient | PrismaClientWithExtensions | PrismaTransactionClient;

  constructor(prismaClient: PrismaClient | PrismaClientWithExtensions | PrismaTransactionClient) {
    this.prisma = prismaClient;
  }

  /**
   * Cria uma nova receita no banco de dados.
   * @param data - Dados da receita a ser criada. Inclui valor, descrição, data e ID do usuário.
   * @returns A receita criada.
   */
  async create(data: Prisma.RevenueUncheckedCreateInput): Promise<Revenue> {
    return this.prisma.revenue.create({ data });
  }

  /**
   * Busca uma receita pelo seu ID.
   * @param id - O ID da receita a ser buscada.
   * @returns A receita encontrada ou null se não existir.
   */
  async findById(id: string): Promise<Revenue | null> {
    return this.prisma.revenue.findUnique({
      where: { id },
    });
  }

  /**
   * Busca todas as receitas de um usuário específico.
   * @param userId - O ID do usuário cujas receitas serão buscadas.
   * @returns Uma lista de receitas do usuário.
   */
  async findByUserId(userId: string): Promise<Revenue[]> {
    return this.prisma.revenue.findMany({
      where: { userId },
      orderBy: { date: 'desc' }, // Ordena pela data mais recente
    });
  }

  /**
   * Atualiza uma receita existente.
   * @param id - O ID da receita a ser atualizada.
   * @param data - Os dados a serem atualizados na receita.
   * @returns A receita atualizada.
   */
  async update(id: string, data: Prisma.RevenueUpdateInput): Promise<Revenue> {
    return this.prisma.revenue.update({
      where: { id },
      data,
    });
  }

  /**
   * Remove uma receita do banco de dados.
   * @param id - O ID da receita a ser removida.
   * @returns A receita removida.
   */
  async delete(id: string): Promise<Revenue> {
    return this.prisma.revenue.delete({
      where: { id },
    });
  }

  /**
   * Busca receitas de um usuário dentro de um período específico.
   * @param userId - O ID do usuário.
   * @param startDate - Data de início do período.
   * @param endDate - Data de fim do período.
   * @returns Uma lista de receitas dentro do período especificado.
   */
  async findByUserIdAndPeriod(userId: string, startDate: Date, endDate: Date): Promise<Revenue[]> {
    return this.prisma.revenue.findMany({
      where: {
        userId,
        date: {
          gte: startDate, // Greater than or equal to startDate
          lte: endDate,   // Less than or equal to endDate
        },
      },
      orderBy: { date: 'desc' },
    });
  }

   /**
   * Busca as receitas recentes de um usuário.
   * @param userId - O ID do usuário.
   * @param limit - O número máximo de receitas a serem retornadas (padrão: 5).
   * @returns Uma lista das receitas mais recentes do usuário.
   */
   async findRecentByUserId(userId: string, limit: number = 5): Promise<Revenue[]> {
    return this.prisma.revenue.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
      take: limit,
    });
  }

  /**
   * Calcula o total de receitas de um usuário em um período específico.
   * @param userId - O ID do usuário.
   * @param startDate - Data de início do período.
   * @param endDate - Data de fim do período.
   * @returns O valor total das receitas no período.
   */
  async getTotalRevenueByPeriod(userId: string, startDate: Date, endDate: Date): Promise<number> {
    const result = await this.prisma.revenue.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const totalAmount = result._sum.amount;

    // Converte o valor Decimal ou null para number
    return totalAmount instanceof Decimal
      ? totalAmount.toNumber()
      : (totalAmount ?? 0);
  }
}

// Não exporta mais uma instância padrão.