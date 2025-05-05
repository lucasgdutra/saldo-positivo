// src/services/ExpenseService.ts
import { PrismaClient, Expense, Prisma, Category } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { ExpenseRepository } from '../repositories/ExpenseRepository';
import UserService from './UserService';
import CategoryService from './CategoryService'; // Importa CategoryService
import { db as prismaInstance, PrismaClientWithExtensions } from '@/lib/db';

// Helper type para inferir o tipo do cliente de transação da instância estendida
type ExtendedTransactionClient = Parameters<Parameters<PrismaClientWithExtensions['$transaction']>[0]>[0];

/**
 * Camada de serviço para gerenciar despesas.
 * Contém a lógica de negócio relacionada às despesas, incluindo validação de categoria e atualização de saldo.
 */
class ExpenseService {
  private expenseRepository: ExpenseRepository;
  private userService: UserService;
  private categoryService: CategoryService; // Adiciona categoryService
  private prisma: PrismaClientWithExtensions;

  constructor(prisma: PrismaClientWithExtensions = prismaInstance) {
    this.prisma = prisma;
    // Instancia os repositórios e serviços necessários
    this.expenseRepository = new ExpenseRepository(this.prisma);
    this.userService = new UserService(this.prisma);
    this.categoryService = new CategoryService(this.prisma); // Instancia CategoryService
  }

  /**
   * Cria uma nova despesa, valida a categoria e atualiza o saldo do usuário atomicamente.
   * @param data - Dados da despesa (amount, description, date, userId, categoryId).
   * @returns A despesa criada (com a categoria incluída).
   * @throws Error se os dados forem inválidos, a categoria não existir/pertencer ao usuário ou a operação falhar.
   */
  async createExpense(data: { amount: number | Decimal; description?: string; date: Date; userId: string; categoryId: string }): Promise<Expense & { category: Category }> {
    const { amount, description, date, userId, categoryId } = data;
    const expenseAmount = new Decimal(amount);

    // Validações básicas
    if (expenseAmount.isNaN() || !expenseAmount.isFinite() || expenseAmount.isNegative() || expenseAmount.isZero()) {
      console.error(`ExpenseService: Tentativa de criar despesa com valor inválido (${amount}) para usuário ${userId}.`);
      throw new Error('O valor da despesa deve ser um número positivo.');
    }
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
        console.error(`ExpenseService: Data inválida fornecida para criação de despesa: ${date}`);
        throw new Error('Data inválida fornecida.');
    }
    if (!categoryId) {
        console.error(`ExpenseService: ID da categoria não fornecido para criação de despesa para usuário ${userId}.`);
        throw new Error('É necessário fornecer uma categoria.');
    }

    // Valida a categoria ANTES da transação principal para evitar trabalho desnecessário
    const category = await this.categoryService.getCategoryById(categoryId, userId);
    if (!category) {
        console.error(`ExpenseService: Categoria ID ${categoryId} não encontrada ou não pertence ao usuário ${userId}.`);
        throw new Error('Categoria inválida ou não encontrada.');
    }

    console.log(`ExpenseService: Iniciando criação de despesa para usuário ${userId}, valor: ${expenseAmount}, categoria: ${categoryId}`);

