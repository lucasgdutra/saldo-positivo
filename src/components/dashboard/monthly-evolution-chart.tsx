"use client";

import { useEffect, useState } from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { DashboardErrorContainer } from "./dashboard-error";

type MonthlyEvolutionData = {
	month: string;
	expenses: number;
	revenues: number;
	balance: number;
	fullDate: string;
};

interface MonthlyEvolutionChartProps {
	chartType?: "line" | "bar";
}

export function MonthlyEvolutionChart({
	chartType = "line",
}: MonthlyEvolutionChartProps) {
	const [data, setData] = useState<MonthlyEvolutionData[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchData = async () => {
		try {
			setIsLoading(true);
			setError(null);

			const response = await fetch("/api/dashboard/monthly-evolution");

			if (!response.ok) {
				throw new Error("Falha ao buscar dados de evolução mensal");
			}

			const evolutionData = await response.json();
			setData(evolutionData);
		} catch (err) {
			console.error("Erro ao buscar dados de evolução:", err);
			setError("Não foi possível carregar os dados de evolução");
			setData([]);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	if (isLoading) {
		return (
			<div className="h-80 w-full flex items-center justify-center">
				<div className="text-muted-foreground">Carregando evolução...</div>
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
				<div className="bg-white p-4 border rounded-lg shadow-lg">
					<p className="font-medium mb-2">{label}</p>
					{payload.map((entry: any, index: number) => (
						<p key={index} style={{ color: entry.color }} className="text-sm">
							{entry.name}: {formatCurrency(entry.value)}
						</p>
					))}
				</div>
			);
		}
		return null;
	};

	return (
		<DashboardErrorContainer
			isError={!!error}
			error={error}
			onRetry={fetchData}
		>
			{data.length === 0 ? (
				<div className="h-80 w-full flex flex-col items-center justify-center p-6 text-center border rounded-lg">
					<h3 className="text-lg font-medium mb-2">Sem dados de evolução</h3>
					<p className="text-muted-foreground mb-4">
						Você ainda não possui transações suficientes para visualizar a
						evolução mensal.
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
						{chartType === "line" ? (
							<LineChart
								data={data}
								margin={{
									top: 20,
									right: 30,
									left: 20,
									bottom: 5,
								}}
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="month" />
								<YAxis tickFormatter={formatCompactCurrency} />
								<Tooltip content={<CustomTooltip />} />
								<Legend />
								<Line
									type="monotone"
									dataKey="revenues"
									name="Receitas"
									stroke="#10b981"
									strokeWidth={3}
									dot={{ fill: "#10b981", strokeWidth: 2, r: 6 }}
								/>
								<Line
									type="monotone"
									dataKey="expenses"
									name="Despesas"
									stroke="#ef4444"
									strokeWidth={3}
									dot={{ fill: "#ef4444", strokeWidth: 2, r: 6 }}
								/>
								<Line
									type="monotone"
									dataKey="balance"
									name="Saldo"
									stroke="#6366f1"
									strokeWidth={3}
									strokeDasharray="5 5"
									dot={{ fill: "#6366f1", strokeWidth: 2, r: 6 }}
								/>
							</LineChart>
						) : (
							<BarChart
								data={data}
								margin={{
									top: 20,
									right: 30,
									left: 20,
									bottom: 5,
								}}
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="month" />
								<YAxis tickFormatter={formatCompactCurrency} />
								<Tooltip content={<CustomTooltip />} />
								<Legend />
								<Bar dataKey="revenues" name="Receitas" fill="#10b981" />
								<Bar dataKey="expenses" name="Despesas" fill="#ef4444" />
								<Bar dataKey="balance" name="Saldo" fill="#6366f1" />
							</BarChart>
						)}
					</ResponsiveContainer>
				</div>
			)}
		</DashboardErrorContainer>
	);
}
