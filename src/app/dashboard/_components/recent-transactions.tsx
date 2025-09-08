"use client";

import { useCallback, useEffect, useState } from "react";
import { DashboardErrorContainer } from "./dashboard-error";

type Transaction = {
	id: string;
	type: "expense" | "revenue";
	amount: number;
	description: string;
	date: string;
	category?: string;
};

type RecentTransactionsProps = {
	data?: Transaction[];
	isLoading?: boolean;
};

export function RecentTransactions({
	data,
	isLoading: initialLoading = false,
}: RecentTransactionsProps) {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [isLoading, setIsLoading] = useState(initialLoading);
	const [error, setError] = useState<string | null>(null);

	const fetchData = useCallback(async () => {
		if (data) {
			setTransactions(data);
			return;
		}

		try {
			setIsLoading(true);
			setError(null);

			const response = await fetch("/api/dashboard/recent-transactions");

			if (!response.ok) {
				throw new Error("Falha ao buscar transações recentes");
			}

			const transactionsData = await response.json();

			setTransactions(transactionsData);
		} catch (err) {
			console.error("Erro ao buscar transações recentes:", err);
			setError("Não foi possível carregar as transações recentes");

			// Não usar dados fictícios em caso de erro
			setTransactions([]);
		} finally {
			setIsLoading(false);
		}
	}, [data]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	if (isLoading) {
		return (
			<div className="w-full flex items-center justify-center py-8">
				<div className="text-muted-foreground">Carregando...</div>
			</div>
		);
	}

	return (
		<DashboardErrorContainer
			isError={!!error}
			error={error}
			onRetry={fetchData}
		>
			<div className="w-full">
				<div className="rounded-md border">
					<div className="bg-muted/50 p-4">
						<h3 className="font-medium">Transações Recentes</h3>
						<small className="text-xs text-muted-foreground block mt-1">
							Últimas 5 transações, para mais detalhes gere um{" "}
							<a
								href="/relatorios"
								className="text-primary hover:underline font-medium"
							>
								relatório
							</a>
						</small>
					</div>
					<div className="divide-y">
						{transactions.length === 0 ? (
							<div className="p-6 text-center">
								<p className="text-muted-foreground mb-4">
									Você ainda não possui transações registradas.
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
							transactions.map((transaction) => (
								<div
									key={transaction.id}
									className="p-4 flex items-center justify-between"
								>
									<div className="flex flex-col">
										<span className="font-medium">
											{transaction.description}
										</span>
										<div className="flex items-center gap-2">
											<span className="text-sm text-muted-foreground">
												{new Date(transaction.date).toLocaleDateString(
													"pt-BR",
													{ timeZone: "UTC" },
												)}
											</span>
											{transaction.category && (
												<>
													<span className="text-sm text-muted-foreground">
														•
													</span>
													<span className="text-sm text-muted-foreground">
														{transaction.category}
													</span>
												</>
											)}
										</div>
									</div>
									<div
										className={`font-medium ${
											transaction.type === "revenue"
												? "text-green-600"
												: "text-red-600"
										}`}
									>
										{transaction.type === "revenue" ? "+" : "-"}
										{new Intl.NumberFormat("pt-BR", {
											style: "currency",
											currency: "BRL",
										}).format(transaction.amount)}
									</div>
								</div>
							))
						)}
					</div>
				</div>
			</div>
		</DashboardErrorContainer>
	);
}
