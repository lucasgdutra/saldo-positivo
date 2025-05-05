import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import ExpenseService from "@/services/ExpenseService";
import { TRPCError } from "@trpc/server";

const expenseService = new ExpenseService();

// Schema Zod para validação
const expenseSchema = z.object({
  amount: z.number().positive("O valor deve ser positivo"),
  description: z.string().optional(),
  date: z.string().refine((date) => !Number.isNaN(Date.parse(date)), {
    message: "Data inválida",
  }),
  categoryId: z.string().min(1, "Categoria é obrigatória"),
});

// Schema para parâmetros de ID
const expenseIdSchema = z.object({
  id: z.string().uuid("ID inválido"),
});

// Schema para filtros de listagem
const listFiltersSchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  categoryId: z.string().optional(),
});

export const expenseRouter = router({
  // Listar despesas do usuário com filtros opcionais
  list: protectedProcedure
    .input(listFiltersSchema)
    .query(async ({ ctx, input }) => {
      try {
        let expenses = await expenseService.getExpensesByUser(ctx.session.user.id);

        // Aplicar filtros se fornecidos
        if (input.startDate) {
          const start = new Date(input.startDate);
          expenses = expenses.filter(exp => exp.date >= start);
        }
        if (input.endDate) {
          const end = new Date(input.endDate);
          end.setHours(23, 59, 59, 999);
          expenses = expenses.filter(exp => exp.date <= end);
        }
        if (input.categoryId) {
          expenses = expenses.filter(exp => exp.categoryId === input.categoryId);
        }

        // Ordenar por data mais recente primeiro
        return expenses.sort((a, b) => b.date.getTime() - a.date.getTime());
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Erro ao listar despesas",
        });
      }
    }),

  // Criar nova despesa
  create: protectedProcedure
    .input(expenseSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        return await expenseService.createExpense({
          amount: input.amount,
          description: input.description || "",
          date: new Date(input.date),
          userId: ctx.session.user.id,
          categoryId: input.categoryId,
        });
      } catch (error) {
        if (error instanceof Error) {
          if (error.message.includes("categoria")) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Categoria inválida ou não encontrada",
            });
          }
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Erro ao criar despesa",
        });
      }
    }),

  // Atualizar despesa existente
  update: protectedProcedure
    .input(z.object({
      ...expenseIdSchema.shape,
      ...expenseSchema.shape,
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        return await expenseService.updateExpense(
          input.id,
          ctx.session.user.id,
          {
            amount: input.amount,
            description: input.description || "",
            date: new Date(input.date),
            categoryId: input.categoryId,
          }
        );
      } catch (error) {
        if (error instanceof Error) {
          if (error.message.includes("não encontrada")) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Despesa não encontrada",
            });
          }
          if (error.message.includes("Acesso não permitido")) {
            throw new TRPCError({
              code: "FORBIDDEN",
              message: "Acesso não permitido para esta despesa",
            });
          }
          if (error.message.includes("categoria")) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Categoria inválida ou não encontrada",
            });
          }
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Erro ao atualizar despesa",
        });
      }
    }),

  // Deletar despesa
  delete: protectedProcedure
    .input(expenseIdSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        return await expenseService.deleteExpense(input.id, ctx.session.user.id);
      } catch (error) {
        if (error instanceof Error) {
          if (error.message.includes("não encontrada")) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Despesa não encontrada",
            });
          }
          if (error.message.includes("Acesso não permitido")) {
            throw new TRPCError({
              code: "FORBIDDEN",
              message: "Acesso não permitido para esta despesa",
            });
          }
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Erro ao deletar despesa",
        });
      }
    }),

  // Buscar despesas do mês atual por categoria
  expensesByCategory: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await expenseService.getExpensesByCategoryForCurrentMonth(
        ctx.session.user.id
      );
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Erro ao buscar despesas por categoria",
      });
    }
  }),

  // Buscar despesas recentes
  recent: protectedProcedure
    .input(z.object({ limit: z.number().min(1).max(10).default(5) }))
    .query(async ({ ctx, input }) => {
      try {
        return await expenseService.getRecentExpenses(
          ctx.session.user.id,
          input.limit
        );
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Erro ao buscar despesas recentes",
        });
      }
    }),

  // Buscar despesas por categoria e período (para relatórios)
  expensesByCategoryAndPeriod: protectedProcedure
    .input(z.object({
      categoryId: z.string().uuid("ID da categoria inválido"),
      startDate: z.string().refine((date) => !Number.isNaN(Date.parse(date)), {
        message: "Data inicial inválida",
      }),
      endDate: z.string().refine((date) => !Number.isNaN(Date.parse(date)), {
        message: "Data final inválida",
      }),
    }))
    .query(async ({ ctx, input }) => {
      try {
        return await expenseService.getExpensesByCategoryAndPeriodReport(
          ctx.session.user.id,
          input.categoryId,
          new Date(input.startDate),
          new Date(input.endDate)
        );
      } catch (error) {
        if (error instanceof Error) {
          if (error.message.includes("Categoria")) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: error.message,
            });
          }
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Erro ao buscar relatório de despesas",
        });
      }
    }),
});