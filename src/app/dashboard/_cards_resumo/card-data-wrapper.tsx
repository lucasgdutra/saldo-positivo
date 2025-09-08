"use client";

import { useQuery } from "@tanstack/react-query";
import { ReactNode } from "react";

type SummaryData = {
	availableBalance: number;
	currentBalance: number;
	currentExpenses: number;
};

interface CardDataWrapperProps {
	children: (data: SummaryData) => ReactNode;
}

async function fetchSummaryData(): Promise<SummaryData> {
	const balanceResponse = await fetch("/api/balance");

	if (!balanceResponse.ok) {
		throw new Error("Falha ao buscar dados de saldo");
	}

	const balanceData = await balanceResponse.json();

	return {
		currentExpenses: balanceData.totalExpenses,
		currentBalance: balanceData.totalRevenues,
		availableBalance: balanceData.totalAmount,
	};
}

export function CardDataWrapper({ children }: CardDataWrapperProps) {
	const { data, isLoading, error } = useQuery({
		queryKey: ["summary-data"],
		queryFn: fetchSummaryData,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});

	if (isLoading) {
		return (
			<div className="rounded-lg border p-4">
				<div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
				<div className="mt-2 h-8 w-32 animate-pulse rounded bg-gray-200" />
			</div>
		);
	}

	if (error || !data) {
		return (
			<div className="rounded-lg border p-4">
				<div className="text-sm text-red-600">Erro</div>
				<div className="mt-2 text-sm text-red-500">
					{error instanceof Error ? error.message : "Erro ao carregar dados"}
				</div>
			</div>
		);
	}

	return <>{children(data)}</>;
}
