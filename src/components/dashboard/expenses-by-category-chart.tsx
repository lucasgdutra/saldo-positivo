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

const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042",
  "#8884D8", "#82CA9D", "#FFC658", "#8DD1E1"
];

const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

type CategoryExpense = {
  name: string;
  value: number;
};

export function ExpensesByCategoryChart() {
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [chartData, setChartData] = useState<CategoryExpense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(`/api/dashboard/expenses-by-category?month=${selectedMonth + 1}&year=${selectedYear}`);
      if (!res.ok) throw new Error("Erro ao buscar dados do gráfico");
      const data = await res.json();
      setChartData(data);
    } catch (err) {
      console.error(err);
      setError("Não foi possível carregar os dados de despesas por categoria.");
    } finally {
      setIsLoading(false);
    }
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(Number(e.target.value));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(e.target.value));
  };

  return (
    <DashboardErrorContainer isError={!!error} error={error} onRetry={fetchData}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <select className="border rounded p-1" value={selectedMonth} onChange={handleMonthChange}>
            {MONTHS.map((month, index) => (
              <option key={index} value={index}>{month}</option>
            ))}
          </select>
          <select className="border rounded p-1" value={selectedYear} onChange={handleYearChange}>
            {[...Array(5)].map((_, i) => {
              const year = today.getFullYear() - i;
              return <option key={year} value={year}>{year}</option>;
            })}
          </select>
        </div>
      </div>
      {isLoading ? (
        <div className="h-80 w-full flex items-center justify-center">
          <span className="text-muted-foreground">Carregando...</span>
        </div>
      ) : chartData.length === 0 ? (
        <div className="h-80 w-full flex items-center justify-center">
          <span className="text-muted-foreground">Sem dados para o período selecionado</span>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(value))} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </DashboardErrorContainer>
  );
}
