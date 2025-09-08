"use client";

import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/utils";

interface ExpenseStats {
	currentMonth: {
		expenses: number;
		expenseCount: number;
	};
	changes: {
		expenses: number;
	};
	avgDaily: number;
	largestExpense: number;
}

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
	const [stats, setStats] = useState<ExpenseStats | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const params = new URLSearchParams();
				if (selectedYear !== undefined)
					params.append("year", selectedYear.toString());
				if (selectedMonth !== undefined)
					params.append("month", selectedMonth.toString());
				if (selectedCategoryId) params.append("categoryId", selectedCategoryId);

				const response = await fetch(
					`/api/dashboard/expense-stats?${params.toString()}`,
				);
				if (response.ok) {
					const data = await response.json();
					setStats(data);
				}
			} catch (error) {
				console.error("Erro ao buscar estatísticas de despesas:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchStats();
	}, [selectedYear, selectedMonth, selectedCategoryId]);

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

	const getCurrentMonthDays = () => {
		const now = new Date();
		return now.getDate(); // Current day of month
	};

	return (
		<div className="grid gap-4 md:grid-cols-3">
			{/* Total de Despesas do Mês */}
			<div className="rounded-lg border p-6">
				<div className="flex items-center justify-between">
					<div>
						<p className="text-sm font-medium text-muted-foreground">
							Total do Mês
						</p>
						<p className="text-2xl font-bold text-red-600">
							{formatCurrency(stats.currentMonth.expenses)}
						</p>
						<div className="flex items-center gap-1 mt-1">
							<span
								className={`text-sm ${getChangeColor(stats.changes.expenses)}`}
							>
								{getChangeIcon(stats.changes.expenses)}{" "}
								{formatChange(stats.changes.expenses)}
							</span>
							<span className="text-xs text-muted-foreground">
								vs mês anterior
							</span>
						</div>
					</div>
					<div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
						<span className="text-red-600 text-sm">💸</span>
					</div>
				</div>
				<p className="text-xs text-muted-foreground mt-2">
					{stats.currentMonth.expenseCount}{" "}
					{stats.currentMonth.expenseCount === 1 ? "despesa" : "despesas"}{" "}
					registradas
				</p>
			</div>

			{/* Média Diária */}
			<div className="rounded-lg border p-6">
				<div className="flex items-center justify-between">
					<div>
						<p className="text-sm font-medium text-muted-foreground">
							Média Diária
						</p>
						<p className="text-2xl font-bold text-orange-600">
							{formatCurrency(stats.avgDaily)}
						</p>
						<p className="text-xs text-muted-foreground mt-1">
							Baseado nos {getCurrentMonthDays()} dias do mês
						</p>
					</div>
					<div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
						<span className="text-orange-600 text-sm">📊</span>
					</div>
				</div>
				<p className="text-xs text-muted-foreground mt-2">
					Gasto médio por dia
				</p>
			</div>

			{/* Maior Despesa */}
			<div className="rounded-lg border p-6">
				<div className="flex items-center justify-between">
					<div>
						<p className="text-sm font-medium text-muted-foreground">
							Maior Despesa
						</p>
						<p className="text-2xl font-bold text-red-800">
							{formatCurrency(stats.largestExpense)}
						</p>
						<p className="text-xs text-muted-foreground mt-1">
							Maior gasto do mês
						</p>
					</div>
					<div className="w-8 h-8 bg-red-200 rounded-full flex items-center justify-center">
						<span className="text-red-800 text-sm">📈</span>
					</div>
				</div>
				<p className="text-xs text-muted-foreground mt-2">
					{stats.largestExpense > 0 ? "Este mês" : "Nenhuma despesa ainda"}
				</p>
			</div>
		</div>
	);
}
