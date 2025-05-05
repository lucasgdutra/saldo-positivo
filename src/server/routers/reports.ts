// src/server/routers/reports.ts
import { z } from "zod";
import { router, protectedProcedure } from "@/server/trpc";
import ExpenseService from "@/services/ExpenseService";
import { Decimal } from "@prisma/client/runtime/library";

// Funções auxiliares para agrupamento
function groupExpensesByPeriod(
  expenses: { date: Date; amount: Decimal }[],
  groupBy: string
) {
  const groupedData: Record<string, { label: string; amount: Decimal }> = {};
  for (const expense of expenses) {
    const date = new Date(expense.date);
    let key: string;
    let label: string;
    if (groupBy === "month") {
      key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      label = date.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
    } else if (groupBy === "week") {
      const firstDayOfWeek = new Date(date);
      const dayOfWeek = date.getDay();
      firstDayOfWeek.setDate(date.getDate() - dayOfWeek);
      firstDayOfWeek.setHours(0, 0, 0, 0);
      const weekNumber = getWeekNumber(date);
      key = `${firstDayOfWeek.getFullYear()}-W${String(weekNumber).padStart(2, "0")}`;
      const lastDayOfWeek = new Date(firstDayOfWeek);
      lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
      label = `${firstDayOfWeek.toLocaleDateString("pt-BR")} - ${lastDayOfWeek.toLocaleDateString("pt-BR")}`;
    } else {
      key = date.toISOString().split("T")[0];
      label = date.toLocaleDateString("pt-BR");
    }
    if (!groupedData[key]) {
      groupedData[key] = { label, amount: new Decimal(0) };
    }
    groupedData[key].amount = groupedData[key].amount.add(expense.amount);
  }
  return Object.entries(groupedData)
    .map(([key, value]) => ({
      key,
      label: value.label,
      amount: value.amount.toNumber(),
    }))
    .sort((a, b) => a.key.localeCompare(b.key));
}

function getWeekNumber(date: Date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

export const reportsRouter = router({
  expensesByCategoryPeriod: protectedProcedure
    .input(
      z.object({
        categoryId: z.string(),
        startDate: z.string(),
        endDate: z.string(),
        groupBy: z.enum(["month", "week", "day"]).default("month"),
      })
    )
    .query(async ({ ctx, input }) => {
      const { categoryId, startDate, endDate, groupBy } = input;
      const userId = ctx.session.user.id;
      const expenseService = new ExpenseService();

      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      const { category, expenses } = await expenseService.getExpensesByCategoryAndPeriodReport(
        userId,
        categoryId,
        start,
        end
      );

      const groupedExpenses = groupExpensesByPeriod(expenses, groupBy);

      const totalAmount = expenses.reduce(
        (acc: Decimal, expense) => acc.add(expense.amount),
        new Decimal(0)
      );

      return {
        category: {
          id: category.id,
          name: category.name,
        },
        period: {
          start: start.toISOString(),
          end: end.toISOString(),
          label: `${start.toLocaleDateString("pt-BR")} - ${end.toLocaleDateString("pt-BR")}`,
        },
        groupBy,
        totalAmount: totalAmount.toNumber(),
        expenses: groupedExpenses,
      };
    }),

  expensesByPeriod: protectedProcedure
    .input(
      z.object({
        startDate: z.string(),
        endDate: z.string(),
        compareWithPrevious: z.boolean().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { startDate, endDate, compareWithPrevious } = input;
      const userId = ctx.session.user.id;
      const expenseService = new ExpenseService();

      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      const periodDuration = end.getTime() - start.getTime();
      const adjustedDuration = Math.max(periodDuration, 86400000);
      const previousStart = new Date(start.getTime() - adjustedDuration);
      const previousEnd = new Date(start.getTime() - 1);

      const currentPeriodGroupedExpenses = await expenseService.getGroupedExpensesByPeriod(
        userId,
        start,
        end
      );

      let previousPeriodGroupedExpenses: typeof currentPeriodGroupedExpenses = [];
      if (compareWithPrevious) {
        previousPeriodGroupedExpenses = await expenseService.getGroupedExpensesByPeriod(
          userId,
          previousStart,
          previousEnd
        );
      }

      const totalCurrentExpenses = currentPeriodGroupedExpenses.reduce(
        (acc, item) => acc + item.total,
        0
      );
      const totalPreviousExpenses = previousPeriodGroupedExpenses.reduce(
        (acc, item) => acc + item.total,
        0
      );

      return {
        period: {
          start: start.toISOString(),
          end: end.toISOString(),
          label: `${start.toLocaleDateString("pt-BR")} - ${end.toLocaleDateString("pt-BR")}`,
        },
        previousPeriod: compareWithPrevious
          ? {
              start: previousStart.toISOString(),
              end: previousEnd.toISOString(),
              label: `${previousStart.toLocaleDateString("pt-BR")} - ${previousEnd.toLocaleDateString("pt-BR")}`,
            }
          : null,
        currentPeriodTotal: totalCurrentExpenses,
        previousPeriodTotal: compareWithPrevious ? totalPreviousExpenses : null,
        percentageChange:
          compareWithPrevious && totalPreviousExpenses !== 0
            ? ((totalCurrentExpenses - totalPreviousExpenses) / totalPreviousExpenses) * 100
            : compareWithPrevious && totalCurrentExpenses > 0
            ? 100
            : null,
        expensesByCategory: currentPeriodGroupedExpenses.map((item) => {
          const currentAmount = item.total;
          const previousItem = previousPeriodGroupedExpenses.find(
            (prev) => prev.categoryId === item.categoryId
          );
          const previousAmount = previousItem?.total ?? 0;
          const percentageOfTotal =
            totalCurrentExpenses !== 0 ? (currentAmount / totalCurrentExpenses) * 100 : 0;
          return {
            categoryId: item.categoryId,
            categoryName: item.categoryName || "Sem categoria",
            currentAmount,
            previousAmount: compareWithPrevious ? previousAmount : null,
            percentageChange:
              compareWithPrevious && previousAmount !== 0
                ? ((currentAmount - previousAmount) / previousAmount) * 100
                : compareWithPrevious && currentAmount > 0
                ? 100
                : null,
            percentageOfTotal,
          };
        }),
      };
    }),
});