"use client";

import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/utils";

interface RevenueStats {
	currentMonth: {
		revenues: number;
		revenueCount: number;
	};
	changes: {
		revenues: number;
	};
	avgDaily: number;
	largestRevenue: number;
}

interface RevenueStatsCardsProps {
	selectedYear?: number;
	selectedMonth?: number;
}

export function RevenueStatsCards({
	selectedYear,
	selectedMonth,
}: RevenueStatsCardsProps) {
	const [stats, setStats] = useState<RevenueStats | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const params = new URLSearchParams();
				if (selectedYear !== undefined)
					params.append("year", selectedYear.toString());
				if (selectedMonth !== undefined)
					params.append("month", selectedMonth.toString());

				const response = await fetch(
					`/api/dashboard/revenue-stats?${params.toString()}`,
				);
				if (response.ok) {
					const data = await response.json();
					setStats(data);
				}
			} catch (error) {
				console.error("Erro ao buscar estatísticas de receitas:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchStats();
	}, [selectedYear, selectedMonth]);

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

	const getCurrentMonthDays = () => {
		const now = new Date();
		return now.getDate(); // Current day of month
	};

	return (
		<div className="grid gap-4 md:grid-cols-3">
			{/* Total de Receitas do Mês */}
			<div className="rounded-lg border p-6">
				<div className="flex items-center justify-between">
					<div>
						<p className="text-sm font-medium text-muted-foreground">
							Total do Mês
						</p>
						<p className="text-2xl font-bold text-green-600">
							{formatCurrency(stats.currentMonth.revenues)}
						</p>
						<div className="flex items-center gap-1 mt-1">
							<span
								className={`text-sm ${getChangeColor(stats.changes.revenues)}`}
							>
								{getChangeIcon(stats.changes.revenues)}{" "}
								{formatChange(stats.changes.revenues)}
							</span>
							<span className="text-xs text-muted-foreground">
								vs mês anterior
							</span>
						</div>
					</div>
					<div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
						<span className="text-green-600 text-sm">💰</span>
					</div>
				</div>
				<p className="text-xs text-muted-foreground mt-2">
					{stats.currentMonth.revenueCount}{" "}
					{stats.currentMonth.revenueCount === 1 ? "receita" : "receitas"}{" "}
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
						<p className="text-2xl font-bold text-blue-600">
							{formatCurrency(stats.avgDaily)}
						</p>
						<p className="text-xs text-muted-foreground mt-1">
							Baseado nos {getCurrentMonthDays()} dias do mês
						</p>
					</div>
					<div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
						<span className="text-blue-600 text-sm">📊</span>
					</div>
				</div>
				<p className="text-xs text-muted-foreground mt-2">
					Entrada média por dia
				</p>
			</div>

			{/* Maior Receita */}
			<div className="rounded-lg border p-6">
				<div className="flex items-center justify-between">
					<div>
						<p className="text-sm font-medium text-muted-foreground">
							Maior Receita
						</p>
						<p className="text-2xl font-bold text-green-800">
							{formatCurrency(stats.largestRevenue)}
						</p>
						<p className="text-xs text-muted-foreground mt-1">
							Maior entrada do mês
						</p>
					</div>
					<div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center">
						<span className="text-green-800 text-sm">📈</span>
					</div>
				</div>
				<p className="text-xs text-muted-foreground mt-2">
					{stats.largestRevenue > 0 ? "Este mês" : "Nenhuma receita ainda"}
				</p>
			</div>
		</div>
	);
}