    return this.prisma.$transaction(async (tx: ExtendedTransactionClient) => {
      // Cria instância do repositório com o cliente de transação
      const expenseRepoTx = new ExpenseRepository(tx);

      // 1. Cria a despesa (a validação da categoria já foi feita)
      const createData: Prisma.ExpenseUncheckedCreateInput = {
        userId,
        amount: expenseAmount,
        description,
        date,
        categoryId,
      };
      console.log(`ExpenseService (TX): Criando registro de despesa...`, createData);
      const newExpense = await expenseRepoTx.create(createData);
      console.log(`ExpenseService (TX): Despesa ID ${newExpense.id} criada.`);

      // 2. Atualiza o saldo do usuário (subtrai o valor da despesa)
      console.log(`ExpenseService (TX): Atualizando saldo do usuário ${userId} (subtraindo ${expenseAmount}).`);
      // Passa 'tx' para garantir que a atualização do saldo ocorra na mesma transação
      await this.userService.updateUserBalance(userId, expenseAmount, 'subtract', tx);
      console.log(`ExpenseService (TX): Saldo do usuário ${userId} atualizado.`);

      // Retorna a despesa criada (pode incluir a categoria dependendo do repo)
      // Para garantir, buscamos novamente com a categoria incluída usando o repo da transação
       const createdExpenseWithCategory = await expenseRepoTx.findById(newExpense.id);
       if (!createdExpenseWithCategory) {
           // Isso não deveria acontecer
           console.error(`ExpenseService (TX): Falha ao re-buscar despesa ${newExpense.id} após criação.`);
           throw new Error("Falha ao buscar despesa recém-criada.");
       }
       // Garante que a categoria não seja null (já validamos antes)
       return createdExpenseWithCategory as Expense & { category: Category };

    });
  }

  /**
   * Busca uma despesa pelo ID, garantindo que pertence ao usuário.
   * @param id - O ID da despesa.
   * @param userId - O ID do usuário proprietário.
   * @returns A despesa encontrada (com categoria) ou null.
   * @throws Error se a despesa encontrada não pertencer ao usuário especificado.
   */
  // O tipo de retorno do repositório com include é Prisma.ExpenseGetPayload<{ include: { category: true } }>
  async getExpenseById(id: string, userId: string): Promise<Prisma.ExpenseGetPayload<{ include: { category: true } }> | null> {
    console.log(`ExpenseService: Buscando despesa ID ${id} para usuário ${userId}.`);
    const expense = await this.expenseRepository.findById(id);

    if (!expense) {
        console.warn(`ExpenseService: Despesa ${id} não encontrada.`);
        return null;
    }

    if (expense.userId !== userId) {
      console.error(`ExpenseService: Despesa ${id} encontrada, mas pertence a outro usuário (requisitado por ${userId}).`);
      // Lançar erro em vez de retornar null para indicar acesso não permitido
      throw new Error('Acesso não permitido.');
    }

     // A categoria é incluída, mas pode ser null se a relação for opcional (embora não pareça ser o caso aqui)
     // O tipo Prisma.ExpenseGetPayload já reflete isso.
    return expense;
  }

  /**
   * Lista todas as despesas de um usuário.
   * @param userId - O ID do usuário.
   * @returns Uma lista de despesas (com categorias incluídas).
   */
  async getExpensesByUser(userId: string): Promise<Prisma.ExpenseGetPayload<{ include: { category: true } }>[]> {
    console.log(`ExpenseService: Listando despesas para usuário ${userId}.`);
    // findByUserId já inclui categoria
    return this.expenseRepository.findByUserId(userId);
    // O tipo de retorno do repositório já está correto
  }

   /**
   * Lista despesas de um usuário dentro de um período.
   * @param userId - O ID do usuário.
   * @param startDate - Data de início.
   * @param endDate - Data de fim.
   * @returns Uma lista de despesas no período (com categorias incluídas).
   */
  async getExpensesByUserAndPeriod(userId: string, startDate: Date, endDate: Date): Promise<Prisma.ExpenseGetPayload<{ include: { category: true } }>[]> {
    console.log(`ExpenseService: Listando despesas para usuário ${userId} entre ${startDate.toISOString()} e ${endDate.toISOString()}.`);
     // findByUserIdAndPeriod já inclui categoria
    return this.expenseRepository.findByUserIdAndPeriod(userId, startDate, endDate);
    // O tipo de retorno do repositório já está correto
  }

  /**
   * Atualiza uma despesa existente, valida a categoria e ajusta o saldo do usuário atomicamente.
   * @param id - O ID da despesa a ser atualizada.
   * @param userId - O ID do usuário proprietário.
   * @param data - Novos dados (amount, description, date, categoryId).
   * @returns A despesa atualizada (com a categoria incluída).
   * @throws Error se os dados forem inválidos, a despesa/categoria não for encontrada ou a operação falhar.
   */
  async updateExpense(id: string, userId: string, data: { amount?: number | Decimal; description?: string | null; date?: Date; categoryId?: string }): Promise<Prisma.ExpenseGetPayload<{ include: { category: true } }>> {
    const { amount, description, date, categoryId } = data;
    let newAmount: Decimal | undefined = undefined;

    // Validações
    if (amount !== undefined) {
        newAmount = new Decimal(amount);
        if (newAmount.isNaN() || !newAmount.isFinite() || newAmount.isNegative() || newAmount.isZero()) {
            console.error(`ExpenseService: Tentativa de atualizar despesa ${id} com valor inválido (${amount}) para usuário ${userId}.`);
            throw new Error('O valor da despesa deve ser um número positivo.');
        }
    }
     if (date !== undefined && (!(date instanceof Date) || isNaN(date.getTime()))) {
        console.error(`ExpenseService: Data inválida fornecida para atualização da despesa ${id}: ${date}`);
        throw new Error('Data inválida fornecida.');
    }

    // Valida a nova categoria ANTES da transação, se fornecida
    if (categoryId) {
        const category = await this.categoryService.getCategoryById(categoryId, userId);
        if (!category) {
            console.error(`ExpenseService: Nova categoria ID ${categoryId} não encontrada ou não pertence ao usuário ${userId} para atualização da despesa ${id}.`);
            throw new Error('Nova categoria inválida ou não encontrada.');
        }
    }

    console.log(`ExpenseService: Iniciando atualização da despesa ID ${id} para usuário ${userId}.`);

    return this.prisma.$transaction(async (tx: ExtendedTransactionClient) => {
      const expenseRepoTx = new ExpenseRepository(tx);

      // 1. Busca a despesa original para verificar propriedade e obter valor antigo
      const originalExpense = await expenseRepoTx.findById(id);
      if (!originalExpense) {
        console.error(`ExpenseService (TX): Despesa ${id} não encontrada para atualização.`);
        throw new Error('Despesa não encontrada.');
      }
      if (originalExpense.userId !== userId) {
        console.error(`ExpenseService (TX): Usuário ${userId} tentando atualizar despesa ${id} de outro usuário.`);
        throw new Error('Acesso não permitido para atualizar esta despesa.');
      }
      const oldAmount = originalExpense.amount;
      console.log(`ExpenseService (TX): Despesa ${id} encontrada. Valor antigo: ${oldAmount}.`);

      // 2. Prepara os dados para atualização
      const updateData: Prisma.ExpenseUpdateInput = {};
      if (newAmount !== undefined) updateData.amount = newAmount;
      // Permite limpar a descrição passando string vazia ou null
      // Permite limpar a descrição passando null ou string vazia
      if (description !== undefined) updateData.description = description;
      if (date !== undefined) updateData.date = date;
      // Atualiza a relação da categoria usando 'connect'
      if (categoryId !== undefined) {
          updateData.category = { connect: { id: categoryId } };
      }

       if (Object.keys(updateData).length === 0) {
           console.warn(`ExpenseService (TX): Nenhuma alteração detectada para a despesa ${id}. Retornando original.`);
           // Busca novamente com categoria para retornar o tipo correto
            const currentExpenseWithCategory = await expenseRepoTx.findById(id);
             if (!currentExpenseWithCategory) { // A categoria pode ser null se a relação for opcional
                 throw new Error("Falha ao re-buscar despesa.");
             }
             return currentExpenseWithCategory; // Retorna o tipo correto do repositório
       }

      console.log(`ExpenseService (TX): Atualizando despesa ${id} com dados:`, updateData);
      const updatedExpense = await expenseRepoTx.update(id, updateData);
      console.log(`ExpenseService (TX): Despesa ${id} atualizada. Novo valor: ${updatedExpense.amount}.`);

      // 3. Calcula a diferença e ajusta o saldo do usuário
      if (newAmount !== undefined && !newAmount.equals(oldAmount)) {
        const difference = newAmount.sub(oldAmount); // difference > 0 se aumentou, < 0 se diminuiu
        console.log(`ExpenseService (TX): Diferença de valor: ${difference}. Ajustando saldo do usuário ${userId}.`);
        if (difference.isPositive()) {
          // Se o novo valor é maior, subtrai a diferença do saldo
          await this.userService.updateUserBalance(userId, difference, 'subtract', tx);
        } else {
          // Se o novo valor é menor, adiciona a diferença (que é negativa, então adiciona o valor absoluto) ao saldo
          await this.userService.updateUserBalance(userId, difference.abs(), 'add', tx);
        }
         console.log(`ExpenseService (TX): Saldo do usuário ${userId} ajustado.`);
      } else {
          console.log(`ExpenseService (TX): Valor da despesa ${id} não alterado. Saldo do usuário ${userId} não precisa de ajuste.`);
      }

      // Retorna a despesa atualizada com a categoria
       const finalExpenseWithCategory = await expenseRepoTx.findById(updatedExpense.id);
       if (!finalExpenseWithCategory) {
           console.error(`ExpenseService (TX): Falha ao re-buscar despesa ${updatedExpense.id} após atualização.`);
           throw new Error("Falha ao buscar despesa após atualização.");
       }
       // Retorna o tipo correto do repositório
       return finalExpenseWithCategory;
    });
  }

  /**
   * Deleta uma despesa e atualiza o saldo do usuário atomicamente.
   * @param id - O ID da despesa a ser deletada.
   * @param userId - O ID do usuário proprietário.
   * @returns A despesa deletada (sem a categoria).
   * @throws Error se a despesa não for encontrada ou a operação falhar.
   */
  async deleteExpense(id: string, userId: string): Promise<Expense> {
    console.log(`ExpenseService: Iniciando deleção da despesa ID ${id} para usuário ${userId}.`);

    return this.prisma.$transaction(async (tx: ExtendedTransactionClient) => {
      const expenseRepoTx = new ExpenseRepository(tx);

      // 1. Busca a despesa original para verificar propriedade e obter valor
      const expenseToDelete = await expenseRepoTx.findById(id);
      if (!expenseToDelete) {
        console.error(`ExpenseService (TX): Despesa ${id} não encontrada para deleção.`);
        throw new Error('Despesa não encontrada.');
      }
      if (expenseToDelete.userId !== userId) {
        console.error(`ExpenseService (TX): Usuário ${userId} tentando deletar despesa ${id} de outro usuário.`);
        throw new Error('Acesso não permitido para deletar esta despesa.');
      }
      const amountToDelete = expenseToDelete.amount;
      console.log(`ExpenseService (TX): Despesa ${id} encontrada. Valor: ${amountToDelete}.`);

      // 2. Deleta a despesa
      console.log(`ExpenseService (TX): Deletando despesa ${id}.`);
      const deletedExpenseData = await expenseRepoTx.delete(id); // delete retorna o objeto deletado
      console.log(`ExpenseService (TX): Despesa ${id} deletada.`);

      // 3. Atualiza o saldo do usuário (adiciona o valor da despesa de volta)
      console.log(`ExpenseService (TX): Atualizando saldo do usuário ${userId} (adicionando ${amountToDelete}).`);
      await this.userService.updateUserBalance(userId, amountToDelete, 'add', tx);
      console.log(`ExpenseService (TX): Saldo do usuário ${userId} atualizado.`);

      // Retorna o objeto que foi deletado (sem a categoria, pois o repo delete não inclui)
      return deletedExpenseData;
    });
  }

  /**
   * Busca o total de despesas do mês atual agrupadas por categoria para um usuário.
   * @param userId - O ID do usuário.
   * @returns Um array com objetos contendo o nome da categoria e o valor total gasto.
   * @throws Error se ocorrer um erro ao buscar os dados.
   */
  async getExpensesByCategoryForCurrentMonth(userId: string): Promise<{ name: string; value: number }[]> {
    console.log(`ExpenseService: Buscando despesas por categoria do mês atual para usuário ${userId}.`);
    try {
      // Buscar o mês atual
      const hoje = new Date();
      const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
      // Define o fim do mês para o último milissegundo do último dia
      const fimMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0, 23, 59, 59, 999);

      // Chama o método do repositório que já faz o trabalho pesado
      const expensesByCategory = await this.expenseRepository.getTotalExpensesByCategoryAndPeriod(userId, inicioMes, fimMes);

      // Mapeia o resultado para o formato esperado pela API
      const formattedData = expensesByCategory.map(item => ({
        name: item.categoryName || 'Sem Categoria', // Usa 'Sem Categoria' se categoryName for null
        value: item.total, // O repositório já retorna 'total' como number
      }));

      console.log(`ExpenseService: Despesas por categoria do mês atual encontradas para ${userId}.`);
      return formattedData;

    } catch (error) {
      console.error(`ExpenseService: Erro ao buscar despesas por categoria para ${userId}:`, error);
      // Lança um erro para ser tratado pela camada superior (API route)
      throw new Error('Erro ao buscar despesas por categoria.');
    }
  }
  /**
   * Busca as despesas mais recentes de um usuário.
   * @param userId - O ID do usuário.
   * @param limit - O número máximo de despesas a serem retornadas (padrão: 5).
   * @returns Uma lista das despesas mais recentes (com categorias incluídas).
   * @throws Error se ocorrer um erro ao buscar os dados.
   */
  async getRecentExpenses(userId: string, limit: number = 5): Promise<Prisma.ExpenseGetPayload<{ include: { category: true } }>[]> {
    console.log(`ExpenseService: Buscando ${limit} despesas recentes para usuário ${userId}.`);
    try {
      // Utiliza o método do repositório que já busca as recentes com limite
      const recentExpenses = await this.expenseRepository.findRecentByUserId(userId, limit);
      console.log(`ExpenseService: ${recentExpenses.length} despesas recentes encontradas para ${userId}.`);
      return recentExpenses;
    } catch (error) {
      console.error(`ExpenseService: Erro ao buscar despesas recentes para ${userId}:`, error);
      throw new Error('Erro ao buscar despesas recentes.');
    }
  }
