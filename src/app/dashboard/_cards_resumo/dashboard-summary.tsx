"use client";

import { useSession } from "next-auth/react";
import { CardDataWrapper } from "./card-data-wrapper";
import { CardUI } from "./card-ui";

export function DashboardSummary() {
	const { data: session } = useSession();

	if (!session?.user?.id) {
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

	return (
		<CardDataWrapper>
			{(data) => {
				const hasNoData =
					data.availableBalance === 0 &&
					data.currentBalance === 0 &&
					data.currentExpenses === 0;

				if (hasNoData) {
					return (
						<div className="rounded-lg border p-6 text-center">
							<h3 className="text-lg font-medium mb-2">
								Sem dados financeiros
							</h3>
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
					);
				}

				return (
					<div className="grid gap-4 md:grid-cols-3">
						<CardUI
							title="Saldo Total (Histórico Completo)"
							value={data.availableBalance}
							variant="balance"
						/>
						<CardUI
							title="Total de Receitas"
							value={data.currentBalance}
							variant="revenue"
						/>
						<CardUI
							title="Total de Despesas"
							value={data.currentExpenses}
							variant="expense"
						/>
					</div>
				);
			}}
		</CardDataWrapper>
	);
}
