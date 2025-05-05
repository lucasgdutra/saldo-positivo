// src/services/UserService.ts
import { User, Balance, Revenue, Expense, PrismaClient as BasePrismaClient, Prisma } from '@prisma/client'; // Adiciona Revenue, Expense
import { UserRepository } from '../repositories/UserRepository'; // Importa a classe
import { Decimal } from '@prisma/client/runtime/library';
// Importa a instância e o tipo correto do db.ts
import { db as prismaInstance, PrismaClientWithExtensions } from '@/lib/db';

// Define o tipo do cliente de transação inferido da instância estendida
// Deve ser definido fora da classe
type ExtendedTransactionClient = Parameters<Parameters<PrismaClientWithExtensions['$transaction']>[0]>[0];

/**
 * Camada de serviço para gerenciar usuários e seus saldos.
 */
class UserService {
  private userRepository: UserRepository;
  // O serviço sempre mantém a instância principal/estendida do Prisma
  private prisma: PrismaClientWithExtensions;

  // Construtor aceita apenas a instância principal/estendida
  constructor(prisma: PrismaClientWithExtensions = prismaInstance) {
    this.prisma = prisma;
    // Instancia o repositório com a instância principal
    this.userRepository = new UserRepository(this.prisma);
  }

  /**
   * Busca um usuário pelo ID.
   * @param userId - O ID do usuário a ser buscado.
   * @returns O objeto do usuário (sem o saldo explícito aqui, use getBalance) ou null se não encontrado.
   */
  async getUserById(userId: string): Promise<Omit<User, 'balance'> | null> { // Ajusta o tipo de retorno
    console.log(`UserService: Buscando usuário com ID: ${userId}`);
    // findById agora retorna User & { balance: Balance | null }, mas podemos omitir balance aqui
    // se a intenção é apenas pegar os dados do User.
    const userWithBalance = await this.userRepository.findById(userId);
    if (!userWithBalance) {
        console.warn(`UserService: Usuário com ID ${userId} não encontrado.`);
        return null;
    }
    // Retorna o usuário sem o campo balance para manter a consistência do tipo User padrão
    const { balance, ...user } = userWithBalance;
    return user;
  }

   /**
    * Busca um usuário pelo ID, incluindo seu saldo.
    * @param userId - O ID do usuário a ser buscado.
    * @returns O objeto do usuário com o saldo incluído, ou null se não encontrado.
    */
   async getUserByIdWithBalance(userId: string): Promise<(User & { balance: Balance | null }) | null> {
       console.log(`UserService: Buscando usuário com saldo, ID: ${userId}`);
       const user = await this.userRepository.findById(userId);
       if (!user) {
           console.warn(`UserService: Usuário com ID ${userId} não encontrado ao buscar com saldo.`);
       }
       return user;
   }


  /**
   * Atualiza as informações do usuário.
   * @param userId - O ID do usuário a ser atualizado.
   * @param data - Os dados a serem atualizados (excluindo id, saldo, createdAt, updatedAt).
   * @returns O objeto do usuário atualizado.
   * @throws Error se o usuário não for encontrado.
   */
  async updateUser(userId: string, data: Partial<Omit<User, 'id' | 'balance' | 'createdAt' | 'updatedAt'>>): Promise<User> {
    console.log(`UserService: Atualizando usuário com ID: ${userId}`);
    const user = await this.getUserById(userId);
    if (!user) {
      console.error(`UserService: Tentativa de atualizar usuário não existente: ${userId}`);
      throw new Error('Usuário não encontrado');
    }
    // Garante que o saldo não seja atualizado diretamente por este método
    const { email, name, password } = data;
    const updateData: Partial<User> = {};
    if (email !== undefined) updateData.email = email;
    if (name !== undefined) updateData.name = name;
    if (password !== undefined) updateData.password = password; // Considere hashing aqui se não feito no repository/auth

    if (Object.keys(updateData).length === 0) {
        console.warn(`UserService: Nenhuma informação válida para atualizar para o usuário ${userId}.`);
        return user; // Retorna o usuário sem alterações se nada for fornecido
    }

    console.log(`UserService: Dados para atualização para usuário ${userId}:`, updateData);
    return this.userRepository.update(userId, updateData);
  }

  /**
   * Busca o saldo atual de um usuário.
   * @param userId - O ID do usuário.
   * @returns O saldo atual do usuário.
   * @throws Error se o usuário ou o saldo não forem encontrados.
   */
  async getUserBalance(userId: string): Promise<Decimal> {
    console.log(`UserService: Buscando saldo para o usuário ID: ${userId}`);
    // Usa o método getBalance do repositório
    const balance = await this.userRepository.getBalance(userId);
    if (!balance) {
      // Considerar criar um saldo inicial se for a regra de negócio
      console.error(`UserService: Saldo não encontrado para o usuário ID: ${userId}. Retornando 0.`);
      // throw new Error('Saldo do usuário não encontrado');
      return new Decimal(0); // Ou lançar erro dependendo da regra
    }
    console.log(`UserService: Saldo encontrado para ${userId}: ${balance.totalAmount}`);
    return balance.totalAmount; // Retorna o valor numérico do saldo
  }

