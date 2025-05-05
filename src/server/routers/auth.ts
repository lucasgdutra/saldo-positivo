import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../trpc";
import { AuthService, UserAlreadyExistsError } from "@/services/AuthService";
import { UserRepository } from "@/repositories/UserRepository";
import { CategoryRepository } from "@/repositories/CategoryRepository";
import { db } from "@/lib/db";

// Instanciar repositórios e serviço (igual à API antiga)
const userRepository = new UserRepository(db);
const categoryRepository = new CategoryRepository(db);
const authService = new AuthService(userRepository, categoryRepository);

// Schema de registro (pode ser ajustado conforme regras do AuthService)
const registerSchema = z.object({
  name: z.string().min(2, "Nome obrigatório"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export const authRouter = router({
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ input }) => {
      try {
        const user = await authService.register(input);
        return { user, message: "Usuário criado com sucesso" };
      } catch (error) {
        if (error instanceof z.ZodError) {
          throw error; // tRPC já trata ZodError e retorna 400
        }
        if (error instanceof UserAlreadyExistsError) {
          throw new Error(error.message); // Será tratado no frontend
        }
        throw new Error("Erro interno ao registrar usuário");
      }
    }),
  // Procedimento protegido para testar sessão
  me: protectedProcedure.query(({ ctx }) => {
    return ctx.session.user;
  }),
});