"use client";

import { useState, useEffect } from "react";
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

type BalanceData = {
  month: string;
  receitas: number;
  despesas: number;
};

type BalanceChartProps = {
  data?: BalanceData[];
  isLoading?: boolean;
};

export function BalanceChart({ data, isLoading: initialLoading = false }: BalanceChartProps) {
  const [chartData, setChartData] = useState<BalanceData[]>([]);
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (data) {
      setChartData(data);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/dashboard/balance-history');
      
      if (!response.ok) {
        throw new Error('Falha ao buscar dados do histórico de saldo');
      }
      
      const balanceData = await response.json();
      setChartData(balanceData);
    } catch (err) {
      console.error('Erro ao buscar dados do histórico:', err);
      setError('Não foi possível carregar os dados do histórico');
      
      // Não usar dados fictícios em caso de erro
      setChartData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [data]);

  if (isLoading) {
    return (
      <div className="h-80 w-full flex items-center justify-center">
        <div className="text-muted-foreground">Carregando...</div>
      </div>
    );
  }

  return (
    <DashboardErrorContainer 
      isError={!!error} 
      error={error}
      onRetry={fetchData}
    >
      {chartData.length === 0 ? (
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
                tickFormatter={(value) =>
                  new Intl.NumberFormat("pt-BR", {
                    notation: "compact",
                    compactDisplay: "short",
                  }).format(value)
                }
              />
              <Tooltip
                formatter={(value) =>
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(value))
                }
              />
              <Legend />
              <Bar dataKey="receitas" name="Receitas" fill="#10b981" />
              <Bar dataKey="despesas" name="Despesas" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </DashboardErrorContainer>
  );
}