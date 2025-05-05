"use client";

import { DashboardErrorContainer } from "./dashboard-error";
import { trpc } from "@/lib/trpc"; // Importa o trpc

export function DashboardSummary() {
	// Usa o hook tRPC para buscar o saldo
	const {
		data: summaryData, // Renomeia 'data' para 'summaryData' para manter a consistência
		isLoading,
		isError,
		error,
		refetch, // Função para tentar novamente
	} = trpc.balance.getCurrentBalance.useQuery(
		undefined, // Sem input para este query
		{
			// Opções do react-query (opcional)
			staleTime: 1000 * 60 * 5, // Cache por 5 minutos
			retry: (failureCount, error) => {
				// Não tentar novamente em caso de erro de autenticação
				if (error.data?.code === "UNAUTHORIZED") {
					return false;
				}
				// Tentar novamente até 3 vezes para outros erros
				return failureCount < 3;
			},
		},
	);

	if (isLoading) {
		return (
			<div className="grid gap-4 md:grid-cols-3">
				<div className="rounded-lg border p-4">
					<div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
					<div className="mt-2 h-8 w-32 animate-pulse rounded bg-gray-200" />
				</div>
				<div className="rounded-lg border p-4">
					<div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
					<div className="mt-2 h-8 w-32 animate-pulse rounded bg-gray-200" />
				</div>
				<div className="rounded-lg border p-4">
					<div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
					<div className="mt-2 h-8 w-32 animate-pulse rounded bg-gray-200" />
				</div>
			</div>
		);
	}

	// Ajusta a lógica para verificar os dados do tRPC
	const hasNoData =
		!isLoading &&
		!isError &&
		summaryData &&
		summaryData.totalAmount === 0 &&
		summaryData.totalRevenues === 0 &&
		summaryData.totalExpenses === 0;

	return (
		<DashboardErrorContainer
			isError={isError} // Usa o isError do hook
			error={error?.message ?? "Erro desconhecido ao buscar resumo."} // Usa a mensagem de erro do hook
			onRetry={refetch} // Usa a função refetch do hook
		>
			{hasNoData ? (
				<div className="rounded-lg border p-6 text-center">
					<h3 className="text-lg font-medium mb-2">Sem dados financeiros</h3>
					<p className="text-muted-foreground mb-4">
						Você ainda não possui receitas ou despesas registradas.
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
				<div className="grid gap-4 md:grid-cols-3">
					<div className="rounded-lg border p-4">
						<div className="text-sm text-muted-foreground">
							Saldo Total (Histórico Completo)
						</div>
						<div className="mt-2 text-2xl font-bold">
							{new Intl.NumberFormat("pt-BR", {
								style: "currency",
								currency: "BRL",
							}).format(summaryData?.totalAmount ?? 0)}
						</div>
					</div>

					<div className="rounded-lg border p-4">
						<div className="text-sm text-muted-foreground">
							Total de Receitas
						</div>
						<div className="mt-2 text-2xl font-bold text-green-600">
							{new Intl.NumberFormat("pt-BR", {
								style: "currency",
								currency: "BRL",
							}).format(summaryData?.totalRevenues ?? 0)}
						</div>
					</div>

					<div className="rounded-lg border p-4">
						<div className="text-sm text-muted-foreground">
							Total de Despesas
						</div>
						<div className="mt-2 text-2xl font-bold text-red-600">
							{new Intl.NumberFormat("pt-BR", {
								style: "currency",
								currency: "BRL",
							}).format(summaryData?.totalExpenses ?? 0)}
						</div>
					</div>
				</div>
			)}
		</DashboardErrorContainer>
	);
}
