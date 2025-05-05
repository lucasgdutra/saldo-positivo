// src/server/routers/dashboard.ts
import { z } from "zod";
import { router, protectedProcedure } from "@/server/trpc";
import UserService from "@/services/UserService";
import ExpenseService from "@/services/ExpenseService";
import RevenueService from "@/services/RevenueService";
import { db } from "@/lib/db";
import { Decimal } from "@prisma/client/runtime/library";

// Tipos auxiliares
type CombinedTransaction = {
  id: string;
  type: "expense" | "revenue";
  amount: number;
  description: string;
  date: string;
  category?: string;
};

export const dashboardRouter = router({
  balanceHistory: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const userService = new UserService(db);
    return await userService.getBalanceHistory(userId);
  }),

  expensesByCategory: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const expenseService = new ExpenseService(db);
    return await expenseService.getExpensesByCategoryForCurrentMonth(userId);
  }),

  recentTransactions: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const limit = 5;
    const expenseService = new ExpenseService(db);
    const revenueService = new RevenueService(db);

    const [recentExpenses, recentRevenues] = await Promise.all([
      expenseService.getRecentExpenses(userId, limit),
      revenueService.getRecentRevenues(userId, limit),
    ]);

    const combinedTransactions: CombinedTransaction[] = [
      ...recentExpenses.map((expense) => ({
        id: expense.id,
        type: "expense" as const,
        amount: expense.amount instanceof Decimal ? expense.amount.toNumber() : expense.amount,
        description: expense.description || "Sem descrição",
        date: expense.date.toISOString(),
        category: expense.category?.name,
      })),
      ...recentRevenues.map((revenue) => ({
        id: revenue.id,
        type: "revenue" as const,
        amount: revenue.amount instanceof Decimal ? revenue.amount.toNumber() : revenue.amount,
        description: revenue.description || "Sem descrição",
        date: revenue.date.toISOString(),
      })),
    ];

    const sortedAndSlicedTransactions = combinedTransactions
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);

    return sortedAndSlicedTransactions.map((tx) => ({
      ...tx,
      date: new Date(tx.date).toString(),
    }));
  }),
});