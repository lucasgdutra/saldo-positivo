"use client";

import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/utils";

interface MonthlyStats {
	currentMonth: {
		expenses: number;
		revenues: number;
		balance: number;
		expenseCount: number;
		revenueCount: number;
	};
	changes: {
		expenses: number;
		revenues: number;
		balance: number;
	};
}

export function MonthlyStatsCards() {
	const [stats, setStats] = useState<MonthlyStats | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const response = await fetch("/api/dashboard/monthly-stats");
				if (response.ok) {
					const data = await response.json();
					setStats(data);
				}
			} catch (error) {
				console.error("Erro ao buscar estatísticas mensais:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchStats();
	}, []);

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

	return (
		<div className="grid gap-4 md:grid-cols-3">
			{/* Receitas Card */}
			<div className="rounded-lg border p-6">
				<div className="flex items-center justify-between">
					<div>
						<p className="text-sm font-medium text-muted-foreground">
							Receitas do Mês
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
					{stats.currentMonth.revenueCount === 1 ? "transação" : "transações"}
				</p>
			</div>

			{/* Despesas Card */}
			<div className="rounded-lg border p-6">
				<div className="flex items-center justify-between">
					<div>
						<p className="text-sm font-medium text-muted-foreground">
							Despesas do Mês
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
					{stats.currentMonth.expenseCount === 1 ? "transação" : "transações"}
				</p>
			</div>

			{/* Saldo Card */}
			<div className="rounded-lg border p-6">
				<div className="flex items-center justify-between">
					<div>
						<p className="text-sm font-medium text-muted-foreground">
							Saldo do Mês
						</p>
						<p
							className={`text-2xl font-bold ${stats.currentMonth.balance >= 0 ? "text-green-600" : "text-red-600"}`}
						>
							{formatCurrency(stats.currentMonth.balance)}
						</p>
						<div className="flex items-center gap-1 mt-1">
							<span
								className={`text-sm ${getChangeColor(stats.changes.balance)}`}
							>
								{getChangeIcon(stats.changes.balance)}{" "}
								{formatChange(stats.changes.balance)}
							</span>
							<span className="text-xs text-muted-foreground">
								vs mês anterior
							</span>
						</div>
					</div>
					<div
						className={`w-8 h-8 ${stats.currentMonth.balance >= 0 ? "bg-green-100" : "bg-red-100"} rounded-full flex items-center justify-center`}
					>
						<span
							className={`${stats.currentMonth.balance >= 0 ? "text-green-600" : "text-red-600"} text-sm`}
						>
							{stats.currentMonth.balance >= 0 ? "📈" : "📉"}
						</span>
					</div>
				</div>
				<p className="text-xs text-muted-foreground mt-2">
					Receitas - Despesas
				</p>
			</div>
		</div>
	);
}
