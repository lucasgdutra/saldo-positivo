"use client";

import { useQuery } from "@tanstack/react-query";

// Types
type BalanceData = {
	month: string;
	receitas: number;
	despesas: number;
};

type Transaction = {
	id: string;
	type: "expense" | "revenue";
	amount: number;
	description: string;
	date: string;
	category?: string;
};

type ExpensesByCategoryData = {
	category: string;
	amount: number;
	color: string;
};

type MonthlyStatsData = {
	totalRevenues: number;
	totalExpenses: number;
	balance: number;
	previousMonthBalance?: number;
	revenueGrowth: number;
	expenseGrowth: number;
	balanceGrowth: number;
};

type RevenueStatsData = {
	currentMonth: {
		revenues: number;
		revenueCount: number;
	};
	changes: {
		revenues: number;
	};
	avgDaily: number;
	largestRevenue: number;
};

type ExpenseStatsData = {
	currentMonth: {
		expenses: number;
		expenseCount: number;
	};
	changes: {
		expenses: number;
	};
	avgDaily: number;
	largestExpense: number;
};

type MonthlyEvolutionData = {
	month: string;
	expenses: number;
	revenues: number;
	balance: number;
	fullDate: string;
};

// Hook for balance history
export function useBalanceHistory() {
	return useQuery<BalanceData[], Error>({
		queryKey: ["dashboard", "balance-history"],
		queryFn: async () => {
			const response = await fetch("/api/dashboard/balance-history");
			if (!response.ok) {
				throw new Error("Falha ao buscar dados do histórico de saldo");
			}
			return response.json();
		},
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
	});
}

// Hook for recent transactions
export function useRecentTransactions() {
	return useQuery<Transaction[], Error>({
		queryKey: ["dashboard", "recent-transactions"],
		queryFn: async () => {
			const response = await fetch("/api/dashboard/recent-transactions");
			if (!response.ok) {
				throw new Error("Falha ao buscar transações recentes");
			}
			return response.json();
		},
		staleTime: 2 * 60 * 1000, // 2 minutes
		gcTime: 5 * 60 * 1000, // 5 minutes
	});
}

// Hook for expenses by category
export function useExpensesByCategory() {
	return useQuery<ExpensesByCategoryData[], Error>({
		queryKey: ["dashboard", "expenses-by-category"],
		queryFn: async () => {
			const response = await fetch("/api/dashboard/expenses-by-category");
			if (!response.ok) {
				throw new Error("Falha ao buscar despesas por categoria");
			}
			return response.json();
		},
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
	});
}

// Hook for monthly stats
export function useMonthlyStats(params?: { year?: number; month?: number }) {
	const queryParams = new URLSearchParams();
	if (params?.year) queryParams.append("year", params.year.toString());
	if (params?.month) queryParams.append("month", params.month.toString());

	return useQuery<MonthlyStatsData, Error>({
		queryKey: ["dashboard", "monthly-stats", params],
		queryFn: async () => {
			const url = `/api/dashboard/monthly-stats${
				queryParams.toString() ? `?${queryParams.toString()}` : ""
			}`;
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error("Falha ao buscar estatísticas mensais");
			}
			return response.json();
		},
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
	});
}

// Hook for revenue stats
export function useRevenueStats(params?: { year?: number; month?: number }) {
	const queryParams = new URLSearchParams();
	if (params?.year) queryParams.append("year", params.year.toString());
	if (params?.month) queryParams.append("month", params.month.toString());

	return useQuery<RevenueStatsData, Error>({
		queryKey: ["dashboard", "revenue-stats", params],
		queryFn: async () => {
			const url = `/api/dashboard/revenue-stats${
				queryParams.toString() ? `?${queryParams.toString()}` : ""
			}`;
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error("Falha ao buscar estatísticas de receitas");
			}
			return response.json();
		},
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
	});
}

// Hook for expense stats
export function useExpenseStats(params?: {
	year?: number;
	month?: number;
	categoryId?: string;
}) {
	const queryParams = new URLSearchParams();
	if (params?.year) queryParams.append("year", params.year.toString());
	if (params?.month) queryParams.append("month", params.month.toString());
	if (params?.categoryId) queryParams.append("categoryId", params.categoryId);

	return useQuery<ExpenseStatsData, Error>({
		queryKey: ["dashboard", "expense-stats", params],
		queryFn: async () => {
			const url = `/api/dashboard/expense-stats${
				queryParams.toString() ? `?${queryParams.toString()}` : ""
			}`;
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error("Falha ao buscar estatísticas de despesas");
			}
			return response.json();
		},
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
	});
}

// Hook for monthly evolution
export function useMonthlyEvolution(params?: { categoryId?: string }) {
	const queryParams = new URLSearchParams();
	if (params?.categoryId) queryParams.append("categoryId", params.categoryId);

	return useQuery<MonthlyEvolutionData[], Error>({
		queryKey: ["dashboard", "monthly-evolution", params],
		queryFn: async () => {
			const url = `/api/dashboard/monthly-evolution${
				queryParams.toString() ? `?${queryParams.toString()}` : ""
			}`;
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error("Falha ao buscar dados de evolução mensal");
			}
			return response.json();
		},
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
	});
}
