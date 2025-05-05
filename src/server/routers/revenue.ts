import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import RevenueService from "@/services/RevenueService";
import { TRPCError } from "@trpc/server";

const revenueSchema = z.object({
  amount: z.number().positive("O valor deve ser positivo"),
  description: z.string().optional(),
  date: z.string().refine((date) => !Number.isNaN(Date.parse(date)), {
    message: "Data inválida",
  }),
});

const revenueUpdateSchema = revenueSchema.partial();

const revenueService = new RevenueService();

export const revenueRouter = router({
  list: protectedProcedure
    .input(
      z.object({
        startDate: z.string().optional(),
        endDate: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { startDate, endDate } = input;

      // Se temos ambas as datas, usamos o método específico para período
      if (startDate && endDate) {
        return await revenueService.getRevenuesByUserAndPeriod(
          ctx.session.user.id,
          new Date(startDate),
          new Date(endDate)
        );
      }

      // Caso contrário, buscamos todas as receitas
      let revenues = await revenueService.getRevenuesByUser(ctx.session.user.id);

      // Aplicar filtros se fornecidos
      if (startDate) {
        const start = new Date(startDate);
        revenues = revenues.filter(rev => rev.date >= start);
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        revenues = revenues.filter(rev => rev.date <= end);
      }

      // Ordenar por data descendente
      revenues.sort((a, b) => b.date.getTime() - a.date.getTime());

      return revenues;
    }),

  create: protectedProcedure
    .input(revenueSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const revenue = await revenueService.createRevenue({
          amount: input.amount,
          description: input.description || "",
          date: new Date(input.date),
          userId: ctx.session.user.id,
        });

        return revenue;
      } catch (error) {
        if (error instanceof Error) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: error.message,
          });
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Erro ao criar receita",
        });
      }
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid("ID inválido"),
        data: revenueUpdateSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { id, data } = input;

        const revenue = await revenueService.updateRevenue(
          id,
          ctx.session.user.id,
          {
            amount: data.amount,
            description: data.description,
            date: data.date ? new Date(data.date) : undefined,
          }
        );

        return revenue;
      } catch (error) {
        if (error instanceof Error) {
          if (
            error.message.includes("não encontrada") ||
            error.message.includes("Acesso não permitido")
          ) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: error.message,
            });
          }
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: error.message,
          });
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Erro ao atualizar receita",
        });
      }
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string().uuid("ID inválido") }))
    .mutation(async ({ ctx, input }) => {
      try {
        await revenueService.deleteRevenue(input.id, ctx.session.user.id);
        return { success: true };
      } catch (error) {
        if (error instanceof Error) {
          if (
            error.message.includes("não encontrada") ||
            error.message.includes("Acesso não permitido")
          ) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: error.message,
            });
          }
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: error.message,
          });
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Erro ao deletar receita",
        });
      }
    }),

  getRecent: protectedProcedure
    .input(z.object({ limit: z.number().min(1).max(50).optional() }))
    .query(async ({ ctx, input }) => {
      try {
        return await revenueService.getRecentRevenues(
          ctx.session.user.id,
          input.limit
        );
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Erro ao buscar receitas recentes",
        });
      }
    }),
});