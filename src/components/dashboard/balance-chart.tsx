"use client";

import { useCallback } from "react";
import { z } from "zod";
import { trpc } from "@/lib/trpc";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { DashboardErrorContainer } from "./dashboard-error";

// Esquema Zod para validação (mais flexível)
const BalanceDataSchema = z.object({
  month: z.coerce.string(), // Coerção para string
  receitas: z.number().optional().default(0), // Permitir opcional com fallback 0, remover nonnegative temporariamente
  despesas: z.number().optional().default(0), // Permitir opcional com fallback 0, remover nonnegative temporariamente
});

const BalanceHistoryResponseSchema = z.array(BalanceDataSchema);

type BalanceData = z.infer<typeof BalanceDataSchema>;

// Não precisamos mais de props, o componente buscará seus próprios dados
export function BalanceChart() {
  const {
    data: chartData = [],
    isLoading,
    isError,
    error,
    refetch,
  } = trpc.dashboard.balanceHistory.useQuery();

  // Memoizar formatters com useCallback
  const formatYAxisTick = useCallback((value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      notation: "compact",
      compactDisplay: "short",
    }).format(value);
  }, []);

  const formatTooltipValue = useCallback((value: number | string) => {
    // Garantir que o valor seja um número antes de formatar
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numericValue)) {
      return 'N/A'; // Ou algum valor padrão se não for número
    }
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(numericValue);
  }, []);


  if (isLoading) {
    return (
      <div className="h-80 w-full flex items-center justify-center">
        <div className="text-muted-foreground">Carregando...</div>
      </div>
    );
  }

  return (
    <DashboardErrorContainer
      isError={isError}
      error={error?.message || null} // Passa a mensagem de erro
      onRetry={refetch} // Usa a função refetch do useQuery
    >
      {chartData.length === 0 && !isLoading && !isError ? ( // Adiciona verificação para não mostrar "sem histórico" durante loading ou erro
        <div className="h-80 w-full flex flex-col items-center justify-center p-6 text-center border rounded-lg">
          <h3 className="text-lg font-medium mb-2">Sem histórico de receitas e despesas</h3>
          <p className="text-muted-foreground mb-4">
            Você ainda não possui transações registradas para visualizar este gráfico.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/receitas"
              className="inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
            >
              Adicionar Receitas
            </a>
            <a
              href="/despesas"
              className="inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Adicionar Despesas
            </a>
          </div>
        </div>
      ) : (
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis
                tickFormatter={formatYAxisTick} // Usar formatter memoizado
              />
              <Tooltip
                formatter={formatTooltipValue} // Usar formatter memoizado
              />
              <Legend />
              {/* Adicionar stackId para empilhar barras se necessário, mas aqui são valores distintos */}
              <Bar dataKey="receitas" name="Receitas" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="despesas" name="Despesas" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </DashboardErrorContainer>
  );
}