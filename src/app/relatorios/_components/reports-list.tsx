"use client";

import {
	eachDayOfInterval,
	eachMonthOfInterval,
	eachQuarterOfInterval,
	eachWeekOfInterval,
	eachYearOfInterval,
	format,
	getWeek,
} from "date-fns";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { getPeriodDates } from "@/lib/period-dates";
import { formatCurrency } from "@/lib/utils";
import { TransactionList } from "./transaction-list";

interface Category {
	id: string;
	name: string;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
}

interface ReportsListProps {
	initialCategories: Category[];
}

interface CategoryExpense {
	categoryId: string;
	categoryName: string;
	currentAmount: number;
	previousAmount: number | null;
	percentageChange: number | null;
	percentageOfTotal: number;
}

interface PeriodExpense {
	key: string;
	label: string;
	amount: number;
}

interface PeriodReportData {
	period: string;
	total: number;
	categories: {
		categoryId: string;
		categoryName: string;
		amount: number;
	}[];
}

interface ReportData {
	period?: {
		start: string;
		end: string;
		label: string;
	};
	previousPeriod?: {
		start: string;
		end: string;
		label: string;
	} | null;
	category?: {
		id: string;
		name: string;
	};
	currentPeriodTotal?: number;
	previousPeriodTotal?: number | null;
	percentageChange?: number | null;
	expensesByCategory?: CategoryExpense[];
	expenses?: PeriodExpense[];
	totalAmount?: number;

	// Fields for comparePeriods report
	compareData?: PeriodReportData[];
}

// Cores para os gráficos
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

