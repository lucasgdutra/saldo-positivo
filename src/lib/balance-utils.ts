import { db } from "@/lib/db";

/**
 * Atualiza o saldo do usuário com base nas receitas e despesas do mês atual
 * @param userId ID do usuário
 * @returns O saldo atualizado
 */
export async function updateUserBalance(userId: string) {
  try {
    // Obter o mês atual
    const hoje = new Date();
    const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);

    // Calcular totais de receitas e despesas
    const [totalRevenues, totalExpenses] = await Promise.all([
      db.revenue.aggregate({
        where: {
          userId: userId,
          date: {
            gte: inicioMes,
          },
        },
        _sum: { amount: true },
      }),
      db.expense.aggregate({
        where: {
          userId: userId,
          date: {
            gte: inicioMes,
          },
        },
        _sum: { amount: true },
      }),
    ]);

    const revenuesAmount = totalRevenues._sum.amount?.toNumber() ?? 0;
    const expensesAmount = totalExpenses._sum.amount?.toNumber() ?? 0;
    const totalAmount = revenuesAmount - expensesAmount;

    // Atualizar ou criar o saldo
    const balance = await db.balance.upsert({
      where: {
        userId: userId,
      },
      update: {
        totalAmount,
        totalRevenues: revenuesAmount,
        totalExpenses: expensesAmount,
        referenceMonth: inicioMes,
      },
      create: {
        userId: userId,
        totalAmount,
        totalRevenues: revenuesAmount,
        totalExpenses: expensesAmount,
        referenceMonth: inicioMes,
      },
    });

    return {
      totalAmount: balance.totalAmount.toNumber(),
      totalRevenues: balance.totalRevenues.toNumber(),
      totalExpenses: balance.totalExpenses.toNumber(),
      referenceMonth: balance.referenceMonth,
    };
  } catch (error) {
    console.error("[BALANCE_UPDATE_ERROR]", error);
    throw error;
  }
}