"use client";

import { useState, useEffect, useMemo, useCallback } from "react"; // Adicionar useMemo, useCallback
import { useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { trpc } from "@/lib/trpc";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
} from "recharts";
import { formatCurrency } from "@/lib/utils";

// --- Zod Schemas ---
const CategorySchema = z.object({
	id: z.string(),
	name: z.string(),
	userId: z.string(),
	createdAt: z.string().datetime(), // Manter como string por enquanto, converter se necessário
	updatedAt: z.string().datetime(),
});
const CategoriesResponseSchema = z.array(CategorySchema);
type Category = z.infer<typeof CategorySchema>;

const PeriodSchema = z.object({
	start: z.string(),
	end: z.string(),
	label: z.string(),
});

const CategoryExpenseSchema = z.object({
	categoryId: z.string(),
	categoryName: z.string(),
	currentAmount: z.number().nonnegative(),
	previousAmount: z.number().nonnegative().nullable(),
	percentageChange: z.number().nullable(),
	percentageOfTotal: z.number().nonnegative(),
});
type CategoryExpense = z.infer<typeof CategoryExpenseSchema>;

const PeriodExpenseSchema = z.object({
	key: z.string(),
	label: z.string(),
	amount: z.number().nonnegative(),
});
type PeriodExpense = z.infer<typeof PeriodExpenseSchema>;

// Tipos de Relatório Discriminados
const BaseReportDataSchema = z.object({
	period: PeriodSchema,
	previousPeriod: PeriodSchema.nullable(),
});

const ExpensesByPeriodReportDataSchema = BaseReportDataSchema.extend({
	reportType: z.literal("byPeriod"),
	currentPeriodTotal: z.number().nonnegative(),
	previousPeriodTotal: z.number().nonnegative().nullable(),
	percentageChange: z.number().nullable(),
	expensesByCategory: z.array(CategoryExpenseSchema), // Despesas por categoria no período atual
	totalAmount: z.number().nonnegative(), // Total geral do período (redundante?)
});
type ExpensesByPeriodReportData = z.infer<
	typeof ExpensesByPeriodReportDataSchema
>;

const ExpensesByCategoryPeriodReportDataSchema = BaseReportDataSchema.extend({
	reportType: z.literal("byCategory"),
	category: z.object({
		id: z.string(),
		name: z.string(),
	}),
	expenses: z.array(PeriodExpenseSchema), // Despesas da categoria agrupadas (dia/semana/mês)
	totalAmount: z.number().nonnegative(), // Total da categoria no período
});
type ExpensesByCategoryPeriodReportData = z.infer<
	typeof ExpensesByCategoryPeriodReportDataSchema
>;

// União dos tipos de relatório
const ReportDataSchema = z.union([
	ExpensesByPeriodReportDataSchema,
	ExpensesByCategoryPeriodReportDataSchema,
]);
type ReportData = z.infer<typeof ReportDataSchema>;

// --- Funções Auxiliares ---

// Função para gerar cores HSL distintas (reutilizada)
const generateHslColor = (index: number, total: number): string => {
	const hue = (index * (360 / total)) % 360;
	return `hsl(${hue}, 70%, 50%)`;
};

// Função para truncar texto (reutilizada)
const truncateText = (text: string, maxLength: number): string => {
	if (text.length <= maxLength) return text;
	return `${text.substring(0, maxLength)}...`;
};

// Cores (pode ser removido se usarmos generateHslColor consistentemente)
const COLORS = [
	"#0088FE",
	"#00C49F",
	"#FFBB28",
	"#FF8042",
	"#8884D8",
	"#82CA9D",
	"#FFC658",
	"#8DD1E1",
];

