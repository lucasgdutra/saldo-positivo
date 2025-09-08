"use client";

import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
} from "recharts";
import { useExpensesByCategory } from "@/hooks/use-dashboard";
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
	// Use provided data if available, otherwise fetch from API
	const {
		data: fetchedData,
		isLoading: queryLoading,
		error: queryError,
		refetch,
	} = useExpensesByCategory();

	// Transform data if needed
	const transformData = (apiData: any[]): CategoryExpense[] => {
		return (
			apiData?.map((item) => ({
				name: item.category || item.name,
				value: item.amount || item.value,
			})) || []
		);
	};

	const chartData = data || transformData(fetchedData || []) || [];
	const isLoading = initialLoading || (queryLoading && !data);
	const error = queryError?.message || null;

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
			onRetry={() => refetch()}
		>
			{chartData.length === 0 ? (
				<div className="h-80 w-full flex flex-col items-center justify-center p-6 text-center border rounded-lg">
					<h3 className="text-lg font-medium mb-2">
						Sem dados de despesas por categoria
					</h3>
					<p className="text-muted-foreground mb-4">
						Você ainda não possui despesas registradas para visualizar este
						gráfico.
					</p>
					<p className="text-sm">
						Para começar a registrar suas despesas, acesse a página{" "}
						<a
							href="/despesas"
							className="text-blue-600 hover:underline font-medium"
						>
							Despesas
						</a>{" "}
						e adicione suas primeiras transações.
					</p>
				</div>
			) : chartData.filter((item) => item.value > 0).length === 0 ? (
				<div className="h-80 w-full flex flex-col items-center justify-center p-6 text-center border rounded-lg">
					<h3 className="text-lg font-medium mb-2">
						Todas as despesas têm valor zero
					</h3>
					<p className="text-muted-foreground">
						Não há dados significativos para exibir no gráfico.
					</p>
				</div>
			) : (
				<div className="h-80 w-full">
					<ResponsiveContainer width="100%" height="100%">
						<PieChart margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
							<Pie
								data={chartData.filter((item) => item.value > 0)}
								cx="50%"
								cy="50%"
								labelLine={false}
								outerRadius={80}
								innerRadius={0}
								fill="#8884d8"
								dataKey="value"
								nameKey="name"
								label={({ name, percent }) =>
									`${name}: ${(percent * 100).toFixed(0)}%`
								}
							>
								{chartData
									.filter((item) => item.value > 0)
									.map((entry, index) => (
										<Cell
											key={`cell-${entry.name}-${index}`}
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
