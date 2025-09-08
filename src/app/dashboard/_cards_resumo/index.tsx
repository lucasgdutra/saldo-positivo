import { ErrorBoundary } from "@/components/ui/error-boundary";
import { DashboardSummary } from "./dashboard-summary";

export default function Cards_Resumo() {
	return (
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
	);
}