/**
   * Busca despesas de um usuário por categoria e período, validando a categoria.
   * Usado especificamente para relatórios.
   * @param userId - O ID do usuário.
   * @param categoryId - O ID da categoria.
   * @param startDate - Data de início.
   * @param endDate - Data de fim.
   * @returns Um objeto contendo a categoria validada e a lista de despesas no período.
   * @throws Error se a categoria não for encontrada ou não pertencer ao usuário, ou erro no repositório.
   */
  async getExpensesByCategoryAndPeriodReport(
    userId: string,
    categoryId: string,
    startDate: Date,
    endDate: Date
  ): Promise<{ category: Category; expenses: Expense[] }> { // Retorna Expense básico
    console.log(`ExpenseService: Buscando despesas para relatório por categoria ${categoryId} e período [${startDate.toISOString()} - ${endDate.toISOString()}] para usuário ${userId}.`);

    try {
      // 1. Validar a categoria usando CategoryService
      const category = await this.categoryService.getCategoryById(categoryId, userId);
      if (!category) {
        console.warn(`ExpenseService: Categoria ID ${categoryId} não encontrada ou não pertence ao usuário ${userId} para relatório.`);
        // Lança erro para ser capturado pela API route e retornar 404 ou 403
        throw new Error('Categoria não encontrada ou acesso não permitido.');
      }
      console.log(`ExpenseService: Categoria ${category.name} (ID: ${categoryId}) validada para usuário ${userId}.`);

      // 2. Buscar todas as despesas do usuário no período
      // O método findByUserIdAndPeriod já inclui a categoria e ordena por data desc.
      // Precisaremos ordenar por data asc depois, se necessário para o agrupamento.
      const allExpensesInPeriod = await this.expenseRepository.findByUserIdAndPeriod(
        userId,
        startDate,
        endDate
      );

      // 3. Filtrar as despesas pela categoria específica
      const categoryExpenses = allExpensesInPeriod.filter(
        (expense) => expense.categoryId === categoryId
      );

      // 4. Ordenar por data ascendente para o agrupamento
      categoryExpenses.sort((a, b) => a.date.getTime() - b.date.getTime());


      console.log(`ExpenseService: ${categoryExpenses.length} despesas encontradas para o relatório da categoria ${categoryId}.`);
      // Retorna a categoria validada e as despesas filtradas (sem a categoria incluída, conforme tipo de retorno)
      // Mapeia para remover a propriedade 'category' se ela existir no tipo retornado por findByUserIdAndPeriod
      const expensesToReturn: Expense[] = categoryExpenses.map(({ category: _, ...rest }) => rest);
      return { category, expenses: expensesToReturn };

    } catch (error) {
        // Se o erro for o de categoria não encontrada, relança para tratamento específico na API
        if (error instanceof Error && error.message.includes('Categoria não encontrada')) {
            throw error;
        }
        // Loga outros erros e lança um erro genérico
        console.error(`ExpenseService: Erro ao buscar despesas por categoria e período para relatório (User: ${userId}, Cat: ${categoryId}):`, error);
        throw new Error('Erro ao buscar dados para o relatório de despesas por categoria.');
    }
  }
