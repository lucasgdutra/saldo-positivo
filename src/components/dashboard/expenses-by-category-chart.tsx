"use client";

import { useCallback, useMemo } from "react";
import { z } from "zod";
import { trpc } from "@/lib/trpc";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { DashboardErrorContainer } from "./dashboard-error";

// Esquema Zod para validação
const CategoryExpenseSchema = z.object({
  name: z.string(),
  value: z.number().nonnegative(), // Garantir que valor não seja negativo
});

const ExpensesByCategoryResponseSchema = z.array(CategoryExpenseSchema);

type CategoryExpense = z.infer<typeof CategoryExpenseSchema>;

// Função para gerar cores HSL distintas
const generateHslColor = (index: number, total: number): string => {
  const hue = (index * (360 / total)) % 360;
  // Usar saturação e luminosidade que geralmente funcionam bem para gráficos
  return `hsl(${hue}, 70%, 50%)`;
};

// Função para truncar texto
const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.substring(0, maxLength)}...`;
};


export function ExpensesByCategoryChart() {
  const {
    data: rawData = [],
    isLoading,
    isError,
    error,
    refetch,
  } = trpc.dashboard.expensesByCategory.useQuery();

  

  // Ordenar dados por valor (maior para menor) e gerar cores dinâmicas
  const { chartData, colors } = useMemo(() => {
    const sortedData = [...rawData].sort((a, b) => b.value - a.value);
    const generatedColors = sortedData.map((_, index) =>
      generateHslColor(index, sortedData.length)
    );
    return { chartData: sortedData, colors: generatedColors };
  }, [rawData]);

  console.log("rawData", rawData);
  console.log("chartData", chartData);
  console.log("colors", colors);

  // Memoizar formatter do tooltip
  const formatTooltipValue = useCallback((value: number | string) => {
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numericValue)) {
      return 'N/A';
    }
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(numericValue);
  }, []);

  // Customizar o payload da legenda para truncar nomes longos
  const renderLegend = useCallback((props: any) => {
    const { payload } = props;
    return (
      <ul style={{ listStyle: 'none', padding: 0, margin: '10px 0 0 0', textAlign: 'center' }}>
        {
          payload.map((entry: any, index: number) => (
            <li key={`item-${index}`} style={{ display: 'inline-block', marginRight: '10px', color: entry.color }}>
              <span style={{ display: 'inline-block', marginRight: '5px', width: '10px', height: '10px', backgroundColor: entry.color, borderRadius: '50%' }}></span>
              <span title={entry.payload.name}> {/* Tooltip com nome completo */}
                {truncateText(entry.payload.name, 15)} {/* Truncar nome na legenda */}
              </span>
            </li>
          ))
        }
      </ul>
    );
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
      error={error?.message || null}
      onRetry={refetch}
    >
      {chartData.length === 0 && !isLoading && !isError ? ( // Adiciona verificação para não mostrar "sem dados" durante loading ou erro
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
                data={chartData} // Usar dados ordenados
                cx="50%"
                cy="50%"
                labelLine={false} // Manter linha de label desativada
                outerRadius={100} // Aumentar raio ligeiramente
                innerRadius={60} // Adicionar um raio interno para fazer um Donut Chart (opcional, mas visualmente agradável)
                fill="#8884d8"
                dataKey="value"
                // Remover label direto no gráfico para evitar sobreposição
                // label={renderCustomizedLabel} // Poderia usar um label customizado se necessário
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${entry.name}-${index}`} // Chave mais robusta
                    fill={colors[index]} // Usar cores geradas dinamicamente
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={formatTooltipValue} // Usar formatter memoizado
              />
              {/* Usar a legenda customizada */}
              <Legend content={renderLegend} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </DashboardErrorContainer>
  );
}