import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import CategoryService from "@/services/CategoryService";
import { TRPCError } from "@trpc/server";

const categoryService = new CategoryService();

// Schema Zod para validação
const categorySchema = z.object({
  name: z.string().min(1, "Nome da categoria é obrigatório"),
});

// Schema para parâmetros de ID
const categoryIdSchema = z.object({
  id: z.string().uuid("ID inválido"),
});

export const categoryRouter = router({
  // Listar categorias do usuário
  list: protectedProcedure.query(async ({ ctx }) => {
    return categoryService.getCategoriesByUser(ctx.session.user.id);
  }),

  // Criar nova categoria
  create: protectedProcedure
    .input(categorySchema)
    .mutation(async ({ ctx, input }) => {
      try {
        return await categoryService.createCategory({
          name: input.name,
          userId: ctx.session.user.id,
        });
      } catch (error) {
        if (error instanceof Error) {
          if (error.message.includes("já existe")) {
            throw new TRPCError({
              code: "CONFLICT",
              message: error.message,
            });
          }
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Erro ao criar categoria",
        });
      }
    }),

  // Atualizar categoria
  update: protectedProcedure
    .input(z.object({
      ...categoryIdSchema.shape,
      ...categorySchema.shape,
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        return await categoryService.updateCategory(
          input.id,
          ctx.session.user.id,
          { name: input.name }
        );
      } catch (error) {
        if (error instanceof Error) {
          if (error.message.includes("não encontrada")) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: error.message,
            });
          }
          if (error.message.includes("já existe")) {
            throw new TRPCError({
              code: "CONFLICT",
              message: error.message,
            });
          }
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Erro ao atualizar categoria",
        });
      }
    }),

  // Deletar categoria
  delete: protectedProcedure
    .input(categoryIdSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        return await categoryService.deleteCategory(input.id, ctx.session.user.id);
      } catch (error) {
        if (error instanceof Error) {
          if (error.message.includes("não encontrada")) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: error.message,
            });
          }
          if (error.message.includes("está associada")) {
            throw new TRPCError({
              code: "PRECONDITION_FAILED",
              message: error.message,
            });
          }
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Erro ao deletar categoria",
        });
      }
    }),
});