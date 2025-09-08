"use client";

import { useEffect, useState } from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { DashboardErrorContainer } from "../../dashboard/_components/dashboard-error";

type MonthlyEvolutionData = {
	month: string;
	expenses: number;
	revenues: number;
	balance: number;
	fullDate: string;
};

interface ExpensesEvolutionChartProps {
	selectedCategoryId?: string;
}

export function ExpensesEvolutionChart({
	selectedCategoryId,
}: ExpensesEvolutionChartProps) {
	const [data, setData] = useState<MonthlyEvolutionData[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchData = async () => {
		try {
			setIsLoading(true);
			setError(null);

			const params = new URLSearchParams();
			if (selectedCategoryId) {
				params.append("categoryId", selectedCategoryId);
			}

			const response = await fetch(
				`/api/dashboard/monthly-evolution?${params.toString()}`,
			);

			if (!response.ok) {
				throw new Error("Falha ao buscar dados de evolução de despesas");
			}

			const evolutionData = await response.json();
			setData(evolutionData);
		} catch (err) {
			console.error("Erro ao buscar dados de evolução de despesas:", err);
			setError("Não foi possível carregar os dados de evolução de despesas");
			setData([]);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [selectedCategoryId]);

	if (isLoading) {
		return (
			<div className="h-64 w-full flex items-center justify-center">
				<div className="text-muted-foreground">
					Carregando evolução das despesas...
				</div>
			</div>
		);
	}

	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: "BRL",
		}).format(value);
	};

	const formatCompactCurrency = (value: number) => {
		return new Intl.NumberFormat("pt-BR", {
			notation: "compact",
			compactDisplay: "short",
			style: "currency",
			currency: "BRL",
		}).format(value);
	};

	const CustomTooltip = ({ active, payload, label }: any) => {
		if (active && payload && payload.length) {
			return (
				<div className="bg-white p-3 border rounded-lg shadow-lg">
					<p className="font-medium mb-1">{label}</p>
					<p className="text-red-600 text-sm">
						Despesas: {formatCurrency(payload[0].value)}
					</p>
				</div>
			);
		}
		return null;
	};

	const totalExpenses = data.reduce((sum, item) => sum + item.expenses, 0);
	const avgExpenses = data.length > 0 ? totalExpenses / data.length : 0;

	return (
		<DashboardErrorContainer
			isError={!!error}
			error={error}
			onRetry={fetchData}
		>
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<h3 className="text-lg font-medium">Evolução das Despesas</h3>
					<div className="text-right">
						<p className="text-sm text-muted-foreground">Média mensal</p>
						<p className="text-sm font-medium text-red-600">
							{formatCurrency(avgExpenses)}
						</p>
					</div>
				</div>

				{data.length === 0 ? (
					<div className="h-64 w-full flex flex-col items-center justify-center p-6 text-center border rounded-lg">
						<p className="text-muted-foreground mb-4">
							Ainda não há dados suficientes para mostrar a evolução das
							despesas.
						</p>
						<a
							href="/despesas"
							className="inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
						>
							Adicionar Despesas
						</a>
					</div>
				) : (
					<div className="h-64 w-full">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart
								data={data}
								margin={{
									top: 10,
									right: 30,
									left: 0,
									bottom: 0,
								}}
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="month" />
								<YAxis tickFormatter={formatCompactCurrency} />
								<Tooltip content={<CustomTooltip />} />
								<Bar dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
							</BarChart>
						</ResponsiveContainer>
					</div>
				)}
			</div>
		</DashboardErrorContainer>
	);
}