// Remover props initialCategories
export function ReportsList() {
	// --- Estados dos Filtros ---
	const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
	const [startDate, setStartDate] = useState<string>("");
	const [endDate, setEndDate] = useState<string>("");
	const [compareWithPrevious, setCompareWithPrevious] =
		useState<boolean>(false);
	const [groupBy, setGroupBy] = useState<"month" | "week" | "day" | undefined>("month");
	const [reportType, setReportType] = useState<"byPeriod" | "byCategory">(
		"byPeriod",
	);
	const [formError, setFormError] = useState<string | null>(null); // Erro de validação do formulário

	const queryClient = useQueryClient();

	// --- Inicializar datas com o mês atual ---
	useEffect(() => {
		const today = new Date();
		const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
		const lastDayOfMonth = new Date(
			today.getFullYear(),
			today.getMonth() + 1,
			0,
		);
		setStartDate(firstDayOfMonth.toISOString().split("T")[0]);
		setEndDate(lastDayOfMonth.toISOString().split("T")[0]);
	}, []);

	// --- Query para buscar categorias via tRPC ---
	const {
		data: categoriesData = [],
		isLoading: isLoadingCategories,
		isError: isErrorCategories,
		error: errorCategories,
	} = trpc.categories.list.useQuery(
		undefined,
		{
			staleTime: 1000 * 60 * 15,
			gcTime: 1000 * 60 * 30,
		},
	);

	// --- Novo controle de execução da query de relatório ---
	const [isReportRequested, setIsReportRequested] = useState(false);

	const reportQuery =
		reportType === "byPeriod"
			? trpc.reports.expensesByPeriod.useQuery(
					{
						startDate: startDate || "",
						endDate: endDate || "",
						compareWithPrevious,
					},
					{
						enabled: isReportRequested && !!startDate && !!endDate,
					},
				)
			: trpc.reports.expensesByCategoryPeriod.useQuery(
					{
						categoryId: selectedCategoryId || "",
						startDate: startDate || "",
						endDate: endDate || "",
						groupBy,
					},
					{
						enabled:
							isReportRequested &&
							!!startDate &&
							!!endDate &&
							!!selectedCategoryId,
					},
				);

	// --- Handler para Gerar Relatório ---
	const handleGenerateReport = () => {
		setFormError(null); // Limpa erros antigos

		// Validação
		if (!startDate || !endDate) {
			setFormError("Por favor, selecione as datas de início e fim.");
			return;
		}
		if (new Date(startDate) > new Date(endDate)) {
			setFormError("A data inicial não pode ser maior que a data final.");
			return;
		}
		if (reportType === "byCategory" && !selectedCategoryId) {
			setFormError(
				"Por favor, selecione uma categoria para este tipo de relatório.",
			);
			return;
		}

		setIsReportRequested(true);
	};

	// --- Formatters Memoizados ---
	const formatValue = useCallback(
		(value: number | null | undefined): string => {
			if (value === null || value === undefined) return "N/A";
			return formatCurrency(value);
		},
		[],
	);

	const formatPercentage = useCallback(
		(value: number | null | undefined): string => {
			if (value === null || value === undefined || isNaN(value)) {
				return "N/A";
			}
			const prefix = value > 0 ? "+" : "";
			return `${prefix}${value.toFixed(2)}%`;
		},
		[],
	);

	const formatCompact = useCallback(
		(value: number | null | undefined): string => {
			if (value === null || value === undefined || isNaN(value)) {
				return "N/A";
			}
			return new Intl.NumberFormat("pt-BR", {
				notation: "compact",
				compactDisplay: "short",
			}).format(value);
		},
		[],
	);

	// --- Renderização Condicional dos Componentes do Relatório ---

	const ReportContent = () => {
		const data = reportQuery.data;

		// Estados de Carregamento e Erro da Query
		if (reportQuery.isFetching) {
			return (
				<div className="text-center text-muted-foreground p-8">
					Gerando relatório...
				</div>
			);
		}
		if (reportQuery.isError) {
			return (
				<div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-md mt-4">
					Erro ao gerar relatório: {reportQuery.error.message}
				</div>
			);
		}
		if (!data) {
			// Isso só deve acontecer se reportParams for null ou a query não foi habilitada
			return (
				<div className="text-center text-muted-foreground p-8">
					Configure e gere um relatório para ver os resultados.
				</div>
			);
		}

		// Narrowing seguro para os tipos de relatório
		if ((data as any).reportType === "byPeriod") {
			const d = data as any;
			const periodData = {
				period: d.period,
				previousPeriod: d.previousPeriod ?? null,
				reportType: "byPeriod" as const,
				currentPeriodTotal: d.currentPeriodTotal ?? 0,
				previousPeriodTotal: d.previousPeriodTotal ?? null,
				percentageChange: d.percentageChange ?? null,
				expensesByCategory: d.expensesByCategory ?? [],
				totalAmount: d.totalAmount ?? 0,
			};
			return (
				<ExpensesByPeriodReport
					reportData={periodData}
					compare={compareWithPrevious}
				/>
			);
		}
		if ((data as any).reportType === "byCategory") {
			const d = data as any;
			const categoryData = {
				period: d.period,
				previousPeriod: d.previousPeriod ?? null,
				reportType: "byCategory" as const,
				category: d.category,
				expenses: d.expenses ?? [],
				totalAmount: d.totalAmount ?? 0,
			};
			return <ExpensesByCategoryPeriodReport reportData={categoryData} />;
		}
		// Caso a união discriminada falhe (não deveria acontecer com Zod)
		return (
			<div className="text-red-500 p-4">
				Tipo de relatório desconhecido.
			</div>
		);
	};

	// Componentes específicos para cada tipo de relatório
	const ExpensesByPeriodReport = ({
		reportData,
		compare,
	}: { reportData: ExpensesByPeriodReportData; compare: boolean }) => {
		const categoryData = useMemo(
			() => reportData.expensesByCategory.filter((d) => d.currentAmount > 0),
			[reportData.expensesByCategory],
		);
		const colors = useMemo(
			() =>
				categoryData.map((_, i) => generateHslColor(i, categoryData.length)),
			[categoryData],
		);

		const renderLegend = useCallback((props: any) => {
			const { payload } = props;
			return (
				<ul
					style={{
						listStyle: "none",
						padding: 0,
						margin: "10px 0 0 0",
						textAlign: "center",
					}}
				>
					{payload.map((entry: any, index: number) => (
						<li
							key={`item-${index}`}
							style={{
								display: "inline-block",
								marginRight: "10px",
								color: entry.color,
							}}
						>
							<span
								style={{
									display: "inline-block",
									marginRight: "5px",
									width: "10px",
									height: "10px",
									backgroundColor: entry.color,
									borderRadius: "50%",
								}}
							></span>
							<span title={entry.payload.categoryName}>
								{truncateText(entry.payload.categoryName, 15)}
							</span>
						</li>
					))}
				</ul>
			);
		}, []);

		if (categoryData.length === 0) {
			return (
				<div className="text-center text-muted-foreground p-8">
					Nenhum dado de despesa por categoria neste período.
				</div>
			);
		}

		return (
			<div className="space-y-6">
				<div>
					<h3 className="text-lg font-semibold mb-2">
						Despesas por Categoria: {reportData.period.label}
					</h3>
					{compare && reportData.previousPeriod && (
						<p className="text-sm text-muted-foreground mb-4">
							Comparando com: {reportData.previousPeriod.label}
						</p>
					)}
				</div>
				<div className="bg-white p-4 rounded-lg border h-96">
					{" "}
					{/* Aumentar altura */}
					<ResponsiveContainer width="100%" height="100%">
						<PieChart>
							<Pie
								data={categoryData}
								cx="50%"
								cy="50%"
								labelLine={false}
								outerRadius={100}
								innerRadius={60}
								dataKey="currentAmount"
								nameKey="categoryName"
							>
								{categoryData.map((entry, index) => (
									<Cell key={`cell-${entry.categoryId}`} fill={colors[index]} />
								))}
							</Pie>
							<Tooltip formatter={(value) => formatValue(Number(value))} />
							<Legend content={renderLegend} />
						</PieChart>
					</ResponsiveContainer>
				</div>
				<div className="bg-white p-4 rounded-lg border">
					<h4 className="text-md font-semibold mb-3">Detalhes por Categoria</h4>
					<div className="overflow-x-auto">
						<table className="w-full border-collapse">
							<thead>
								<tr className="bg-secondary">
									<th className="border p-2 text-left">Categoria</th>
									<th className="border p-2 text-right">Valor Atual</th>
									{compare && (
										<>
											<th className="border p-2 text-right">Valor Anterior</th>
											<th className="border p-2 text-right">Variação</th>
										</>
									)}
									<th className="border p-2 text-right">% do Total</th>
								</tr>
							</thead>
							<tbody>
								{categoryData.map((item) => (
									<tr key={item.categoryId} className="hover:bg-muted/50">
										<td className="border p-2">{item.categoryName}</td>
										<td className="border p-2 text-right">
											{formatValue(item.currentAmount)}
										</td>
										{compare && (
											<>
												<td className="border p-2 text-right">
													{formatValue(item.previousAmount)}
												</td>
												<td
													className={`border p-2 text-right ${item.percentageChange && item.percentageChange > 0 ? "text-red-600" : item.percentageChange && item.percentageChange < 0 ? "text-green-600" : ""}`}
												>
													{formatPercentage(item.percentageChange)}
												</td>
											</>
										)}
										<td className="border p-2 text-right">
											{formatPercentage(item.percentageOfTotal)}
										</td>
									</tr>
								))}
								<tr className="bg-secondary font-bold">
									<td className="border p-2">Total</td>
									<td className="border p-2 text-right">
										{formatValue(reportData.currentPeriodTotal)}
									</td>
									{compare && (
										<>
											<td className="border p-2 text-right">
												{formatValue(reportData.previousPeriodTotal)}
											</td>
											<td
												className={`border p-2 text-right ${reportData.percentageChange && reportData.percentageChange > 0 ? "text-red-600" : reportData.percentageChange && reportData.percentageChange < 0 ? "text-green-600" : ""}`}
											>
												{formatPercentage(reportData.percentageChange)}
											</td>
										</>
									)}
									<td className="border p-2 text-right">100.00%</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	};

	const ExpensesByCategoryPeriodReport = ({
		reportData,
	}: { reportData: ExpensesByCategoryPeriodReportData }) => {
		const expenseData = useMemo(
			() => reportData.expenses.filter((d) => d.amount > 0),
			[reportData.expenses],
		);

		if (expenseData.length === 0) {
			return (
				<div className="text-center text-muted-foreground p-8">
					Nenhuma despesa encontrada para a categoria "
					{reportData.category.name}" neste período.
				</div>
			);
		}

		return (
			<div className="space-y-6">
				<div>
					<h3 className="text-lg font-semibold mb-2">
						Despesas da Categoria "{reportData.category.name}":{" "}
						{reportData.period.label}
					</h3>
					{reportData.previousPeriod && ( // Mostrar período anterior se existir (mesmo sem comparação direta neste tipo)
						<p className="text-sm text-muted-foreground mb-4">
							Período anterior (referência): {reportData.previousPeriod.label}
						</p>
					)}
				</div>
				<div className="bg-white p-4 rounded-lg border h-96">
					{" "}
					{/* Aumentar altura */}
					<ResponsiveContainer width="100%" height="100%">
						<BarChart
							data={expenseData}
							margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="label" />
							<YAxis tickFormatter={formatCompact} />
							<Tooltip formatter={(value) => formatValue(Number(value))} />
							<Legend />
							<Bar
								dataKey="amount"
								name="Valor"
								fill="#ef4444"
								radius={[4, 4, 0, 0]}
							/>
						</BarChart>
					</ResponsiveContainer>
				</div>
				<div className="bg-white p-4 rounded-lg border">
					<h4 className="text-md font-semibold mb-3">
						Detalhes por Período ({groupBy})
					</h4>
					<div className="overflow-x-auto">
						<table className="w-full border-collapse">
							<thead>
								<tr className="bg-secondary">
									<th className="border p-2 text-left">Período ({groupBy})</th>
									<th className="border p-2 text-right">Valor</th>
								</tr>
							</thead>
							<tbody>
								{expenseData.map((item) => (
									<tr key={item.key} className="hover:bg-muted/50">
										<td className="border p-2">{item.label}</td>
										<td className="border p-2 text-right">
											{formatValue(item.amount)}
										</td>
									</tr>
								))}
								<tr className="bg-secondary font-bold">
									<td className="border p-2">Total</td>
									<td className="border p-2 text-right">
										{formatValue(reportData.totalAmount)}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	};

	// --- Renderização Principal do Componente ---
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold">Relatórios</h1>
				<p className="text-muted-foreground">
					Gere relatórios detalhados de suas despesas
				</p>
			</div>

			<div className="rounded-lg border p-6">
				<div className="space-y-4">
					<div>
						<h2 className="text-xl font-semibold mb-4">
							Configurações do Relatório
						</h2>

						{/* Seção de Filtros */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
							<div>
								<label
									htmlFor="report-type"
									className="block text-sm font-medium mb-1"
								>
									Tipo de Relatório
								</label>
								<select
									id="report-type"
									className="w-full rounded-md border border-input p-2 disabled:opacity-50"
									value={reportType}
									onChange={(e) => {
										const value = e.target.value as "byPeriod" | "byCategory";
										setReportType(value);
										setIsReportRequested(false);
										setFormError(null);
									}}
									disabled={reportQuery.isFetching}
								>
									<option value="byPeriod">Despesas por Período</option>
									<option value="byCategory">Despesas por Categoria</option>
								</select>
							</div>

							{reportType === "byCategory" && (
								<div>
									<label
										htmlFor="category-select"
										className="block text-sm font-medium mb-1"
									>
										Categoria
									</label>
									<select
										id="category-select"
										className="w-full rounded-md border border-input p-2 disabled:opacity-50"
										value={selectedCategoryId}
										onChange={(e) => {
											setSelectedCategoryId(e.target.value);
											setIsReportRequested(false);
										}}
										disabled={isLoadingCategories || reportQuery.isFetching}
									>
										<option value="">
											{isLoadingCategories
												? "Carregando..."
												: "Selecione uma categoria"}
										</option>
										{categoriesData.map(
											(category: { id: string; name: string }) => (
												<option key={category.id} value={category.id}>
													{category.name}
												</option>
											),
										)}
									</select>
									{isErrorCategories && (
										<p className="text-xs text-red-500 mt-1">
											Erro ao carregar categorias.
										</p>
									)}
								</div>
							)}
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
							<div>
								<label
									htmlFor="start-date"
									className="block text-sm font-medium mb-1"
								>
									Data Inicial
								</label>
								<input
									id="start-date"
									type="date"
									className="w-full rounded-md border border-input p-2 disabled:opacity-50"
									value={startDate}
									onChange={(e) => {
										setStartDate(e.target.value);
										setIsReportRequested(false);
									}}
									disabled={reportQuery.isFetching}
								/>
							</div>
							<div>
								<label
									htmlFor="end-date"
									className="block text-sm font-medium mb-1"
								>
									Data Final
								</label>
								<input
									id="end-date"
									type="date"
									className="w-full rounded-md border border-input p-2 disabled:opacity-50"
									value={endDate}
									onChange={(e) => {
										setEndDate(e.target.value);
										setIsReportRequested(false);
									}}
									disabled={reportQuery.isFetching}
								/>
							</div>
						</div>

						{reportType === "byPeriod" && (
							<div className="mb-4">
								<label className="flex items-center">
									<input
										type="checkbox"
										className="mr-2 disabled:opacity-50"
										checked={compareWithPrevious}
										onChange={(e) => {
											setCompareWithPrevious(e.target.checked);
											setIsReportRequested(false);
										}}
										disabled={reportQuery.isFetching}
									/>
									<span className="text-sm">Comparar com período anterior</span>
								</label>
							</div>
						)}

						{reportType === "byCategory" && (
							<div className="mb-4">
								<label
									htmlFor="group-by"
									className="block text-sm font-medium mb-1"
								>
									Agrupar por
								</label>
								<select
									id="group-by"
									className="w-full rounded-md border border-input p-2 disabled:opacity-50"
									value={groupBy}
									onChange={(e) => {
										const value = e.target.value as "month" | "week" | "day";
										setGroupBy(value);
										setIsReportRequested(false);
									}}
									disabled={reportQuery.isFetching}
								>
									<option value="month">Mês</option>
									<option value="week">Semana</option>
									<option value="day">Dia</option>
								</select>
							</div>
						)}

						<button
							className="rounded-lg bg-black px-4 py-2 text-white hover:bg-black/90 disabled:opacity-50"
							type="button"
							onClick={handleGenerateReport}
							disabled={reportQuery.isFetching} // Desabilitar durante a busca
						>
							{reportQuery.isFetching ? "Gerando..." : "Gerar Relatório"}
						</button>
					</div>

					{/* Seção de Erros e Resultados */}
					{formError && (
						<div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-md mt-4">
							{formError}
						</div>
					)}

					{reportQuery.isError && (
						<div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-md mt-4">
							Erro ao gerar relatório: {reportQuery.error.message}
						</div>
					)}

					{/* Renderiza o conteúdo do relatório (inclui loading/error/data states) */}
					<div className="mt-8">
						<ReportContent />
					</div>
				</div>
			</div>
		</div>
	);
}