export function ReportsList({ initialCategories }: ReportsListProps) {
	const [categories, setCategories] = useState<Category[]>(initialCategories);
	const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
	const [startDate, setStartDate] = useState<string>("");
	const [endDate, setEndDate] = useState<string>("");
	const [compareWithPrevious, setCompareWithPrevious] =
		useState<boolean>(false);
	const [groupBy, setGroupBy] = useState<string>("month");
	const [reportType, setReportType] = useState<string>("byPeriod");
	const [granularity, setGranularity] = useState<string>("month");
	const [startPeriod, setStartPeriod] = useState<string>("");
	const [endPeriod, setEndPeriod] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [reportData, setReportData] = useState<ReportData | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [periodRange, setPeriodRange] = useState<{
		minDate: string;
		maxDate: string;
	} | null>(null);
	const [expandedRows, setExpandedRows] = useState<string[]>([]);
	const [reportDateRange, setReportDateRange] = useState<{
		startDate: string;
		endDate: string;
	} | null>(null);
	const router = useRouter();

	const handleToggleRow = (categoryId: string) => {
		setExpandedRows((current) =>
			current.includes(categoryId)
				? current.filter((id) => id !== categoryId)
				: [...current, categoryId],
		);
	};

	useEffect(() => {
		const fetchPeriodRange = async () => {
			const response = await fetch("/api/reports/expenses-period-range");
			const data = await response.json();
			setPeriodRange(data);
		};
		fetchPeriodRange();
	}, []);

	// Inicializar datas com o mês atual
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

	const generatePeriodOptions = (granularity: string) => {
		if (!periodRange || !periodRange.minDate) return [];

		const options: { value: string; label: string }[] = [];
		const interval = {
			start: new Date(periodRange.minDate),
			end: new Date(periodRange.maxDate),
		};

		switch (granularity) {
			case "year":
				eachYearOfInterval(interval).forEach((date) => {
					const year = date.getFullYear();
					options.push({ value: `${year}`, label: `${year}` });
				});
				break;
			case "quarter":
				eachQuarterOfInterval(interval).forEach((date) => {
					const year = date.getFullYear();
					const quarter = Math.ceil((date.getMonth() + 1) / 3);
					options.push({
						value: `${year}-Q${quarter}`,
						label: `T${quarter} ${year}`,
					});
				});
				break;
			case "month":
				eachMonthOfInterval(interval).forEach((date) => {
					const year = date.getFullYear();
					const month = date.getMonth() + 1;
					const monthString = month < 10 ? `0${month}` : `${month}`;
					options.push({
						value: `${year}-${monthString}`,
						label: `${monthString}/${year}`,
					});
				});
				break;
			case "week":
				eachWeekOfInterval(interval).forEach((date) => {
					const year = date.getFullYear();
					const week = getWeek(date);
					const weekString = week < 10 ? `0${week}` : `${week}`;
					options.push({
						value: `${year}-W${weekString}`,
						label: `Semana ${weekString}, ${year}`,
					});
				});
				break;
			case "day":
				eachDayOfInterval(interval).forEach((date) => {
					const dateString = date.toISOString().split("T")[0];
					options.push({
						value: dateString,
						label: date.toLocaleDateString("pt-BR"),
					});
				});
				break;
		}
		return options.reverse();
	};

	useEffect(() => {
		const options = generatePeriodOptions(granularity);
		if (options.length > 1) {
			setStartPeriod(options[1]?.value || options[0].value);
			setEndPeriod(options[0].value);
		} else if (options.length > 0) {
			setStartPeriod(options[0].value);
			setEndPeriod(options[0].value);
		}
	}, [granularity, periodRange]);

	const handleGenerateReport = async () => {
		if (reportType !== "comparePeriods" && (!startDate || !endDate)) {
			setError("Por favor, selecione as datas de início e fim.");
			return;
		}

		if (reportType === "byCategory" && !selectedCategoryId) {
			setError("Por favor, selecione uma categoria.");
			return;
		}

		if (reportType === "comparePeriods" && (!startPeriod || !endPeriod)) {
			setError("Por favor, preencha os períodos inicial e final.");
			return;
		}

		setIsLoading(true);
		setError(null);
		setReportData(null);

		try {
			let url = "";
			if (reportType === "byPeriod") {
				url = `/api/reports/expenses-by-period?startDate=${startDate}&endDate=${endDate}&compareWithPrevious=${compareWithPrevious}`;
			} else if (reportType === "byCategory") {
				url = `/api/reports/expenses-by-category-period?categoryId=${selectedCategoryId}&startDate=${startDate}&endDate=${endDate}&groupBy=${groupBy}`;
			} else if (reportType === "comparePeriods") {
				const { startDate: start, endDate: end } = getPeriodDates(
					endPeriod,
					granularity,
				);
				const { startDate: startOfStart } = getPeriodDates(
					startPeriod,
					granularity,
				);
				setReportDateRange({
					startDate: startOfStart.toISOString(),
					endDate: end.toISOString(),
				});
				url = `/api/reports/compare-expenses?granularity=${granularity}&startDate=${startOfStart.toISOString()}&endDate=${end.toISOString()}`;
			}

			if (url) {
				const response = await fetch(url);

				if (!response.ok) {
					throw new Error("Falha ao gerar relatório");
				}

				const data = await response.json();
				if (reportType === "comparePeriods") {
					setReportData({ compareData: data });
				} else {
					setReportData(data);
				}
			}
		} catch (err) {
			console.error("Erro ao gerar relatório:", err);
			setError("Não foi possível gerar o relatório. Tente novamente.");
		} finally {
			setIsLoading(false);
		}
	};

	// Formatar valor como moeda
	const formatValue = (value: number) => {
		return formatCurrency(value);
	};

	// Formatar porcentagem
	const formatPercentage = (value: number) => {
		return `${value.toFixed(2)}%`;
	};

	const formatPeriod = (period: string, granularity: string) => {
		const date = new Date(period);
		const offset = date.getTimezoneOffset();
		const adjustedDate = new Date(date.getTime() + offset * 60 * 1000);

		switch (granularity) {
			case "year":
				return format(adjustedDate, "yyyy");
			case "quarter":
				return `${format(adjustedDate, "yyyy")}-Q${Math.ceil((adjustedDate.getMonth() + 1) / 3)}`;
			case "month":
				return format(adjustedDate, "MM/yyyy");
			case "week":
				return `Semana ${getWeek(adjustedDate)}, ${format(adjustedDate, "yyyy")}`;
			case "day":
				return format(adjustedDate, "dd/MM/yyyy");
			default:
				return period;
		}
	};

	const renderComparePeriodsChart = () => {
		if (!reportData || !reportData.compareData) {
			return (
				<div className="text-center text-muted-foreground p-8">
					Nenhum dado disponível para o período selecionado.
				</div>
			);
		}

		const chartData = reportData.compareData.map((periodData) => {
			const periodObject: { [key: string]: any } = {
				period: formatPeriod(periodData.period, granularity),
			};
			periodData.categories.forEach((cat) => {
				periodObject[cat.categoryName] = cat.amount;
			});
			return periodObject;
		});

		return (
			<div className="h-80 w-full">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart data={chartData}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="period" />
						<YAxis />
						<Tooltip formatter={(value) => formatValue(Number(value))} />
						<Legend />
						{categories.map((cat, index) => (
							<Bar
								key={cat.id}
								dataKey={cat.name}
								stackId="a"
								fill={COLORS[index % COLORS.length]}
							/>
						))}
					</BarChart>
				</ResponsiveContainer>
			</div>
		);
	};

	const renderComparePeriodsTable = () => {
		if (!reportData || !reportData.compareData) {
			return null;
		}
		const compareData = reportData.compareData;

		const periods = compareData.map((p) => p.period);
		const allCategoryNames = Array.from(
			new Set(
				compareData.flatMap((p) => p.categories.map((c) => c.categoryName)),
			),
		);

		const allCategories = allCategoryNames.map((name) => {
			return compareData
				.flatMap((p) => p.categories)
				.find((c) => c.categoryName === name)!;
		});

		const categoryTotals = allCategories.map((category) => {
			return compareData.reduce((acc, periodData) => {
				const categoryData = periodData.categories.find(
					(c) => c.categoryId === category.categoryId,
				);
				return acc + (categoryData ? categoryData.amount : 0);
			}, 0);
		});

		const periodTotals = compareData.map((p) => p.total);
		const grandTotal = periodTotals.reduce((acc, total) => acc + total, 0);

		return (
			<div className="overflow-x-auto">
				<table className="w-full border-collapse">
					<thead>
						<tr className="bg-secondary">
							<th className="border p-2 text-left">Categoria</th>
							{periods.map((period) => (
								<th key={period} className="border p-2 text-right">
									{formatPeriod(period, granularity)}
								</th>
							))}
							<th className="border p-2 text-right">Total</th>
						</tr>
					</thead>
					<tbody>
						{allCategories.map((category, index) => (
							<>
								<tr
									key={category.categoryId}
									onClick={() => handleToggleRow(category.categoryId)}
									className="cursor-pointer"
								>
									<td className="border p-2">
										<span className="font-mono mr-2">
											{expandedRows.includes(category.categoryId)
												? "[-]"
												: "[+]"}
										</span>
										{category.categoryName}
									</td>
									{periods.map((period) => {
										const periodData = compareData.find(
											(p) => p.period === period,
										);
										const categoryData = periodData?.categories.find(
											(c) => c.categoryId === category.categoryId,
										);
										return (
											<td key={period} className="border p-2 text-right">
												{categoryData ? formatValue(categoryData.amount) : "-"}
											</td>
										);
									})}
									<td className="border p-2 text-right font-bold">
										{formatValue(categoryTotals[index])}
									</td>
								</tr>
								{expandedRows.includes(category.categoryId) &&
									reportDateRange && (
										<tr>
											<td colSpan={periods.length + 2}>
												<div className="p-4 bg-gray-100">
													<TransactionList
														categoryId={category.categoryId}
														startDate={reportDateRange.startDate}
														endDate={reportDateRange.endDate}
													/>
												</div>
											</td>
										</tr>
									)}
							</>
						))}
					</tbody>
					<tfoot>
						<tr className="bg-secondary font-bold">
							<td className="border p-2">Total</td>
							{periodTotals.map((total, index) => (
								<td key={index} className="border p-2 text-right">
									{formatValue(total)}
								</td>
							))}
							<td className="border p-2 text-right">
								{formatValue(grandTotal)}
							</td>
						</tr>
					</tfoot>
				</table>
			</div>
		);
	};

	// Renderizar gráfico de despesas por categoria
	const renderExpensesByCategoryChart = () => {
		if (
			!reportData ||
			!reportData.expensesByCategory ||
			reportData.expensesByCategory.length === 0 ||
			reportType !== "byPeriod"
		) {
			return (
				<div className="text-center text-muted-foreground p-8">
					Nenhum dado disponível para o período selecionado.
				</div>
			);
		}

		return (
			<div className="h-80 w-full">
				<ResponsiveContainer width="100%" height="100%">
					<PieChart margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
						<Pie
							data={reportData.expensesByCategory.filter(
								(item) => item.currentAmount > 0,
							)}
							cx="50%"
							cy="50%"
							labelLine={false}
							outerRadius={80}
							innerRadius={0}
							fill="#8884d8"
							dataKey="currentAmount"
							nameKey="categoryName"
							label={({ categoryName, percent }) =>
								`${categoryName}: ${(percent * 100).toFixed(0)}%`
							}
						>
							{reportData.expensesByCategory
								.filter((item) => item.currentAmount > 0)
								.map((entry: CategoryExpense, index: number) => (
									<Cell
										key={`cell-${entry.categoryId}-${index}`}
										fill={COLORS[index % COLORS.length]}
									/>
								))}
						</Pie>
						<Tooltip formatter={(value) => formatValue(Number(value))} />
						<Legend />
					</PieChart>
				</ResponsiveContainer>
			</div>
		);
	};

	// Renderizar gráfico de despesas por período
	const renderExpensesByPeriodChart = () => {
		if (
			!reportData ||
			!reportData.expenses ||
			reportData.expenses.length === 0 ||
			reportType !== "byCategory"
		) {
			return (
				<div className="text-center text-muted-foreground p-8">
					Nenhum dado disponível para o período selecionado.
				</div>
			);
		}

		return (
			<div className="h-80 w-full">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						data={reportData.expenses.filter((item) => item.amount > 0)}
						margin={{
							top: 20,
							right: 30,
							left: 20,
							bottom: 60,
						}}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis
							dataKey="label"
							angle={-30}
							textAnchor="end"
							height={60}
							interval={0}
						/>
						<YAxis
							tickFormatter={(value) =>
								new Intl.NumberFormat("pt-BR", {
									notation: "compact",
									compactDisplay: "short",
								}).format(value)
							}
						/>
						<Tooltip formatter={(value) => formatValue(Number(value))} />
						<Legend />
						<Bar dataKey="amount" name="Valor" fill="#ef4444" />
					</BarChart>
				</ResponsiveContainer>
			</div>
		);
	};

	// Renderizar tabela de despesas por categoria
	const renderExpensesByCategoryTable = () => {
		if (
			!reportData ||
			!reportData.expensesByCategory ||
			reportData.expensesByCategory.length === 0 ||
			reportType !== "byPeriod"
		) {
			return null;
		}

		return (
			<div className="overflow-x-auto">
				<table className="w-full border-collapse">
					<thead>
						<tr className="bg-secondary">
							<th className="border p-2 text-left">Categoria</th>
							<th className="border p-2 text-right">Valor Atual</th>
							{compareWithPrevious && (
								<>
									<th className="border p-2 text-right">Valor Anterior</th>
									<th className="border p-2 text-right">Variação</th>
								</>
							)}
							<th className="border p-2 text-right">% do Total</th>
						</tr>
					</thead>
					<tbody>
						{reportData.expensesByCategory.map((item: CategoryExpense) => (
							<tr
								key={item.categoryId}
								className={
									item.categoryId.charCodeAt(0) % 2 === 0
										? "bg-white"
										: "bg-gray-50"
								}
							>
								<td className="border p-2">{item.categoryName}</td>
								<td className="border p-2 text-right">
									{formatValue(item.currentAmount)}
								</td>
								{compareWithPrevious && (
									<>
										<td className="border p-2 text-right">
											{formatValue(item.previousAmount || 0)}
										</td>
										<td className="border p-2 text-right">
											{item.percentageChange !== null
												? formatPercentage(item.percentageChange)
												: "N/A"}
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
								{formatValue(reportData.currentPeriodTotal ?? 0)}
							</td>
							{compareWithPrevious && (
								<>
									<td className="border p-2 text-right">
										{reportData.previousPeriodTotal !== null
											? formatValue(reportData.previousPeriodTotal ?? 0)
											: "N/A"}
									</td>
									<td className="border p-2 text-right">
										{reportData.percentageChange !== null
											? formatPercentage(reportData.percentageChange ?? 0)
											: "N/A"}
									</td>
								</>
							)}
							<td className="border p-2 text-right">100%</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	};

	// Renderizar tabela de despesas por período
	const renderExpensesByPeriodTable = () => {
		if (
			!reportData ||
			!reportData.expenses ||
			reportData.expenses.length === 0 ||
			reportType !== "byCategory"
		) {
			return null;
		}

		return (
			<div className="overflow-x-auto">
				<table className="w-full border-collapse">
					<thead>
						<tr className="bg-secondary">
							<th className="border p-2 text-left">Período</th>
							<th className="border p-2 text-right">Valor</th>
						</tr>
					</thead>
					<tbody>
						{reportData.expenses.map((item: PeriodExpense) => (
							<tr
								key={item.key}
								className={
									item.key.charCodeAt(0) % 2 === 0 ? "bg-white" : "bg-gray-50"
								}
							>
								<td className="border p-2">{item.label}</td>
								<td className="border p-2 text-right">
									{formatValue(item.amount)}
								</td>
							</tr>
						))}
						<tr className="bg-secondary font-bold">
							<td className="border p-2">Total</td>
							<td className="border p-2 text-right">
								{formatValue(reportData.totalAmount ?? 0)}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	};

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
									className="w-full rounded-md border border-input p-2"
									value={reportType}
									onChange={(e) => {
										setReportType(e.target.value);
										setReportData(null); // Limpar dados do relatório ao mudar o tipo
									}}
								>
									<option value="byPeriod">Despesas por Período</option>
									<option value="byCategory">Despesas por Categoria</option>
									<option value="comparePeriods">Comparar Períodos</option>
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
										className="w-full rounded-md border border-input p-2"
										value={selectedCategoryId}
										onChange={(e) => setSelectedCategoryId(e.target.value)}
									>
										<option value="">Selecione uma categoria</option>
										{categories.map((category) => (
											<option key={category.id} value={category.id}>
												{category.name}
											</option>
										))}
									</select>
								</div>
							)}
							{reportType === "comparePeriods" && (
								<>
									<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
										<div>
											<label
												htmlFor="granularity-select"
												className="block text-sm font-medium mb-1"
											>
												Granularidade
											</label>
											<select
												id="granularity-select"
												className="w-full rounded-md border border-input p-2"
												value={granularity}
												onChange={(e) => setGranularity(e.target.value)}
											>
												<option value="year">Ano</option>
												<option value="quarter">Trimestre</option>
												<option value="month">Mês</option>
												<option value="week">Semana</option>
												<option value="day">Dia</option>
											</select>
										</div>
										<div>
											<label
												htmlFor="start-period-select"
												className="block text-sm font-medium mb-1"
											>
												Período Inicial
											</label>
											<select
												id="start-period-select"
												className="w-full rounded-md border border-input p-2"
												value={startPeriod}
												onChange={(e) => setStartPeriod(e.target.value)}
											>
												{generatePeriodOptions(granularity).map((option) => (
													<option key={option.value} value={option.value}>
														{option.label}
													</option>
												))}
											</select>
										</div>
										<div>
											<label
												htmlFor="end-period-select"
												className="block text-sm font-medium mb-1"
											>
												Período Final
											</label>
											<select
												id="end-period-select"
												className="w-full rounded-md border border-input p-2"
												value={endPeriod}
												onChange={(e) => setEndPeriod(e.target.value)}
											>
												{generatePeriodOptions(granularity).map((option) => (
													<option key={option.value} value={option.value}>
														{option.label}
													</option>
												))}
											</select>
										</div>
									</div>
								</>
							)}
						</div>

						{reportType !== "comparePeriods" && (
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
										className="w-full rounded-md border border-input p-2"
										value={startDate}
										onChange={(e) => setStartDate(e.target.value)}
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
										className="w-full rounded-md border border-input p-2"
										value={endDate}
										onChange={(e) => setEndDate(e.target.value)}
									/>
								</div>
							</div>
						)}

						{reportType === "byPeriod" && (
							<div className="mb-4">
								<label className="flex items-center">
									<input
										type="checkbox"
										className="mr-2"
										checked={compareWithPrevious}
										onChange={(e) => setCompareWithPrevious(e.target.checked)}
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
									className="w-full rounded-md border border-input p-2"
									value={groupBy}
									onChange={(e) => setGroupBy(e.target.value)}
								>
									<option value="month">Mês</option>
									<option value="week">Semana</option>
									<option value="day">Dia</option>
								</select>
							</div>
						)}

						<button
							className="rounded-lg bg-black px-4 py-2 text-white hover:bg-black/90"
							type="button"
							onClick={handleGenerateReport}
							disabled={isLoading}
						>
							{isLoading ? "Gerando..." : "Gerar Relatório"}
						</button>
					</div>

					{error && (
						<div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-md">
							{error}
						</div>
					)}

					{reportData && (
						<div className="space-y-6 mt-8">
							<div>
								<h3 className="text-lg font-semibold mb-2">
									{reportType === "byPeriod"
										? `Despesas por Período: ${reportData.period?.label || ""}`
										: reportType === "byCategory"
											? `Despesas da Categoria ${reportData.category?.name || "Selecionada"}: ${reportData.period?.label || ""}`
											: `Comparação de Despesas`}
								</h3>

								{reportType === "byPeriod" &&
									compareWithPrevious &&
									reportData.previousPeriod && (
										<p className="text-sm text-muted-foreground mb-4">
											Comparando com período anterior:{" "}
											{reportData.previousPeriod.label}
										</p>
									)}
							</div>

							{reportData && (
								<>
									<div className="bg-white p-4 rounded-lg border">
										{reportType === "byPeriod"
											? renderExpensesByCategoryChart()
											: reportType === "byCategory"
												? renderExpensesByPeriodChart()
												: renderComparePeriodsChart()}
									</div>

									<div className="bg-white p-4 rounded-lg border">
										{reportType === "byPeriod"
											? renderExpensesByCategoryTable()
											: reportType === "byCategory"
												? renderExpensesByPeriodTable()
												: renderComparePeriodsTable()}
									</div>
								</>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
