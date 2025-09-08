"use client";

import { useRevenueStats } from "@/hooks/use-dashboard";
import { formatCurrency } from "@/lib/utils";

interface RevenueStatsCardsProps {
	selectedYear?: number;
	selectedMonth?: number;
}

export function RevenueStatsCards({
	selectedYear,
	selectedMonth,
}: RevenueStatsCardsProps) {
	const { data: stats, isLoading } = useRevenueStats({
		year: selectedYear,
		month: selectedMonth,
	});

	if (isLoading) {
		return (
			<div className="grid gap-4 md:grid-cols-3">
				{[1, 2, 3].map((i) => (
					<div key={i} className="rounded-lg border p-6 animate-pulse">
						<div className="h-4 bg-gray-200 rounded mb-2"></div>
						<div className="h-8 bg-gray-200 rounded mb-2"></div>
						<div className="h-3 bg-gray-200 rounded w-24"></div>
					</div>
				))}
			</div>
		);
	}

	if (!stats) {
		return null;
	}

	const getChangeColor = (change: number) => {
		// For revenues, positive change is good (green), negative change is bad (red)
		if (change > 0) return "text-green-600";
		if (change < 0) return "text-red-600";
		return "text-gray-600";
	};

	const getChangeIcon = (change: number) => {
		if (change > 0) return "↗";
		if (change < 0) return "↘";
		return "→";
	};

	const formatChange = (change: number) => {
		return `${change >= 0 ? "+" : ""}${change.toFixed(1)}%`;
	};

	const averagePerRevenue =
		stats.currentMonth.revenueCount > 0
			? stats.currentMonth.revenues / stats.currentMonth.revenueCount
			: 0;

	return (
		<div className="grid gap-4 md:grid-cols-3">
			{/* Total de Receitas do Mês */}
			<div className="rounded-lg border p-6">
				<div className="flex items-center justify-between">
					<div>
						<p className="text-sm font-medium text-muted-foreground">
							Total do Mês
						</p>
						<p className="text-2xl font-bold ">
							{formatCurrency(stats.currentMonth.revenues || 0)}
						</p>
						<div className="flex items-center gap-1 mt-1">
							<span
								className={`text-sm ${getChangeColor(stats.changes.revenues || 0)}`}
							>
								{getChangeIcon(stats.changes.revenues || 0)}{" "}
								{formatChange(stats.changes.revenues || 0)}
							</span>
							<span className="text-xs text-muted-foreground">
								vs mês anterior
							</span>
						</div>
					</div>
					<div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
						<span className="text-sm">💰</span>
					</div>
				</div>
				<p className="text-xs text-muted-foreground mt-2">
					{stats.currentMonth.revenueCount}{" "}
					{stats.currentMonth.revenueCount === 1 ? "receita" : "receitas"}{" "}
					registradas
				</p>
			</div>

			{/* Média de Receitas */}
			<div className="rounded-lg border p-6">
				<div className="flex items-center justify-between">
					<div>
						<p className="text-sm font-medium text-muted-foreground">
							Média por Receita
						</p>
						<p className="text-2xl font-bold ">
							{formatCurrency(averagePerRevenue)}
						</p>
						<p className="text-xs text-muted-foreground mt-1">
							Valor médio por transação
						</p>
					</div>
					<div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
						<span className="text-sm">📊</span>
					</div>
				</div>
			</div>

			{/* Maior Receita */}
			<div className="rounded-lg border p-6">
				<div className="flex items-center justify-between">
					<div>
						<p className="text-sm font-medium text-muted-foreground">
							Maior Receita
						</p>
						<p className="text-2xl font-bold ">
							{formatCurrency(stats.largestRevenue || 0)}
						</p>
						<p className="text-xs text-muted-foreground mt-1">
							Maior receita individual
						</p>
					</div>
					<div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center">
						<span className="text-sm">📈</span>
					</div>
				</div>
			</div>
		</div>
	);
}
