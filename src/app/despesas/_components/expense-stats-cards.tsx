"use client";

import { useExpenseStats } from "@/hooks/use-dashboard";
import { formatCurrency } from "@/lib/utils";

interface ExpenseStatsCardsProps {
	selectedYear?: number;
	selectedMonth?: number;
	selectedCategoryId?: string;
}

export function ExpenseStatsCards({
	selectedYear,
	selectedMonth,
	selectedCategoryId,
}: ExpenseStatsCardsProps) {
	const { data: stats, isLoading } = useExpenseStats({
		year: selectedYear,
		month: selectedMonth,
		categoryId: selectedCategoryId,
	});

	if (isLoading) {
		return (
			<div className="grid gap-4 md:grid-cols-4">
				{[1, 2, 3, 4].map((i) => (
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
		// For expenses, positive change is bad (red), negative change is good (green)
		if (change > 0) return "text-red-600";
		if (change < 0) return "text-green-600";
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

	const averagePerExpense =
		stats.currentMonth.expenseCount > 0
			? stats.currentMonth.expenses / stats.currentMonth.expenseCount
			: 0;

	return (
		<div className="grid gap-4 md:grid-cols-4">
			{/* Total de Despesas do Mês */}
			<div className="rounded-lg border p-6">
				<div className="flex items-center justify-between">
					<div>
						<p className="text-sm font-medium text-muted-foreground">
							Total do Mês
						</p>
						<p className="text-2xl font-bold ">
							{formatCurrency(stats.currentMonth.expenses || 0)}
						</p>
						<div className="flex items-center gap-1 mt-1">
							<span
								className={`text-sm ${getChangeColor(stats.changes.expenses || 0)}`}
							>
								{getChangeIcon(stats.changes.expenses || 0)}{" "}
								{formatChange(stats.changes.expenses || 0)}
							</span>
							<span className="text-xs text-muted-foreground">
								vs mês anterior
							</span>
						</div>
					</div>
					<div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
						<span className="text-sm">💸</span>
					</div>
				</div>
				<p className="text-xs text-muted-foreground mt-2">
					{stats.currentMonth.expenseCount}{" "}
					{stats.currentMonth.expenseCount === 1 ? "despesa" : "despesas"}{" "}
					registradas
				</p>
			</div>

			{/* Média de Despesas */}
			<div className="rounded-lg border p-6">
				<div className="flex items-center justify-between">
					<div>
						<p className="text-sm font-medium text-muted-foreground">
							Média por Despesa
						</p>
						<p className="text-2xl font-bold ">
							{formatCurrency(averagePerExpense)}
						</p>
						<p className="text-xs text-muted-foreground mt-1">
							Valor médio por transação
						</p>
					</div>
					<div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
						<span className="text-sm">📊</span>
					</div>
				</div>
			</div>

			{/* Média Diária */}
			<div className="rounded-lg border p-6">
				<div className="flex items-center justify-between">
					<div>
						<p className="text-sm font-medium text-muted-foreground">
							Média Diária
						</p>
						<p className="text-2xl font-bold">
							{formatCurrency(stats.avgDaily || 0)}
						</p>
						<p className="text-xs text-muted-foreground mt-1">
							Gasto médio por dia
						</p>
					</div>
					<div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
						<span className="text-sm">📈</span>
					</div>
				</div>
			</div>

			{/* Maior Despesa */}
			<div className="rounded-lg border p-6">
				<div className="flex items-center justify-between">
					<div>
						<p className="text-sm font-medium text-muted-foreground">
							Maior Despesa
						</p>
						<p className="text-2xl font-bold text-gray-800">
							{formatCurrency(stats.largestExpense || 0)}
						</p>
						<p className="text-xs text-muted-foreground mt-1">
							Maior despesa individual
						</p>
					</div>
					<div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
						<span className="text-gray-600 text-sm">🏷️</span>
					</div>
				</div>
			</div>
		</div>
	);
}