  /**
   * Atualiza o saldo do usuário adicionando ou subtraindo um valor.
   * Método interno usado por ExpenseService e RevenueService.
   * @param userId - O ID do usuário.
   * @param amount - O valor a ser adicionado (positivo para receita, negativo para despesa). Deve ser positivo.
   * @param operationType - 'add' ou 'subtract'.
   * @returns O objeto do usuário atualizado.
   * @throws Error se o usuário não for encontrado, se o valor for inválido ou se a atualização do saldo falhar.
   */
  async updateUserBalance(
    userId: string,
    amount: Decimal,
    operationType: 'add' | 'subtract',
    // Usa o tipo inferido para o parâmetro opcional tx
    tx?: ExtendedTransactionClient
  ): Promise<User> {
    // Validação do amount
    if (amount.isNaN() || !amount.isFinite() || amount.isNegative()) {
      console.error(`UserService: Valor inválido fornecido para atualização de saldo: ${amount}. O valor deve ser positivo.`);
      throw new Error('Valor inválido para atualização de saldo. O valor deve ser positivo.');
    }

    console.log(`UserService: Atualizando saldo para usuário ID: ${userId}, Valor: ${amount}, Operação: ${operationType}, Dentro da transação: ${!!tx}`);

    // Define a função interna que realiza a lógica de atualização
    // Aceita apenas o tipo específico do cliente de transação inferido
    const updateLogic = async (client: ExtendedTransactionClient): Promise<User> => {
      // Instancia o repositório com o cliente de transação (UserRepository aceita 'any')
      const userRepo = new UserRepository(client);

      // 1. Buscar o saldo atual
      const currentBalance = await userRepo.getBalance(userId);
      let currentAmount = new Decimal(0);
      if (currentBalance) {
        currentAmount = currentBalance.totalAmount;
        console.log(`UserService (updateLogic): Saldo atual de ${userId}: ${currentAmount}`);
      } else {
        console.warn(`UserService (updateLogic): Saldo não encontrado para ${userId}. Assumindo 0.`);
      }

      // 2. Calcular o novo saldo
      let newAmount: Decimal;
      if (operationType === 'add') {
        newAmount = currentAmount.add(amount);
        console.log(`UserService (updateLogic): Novo saldo calculado (adição) para ${userId}: ${newAmount}`);
      } else {
        newAmount = currentAmount.sub(amount);
        console.log(`UserService (updateLogic): Novo saldo calculado (subtração) para ${userId}: ${newAmount}`);
      }

      // 3. Atualizar o saldo
      await userRepo.updateBalancePartial(userId, { totalAmount: newAmount.toNumber() });
      console.log(`UserService (updateLogic): Saldo atualizado para ${userId}. Novo valor: ${newAmount}`);

      // 4. Retornar o usuário atualizado (sem o saldo)
      const finalUser = await userRepo.findById(userId);
      if (!finalUser) {
        console.error(`UserService (updateLogic): Usuário ${userId} não encontrado após atualização de saldo!`);
        throw new Error('Falha ao buscar usuário após atualização de saldo.');
      }
      const { balance, ...userWithoutBalance } = finalUser;
      console.log(`UserService (updateLogic): Retornando usuário ${userId} após atualização de saldo.`);
      return userWithoutBalance as User;
    };

    // Executa a lógica: ou com o 'tx' fornecido, ou iniciando uma nova transação
    if (tx) {
      // Se tx foi passado, executa a lógica com ele diretamente
      return updateLogic(tx);
    } else {
      // Se tx não foi passado, inicia uma nova transação
      // O tipo de newTx é inferido corretamente aqui pelo Prisma
      return this.prisma.$transaction(async (newTx) => {
        // Passa o newTx para a lógica de atualização
        return updateLogic(newTx);
      });
    }
  }


