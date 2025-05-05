import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { categoryRouter } from './category';
import { expenseRouter } from './expense';
import { revenueRouter } from './revenue'; // Adiciona a importação
import { balanceRouter } from './balance'; // Importa o roteador de saldo
import { dashboardRouter } from './dashboard';
import { reportsRouter } from './reports';
import { authRouter } from './auth';

export const appRouter = router({
  // Procedimento de exemplo para testar a configuração
  healthcheck: publicProcedure
    .input(z.void())
    .query(() => {
      return {
        status: 'ok',
        timestamp: new Date(),
      };
    }),
    
  // Adiciona os roteadores
  categories: categoryRouter,
  expenses: expenseRouter,
  revenues: revenueRouter, // Adiciona o roteador de receitas
  balance: balanceRouter, // Adiciona o roteador de saldo
  dashboard: dashboardRouter,
  reports: reportsRouter,
  auth: authRouter,
});

// Tipo exportado para ser usado no cliente
export type AppRouter = typeof appRouter;