/**
   * Busca o total de despesas agrupadas por categoria para um usuário em um determinado período.
   * @param userId - O ID do usuário.
   * @param startDate - Data de início do período.
   * @param endDate - Data de fim do período.
   * @returns Um array com objetos contendo categoryId, categoryName e o total (como number).
   * @throws Error se ocorrer um erro ao buscar os dados.
   */
  async getGroupedExpensesByPeriod(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<{ categoryId: string | null; categoryName: string | null; total: number }[]> {
    console.log(`ExpenseService: Buscando despesas agrupadas por categoria no período [${startDate.toISOString()} - ${endDate.toISOString()}] para usuário ${userId}.`);
    try {
      // Chama o método do repositório que faz a agregação
      const groupedExpenses = await this.expenseRepository.getTotalExpensesByCategoryAndPeriod(
        userId,
        startDate,
        endDate
      );

      console.log(`ExpenseService: ${groupedExpenses.length} grupos de despesas por categoria encontrados para ${userId} no período.`);
      // O repositório já retorna o formato { categoryId, categoryName, total } com total como number.
      return groupedExpenses;

    } catch (error) {
      console.error(`ExpenseService: Erro ao buscar despesas agrupadas por categoria para ${userId} no período:`, error);
      throw new Error('Erro ao buscar despesas agrupadas por categoria.');
    }
  }
}


export default ExpenseService;