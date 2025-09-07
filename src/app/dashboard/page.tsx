import { AuthGuard } from "@/components/auth/auth-guard";
import {
	BalanceChart,
	DashboardSummary,
	ExpensesByCategoryChart,
	RecentTransactions,
} from "@/components/dashboard";
import { AppLayout } from "@/components/layout/app-layout";
import { ErrorBoundary } from "@/components/ui/error-boundary";

export default function DashboardPage() {
	return (
		<AuthGuard requireAuth>
			<AppLayout>
				<ErrorBoundary>
					<div className="space-y-8">
						<div>
							<h1 className="text-3xl font-bold">Dashboard</h1>
							<p className="text-muted-foreground">
								Bem-vindo ao seu painel de controle financeiro
							</p>
						</div>

						{/* Cards de resumo */}
						<ErrorBoundary
							fallback={
								<div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
									<h3 className="text-lg font-medium">
										Erro ao carregar resumo financeiro
									</h3>
									<p className="mt-2 text-sm">
										Não foi possível carregar os dados de resumo financeiro.
									</p>
								</div>
							}
						>
							<DashboardSummary />
						</ErrorBoundary>

						{/* Gráficos */}
						<div className="grid gap-6 md:grid-cols-2">
							<ErrorBoundary
								fallback={
									<div className="rounded-lg border p-4">
										<h2 className="text-lg font-medium mb-4">
											Receitas vs Despesas
										</h2>
										<div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
											<h3 className="text-lg font-medium">
												Erro ao carregar gráfico
											</h3>
											<p className="mt-2 text-sm">
												Não foi possível carregar o gráfico de receitas e
												despesas.
											</p>
										</div>
									</div>
								}
							>
								<div className="rounded-lg border p-4">
									<h2 className="text-lg font-medium mb-4">
										Receitas vs Despesas
									</h2>
									<BalanceChart />
								</div>
							</ErrorBoundary>

							<ErrorBoundary
								fallback={
									<div className="rounded-lg border p-4">
										<h2 className="text-lg font-medium mb-4">
											Despesas por Categoria
										</h2>
										<div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
											<h3 className="text-lg font-medium">
												Erro ao carregar gráfico
											</h3>
											<p className="mt-2 text-sm">
												Não foi possível carregar o gráfico de despesas por
												categoria.
											</p>
										</div>
									</div>
								}
							>
								<div className="rounded-lg border p-4">
									<h2 className="text-lg font-medium mb-4">
										Despesas por Categoria
									</h2>
									<ExpensesByCategoryChart />
								</div>
							</ErrorBoundary>
						</div>

						{/* Transações Recentes */}
						<ErrorBoundary
							fallback={
								<div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
									<h3 className="text-lg font-medium">
										Erro ao carregar transações
									</h3>
									<p className="mt-2 text-sm">
										Não foi possível carregar as transações recentes.
									</p>
								</div>
							}
						>
							<div>
								<RecentTransactions />
							</div>
						</ErrorBoundary>
					</div>
				</ErrorBoundary>
			</AppLayout>
		</AuthGuard>
	);
}