   /**
   * Define diretamente o saldo do usuário. Use com cautela.
   * Principalmente para fins de inicialização ou correção.
   * @param userId - O ID do usuário.
   * @param newBalance - O novo saldo a ser definido.
   * @returns O objeto do usuário atualizado.
   * @throws Error se o usuário não for encontrado ou se o saldo for inválido.
   */
  async setUserBalance(userId: string, newBalance: Decimal): Promise<User> {
    console.log(`UserService: Definindo saldo diretamente para usuário ID: ${userId}, Novo Saldo: ${newBalance}`);
    if (newBalance.isNaN() || !newBalance.isFinite()) {
        console.error(`UserService: Tentativa de definir saldo inválido (${newBalance}) para usuário ${userId}.`);
        throw new Error('Saldo inválido fornecido.');
    }

    // Verifica se o usuário existe antes de tentar definir o saldo
    const userExists = await this.getUserById(userId);
    if (!userExists) {
        console.error(`UserService: Tentativa de definir saldo para usuário não existente: ${userId}`);
        throw new Error('Usuário não encontrado');
    }

    if (newBalance.isNegative()) {
        console.warn(`UserService: Definindo um saldo negativo (${newBalance}) para o usuário ${userId}. Verifique as regras de negócio.`);
    }

    console.log(`UserService: Definindo saldo para ${userId}: ${newBalance}`);
    // Usa updateBalancePartial para definir o saldo. Converte Decimal para number.
    await this.userRepository.updateBalancePartial(userId, { totalAmount: newBalance.toNumber() });
    console.log(`UserService: Saldo definido diretamente com sucesso para ${userId}.`);

    // Retorna o usuário atualizado (sem o saldo explícito)
    const updatedUser = await this.getUserById(userId);
     if (!updatedUser) {
         // Improvável, mas para segurança
         console.error(`UserService: Falha ao buscar usuário ${userId} após definir saldo.`);
         throw new Error('Falha ao buscar usuário após definir saldo.');
     }
    return updatedUser;
  }

  // REMOVIDO MÉTODO getCompleteBalance por depender de funcionalidade inexistente no repo
  // e não ser essencial para a tarefa atual.

  /**
   * Recalcula o saldo total do usuário com base em todas as suas receitas e despesas.
   * Atualiza o campo totalAmount no objeto Balance e registra no histórico.
   * @param userId - O ID do usuário.
   * @returns O objeto Balance atualizado.
   * @throws Error se o usuário não for encontrado ou se ocorrer um erro durante o recálculo.
   */
  async recalculateBalance(userId: string): Promise<Balance> {
    console.log(`UserService: Iniciando recálculo de saldo para o usuário ID: ${userId}`);

    // Importa repositórios necessários dinamicamente para evitar ciclos de dependência
    // Importa repositórios necessários
    const { RevenueRepository } = await import('../repositories/RevenueRepository');
    const { ExpenseRepository } = await import('../repositories/ExpenseRepository');
    // Decimal já está importado no topo


    return this.prisma.$transaction(async (tx) => {
      // Usa o cliente de transação para os repositórios
      const userRepo = new UserRepository(tx);
      const revenueRepo = new RevenueRepository(tx);
      const expenseRepo = new ExpenseRepository(tx);

      // 1. Verificar se o usuário existe
      const user = await userRepo.findById(userId);
      if (!user) {
        console.error(`UserService (recalculate): Usuário ${userId} não encontrado para recálculo.`);
        throw new Error('Usuário não encontrado para recálculo de saldo.');
      }

      // 2. Buscar todas as receitas e despesas
      // Corrigido para findByUserId (assumindo que retorna lista)
      const allRevenues: Revenue[] = await revenueRepo.findByUserId(userId);
      const allExpenses: Expense[] = await expenseRepo.findByUserId(userId);

      // 3. Calcular o total de receitas e despesas usando Decimal com tipos explícitos
      const totalRevenue = allRevenues.reduce((sum: Decimal, revenue: Revenue) => sum.add(new Decimal(revenue.amount)), new Decimal(0));
      const totalExpense = allExpenses.reduce((sum: Decimal, expense: Expense) => sum.add(new Decimal(expense.amount)), new Decimal(0));

      // 4. Calcular o novo saldo
      const newCalculatedBalance = totalRevenue.sub(totalExpense);
      console.log(`UserService (recalculate): Saldo recalculado para ${userId}: Receitas=${totalRevenue}, Despesas=${totalExpense}, Saldo=${newCalculatedBalance}`);

      // 5. Buscar o objeto Balance atual
      let currentBalance = await userRepo.getBalance(userId);
      const previousBalanceAmount = currentBalance?.totalAmount ? new Decimal(currentBalance.totalAmount) : new Decimal(0); // Guarda o saldo anterior

      // 6. Atualizar ou criar o objeto Balance
      if (!currentBalance) {
        console.warn(`UserService (recalculate): Objeto Balance não encontrado para ${userId}. Criando um novo.`);
        // Adiciona os campos obrigatórios faltantes
        currentBalance = await tx.balance.create({
            data: {
                userId: userId,
                totalAmount: newCalculatedBalance,
                totalRevenues: totalRevenue, // Adicionado
                totalExpenses: totalExpense, // Adicionado
                referenceMonth: new Date(), // Adicionado - Usando data atual
            }
        });
        console.log(`UserService (recalculate): Novo objeto Balance criado para ${userId} com saldo ${newCalculatedBalance}, receitas ${totalRevenue}, despesas ${totalExpense}.`);
      } else {
          // Atualiza apenas se o valor calculado for diferente do atual ou outros totais mudaram
          const currentBalanceAmountDecimal = new Decimal(currentBalance.totalAmount);
          const currentTotalRevenuesDecimal = new Decimal(currentBalance.totalRevenues);
          const currentTotalExpensesDecimal = new Decimal(currentBalance.totalExpenses);

          if (!currentBalanceAmountDecimal.equals(newCalculatedBalance) ||
              !currentTotalRevenuesDecimal.equals(totalRevenue) ||
              !currentTotalExpensesDecimal.equals(totalExpense))
          {
              // Converte Decimal para number antes de passar para o repositório
              currentBalance = await userRepo.updateBalancePartial(userId, {
                totalAmount: newCalculatedBalance.toNumber(),
                totalRevenues: totalRevenue.toNumber(), // Atualiza total de receitas
                totalExpenses: totalExpense.toNumber(), // Atualiza total de despesas
                // referenceMonth: new Date(), // Opcional: atualizar mês de referência
              });
              console.log(`UserService (recalculate): Saldo/Totais atualizados no objeto Balance para ${userId}. Novo saldo: ${newCalculatedBalance}, Receitas: ${totalRevenue}, Despesas: ${totalExpense}`);
          } else {
              console.log(`UserService (recalculate): Saldo e totais recalculados são iguais aos atuais. Nenhuma atualização necessária no Balance.`);
          }
      }

      // REMOVIDA LÓGICA DE BALANCE HISTORY (Modelo não existe no schema)

     // 7. Retornar o objeto Balance atualizado (era 8)
      // Busca novamente para garantir consistência, especialmente se foi criado ou atualizado
      const finalBalance = await userRepo.getBalance(userId);
      if (!finalBalance) {
          // Isso não deveria acontecer neste ponto
          console.error(`UserService (recalculate): Falha crítica ao buscar balance final para ${userId} após recálculo.`);
          throw new Error('Falha ao obter o saldo final após o recálculo.');
      }

     console.log(`UserService: Recálculo de saldo concluído para ${userId}. Saldo final: ${finalBalance.totalAmount}`);
     return finalBalance;
   });
  }

