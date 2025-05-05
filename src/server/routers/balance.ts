import { z } from "zod";
import { router, protectedProcedure } from "@/server/trpc";
import { TRPCError } from "@trpc/server";
import UserService from "@/services/UserService";
import { Decimal } from "@prisma/client/runtime/library";

const userService = new UserService();

// Define o schema de saída para o saldo, garantindo a conversão para number
const BalanceOutputSchema = z.object({
  totalAmount: z.number(),
  totalRevenues: z.number(),
  totalExpenses: z.number(),
  referenceMonth: z.date(),
});

export const balanceRouter = router({ // Corrigido: createTRPCRouter -> router
  /**
   * Busca o saldo atual do usuário logado.
   */
  getCurrentBalance: protectedProcedure
    .output(BalanceOutputSchema) // Define o tipo de saída esperado
    .query(async ({ ctx }) => {
      const userId = ctx.session.user.id;
      if (!userId) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "ID do usuário não encontrado na sessão." });
      }
      
      const userWithBalance = await userService.getUserByIdWithBalance(userId);

      if (!userWithBalance || !userWithBalance.balance) {
        console.warn(`[tRPC balance.getCurrentBalance] Saldo não encontrado para usuário ${userId}. Recalculando saldo.`);
        const updatedBalance = await userService.recalculateBalance(userId);



        let safeReferenceMonthRecalc = updatedBalance.referenceMonth;
        if (!(safeReferenceMonthRecalc instanceof Date) || isNaN(safeReferenceMonthRecalc.getTime())) {
          console.warn(`[tRPC balance.getCurrentBalance - Recalc] Invalid or missing referenceMonth (${updatedBalance.referenceMonth}), defaulting to current date.`);
          safeReferenceMonthRecalc = new Date();
        }

        return {
          totalAmount: updatedBalance.totalAmount.toNumber(),
          totalRevenues: updatedBalance.totalRevenues.toNumber(),
          totalExpenses: updatedBalance.totalExpenses.toNumber(),
          referenceMonth: safeReferenceMonthRecalc,
        };
      }

      const balance = userWithBalance.balance;
      





      let safeReferenceMonth = balance.referenceMonth;
      // Verifica se é uma instância de Date E se é uma data válida
      if (!(safeReferenceMonth instanceof Date) || isNaN(safeReferenceMonth.getTime())) {
        console.warn(`[tRPC balance.getCurrentBalance] Invalid or missing referenceMonth (${balance.referenceMonth}), defaulting to current date.`);
        safeReferenceMonth = new Date(); // Default para data atual se inválido/ausente
      }

      return {
        totalAmount: balance.totalAmount.toNumber(),
        totalRevenues: balance.totalRevenues.toNumber(),
        totalExpenses: balance.totalExpenses.toNumber(),
        referenceMonth: safeReferenceMonth,
      };
    }),

  /**
   * Força o recálculo do saldo do usuário logado.
   */
  recalculateBalance: protectedProcedure
    .output(BalanceOutputSchema) // Define o tipo de saída esperado
    .mutation(async ({ ctx }) => {
      const userId = ctx.session.user.id;
      if (!userId) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "ID do usuário não encontrado na sessão." });
      }
      
      const updatedBalance = await userService.recalculateBalance(userId);
      

      // Converte Decimal para number antes de retornar
      return {
        totalAmount: updatedBalance.totalAmount.toNumber(),
        totalRevenues: updatedBalance.totalRevenues.toNumber(),
        totalExpenses: updatedBalance.totalExpenses.toNumber(),
        referenceMonth: updatedBalance.referenceMonth,
      };
    }),
});

export type BalanceRouter = typeof balanceRouter;