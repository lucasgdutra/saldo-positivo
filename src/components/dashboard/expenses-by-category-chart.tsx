"use client";

import { useState, useEffect, useCallback } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { DashboardErrorContainer } from "./dashboard-error";

type CategoryExpense = {
  name: string;
  value: number;
};

type ExpensesByCategoryChartProps = {
  data?: CategoryExpense[];
  isLoading?: boolean;
};

// Cores para as categorias
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
  "#FFC658",
  "#8DD1E1",
];

export function ExpensesByCategoryChart({
  data,
  isLoading: initialLoading = false,
}: ExpensesByCategoryChartProps) {
  const [chartData, setChartData] = useState<CategoryExpense[]>([]);
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (data) {
      setChartData(data);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/dashboard/expenses-by-category');
      
      if (!response.ok) {
        throw new Error('Falha ao buscar dados de despesas por categoria');
      }
      
      const categoryData = await response.json();
      
      setChartData(categoryData);
    } catch (err) {
      console.error('Erro ao buscar dados de categorias:', err);
      setError('Não foi possível carregar os dados de despesas por categoria');
      
      // Não usar dados fictícios em caso de erro
      setChartData([]);
    } finally {
      setIsLoading(false);
    }
  }, [data]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
          <h3 className="text-lg font-medium mb-2">Sem dados de despesas por categoria</h3>
          <p className="text-muted-foreground mb-4">
            Você ainda não possui despesas registradas para visualizar este gráfico.
          </p>
          <p className="text-sm">
            Para começar a registrar suas despesas, acesse a página{" "}
            <a href="/despesas" className="text-blue-600 hover:underline font-medium">
              Despesas
            </a>
            {" "}e adicione suas primeiras transações.
          </p>
        </div>
      ) : (
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${entry.name}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) =>
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(value))
                }
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </DashboardErrorContainer>
  );
}