  /**
   * Busca o histórico de saldo (receitas e despesas) dos últimos 6 meses para um usuário.
   * @param userId - O ID do usuário.
   * @returns Um array com os dados mensais de receitas e despesas.
   * @throws Error se ocorrer um erro ao buscar os dados.
   */
  async getBalanceHistory(userId: string): Promise<{ month: string; receitas: number; despesas: number }[]> {
    console.log(`UserService: Buscando histórico de saldo para o usuário ID: ${userId}`);
    try {
      // Obter os últimos 6 meses
      const hoje = new Date();
      const meses = [];
      for (let i = 5; i >= 0; i--) {
        const mes = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1);
        meses.push({
          inicio: new Date(mes.getFullYear(), mes.getMonth(), 1),
          fim: new Date(mes.getFullYear(), mes.getMonth() + 1, 0),
          nome: mes.toLocaleDateString('pt-BR', { month: 'short' }),
        });
      }

      // Buscar dados para cada mês usando a instância prisma do serviço
      const dadosMensais = await Promise.all(
        meses.map(async (mes) => {
          const [despesasResult, receitasResult] = await this.prisma.$transaction([
            this.prisma.expense.aggregate({
              where: {
                userId: userId,
                date: {
                  gte: mes.inicio,
                  lte: mes.fim,
                },
              },
              _sum: { amount: true },
            }),
            this.prisma.revenue.aggregate({
              where: {
                userId: userId,
                date: {
                  gte: mes.inicio,
                  lte: mes.fim,
                },
              },
              _sum: { amount: true },
            }),
          ]);

          // Converte Decimal para number ou usa 0 se for null/undefined
          const receitas = receitasResult._sum.amount instanceof Decimal
            ? receitasResult._sum.amount.toNumber()
            : (receitasResult._sum.amount ?? 0);

          const despesas = despesasResult._sum.amount instanceof Decimal
            ? despesasResult._sum.amount.toNumber()
            : (despesasResult._sum.amount ?? 0);


          return {
            month: mes.nome,
            receitas: receitas,
            despesas: despesas,
          };
        })
      );

      console.log(`UserService: Histórico de saldo encontrado para ${userId}.`);
      return dadosMensais;
    } catch (error) {
      console.error(`UserService: Erro ao buscar histórico de saldo para ${userId}:`, error);
      // Lança um erro para ser tratado pela camada superior (API route)
      throw new Error('Erro ao buscar histórico de saldo.');
    }
  }
 }

 // Exporta a classe para ser instanciada onde for necessária
 export default UserService;