"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MonthFilter } from "@/components/ui/month-filter";
import { ExpenseStatsCards } from "./_components/expense-stats-cards";
import { ExpensesEvolutionChart } from "./_components/expenses-evolution-chart";
import { ExpensesTable } from "./_components/expenses-table";

export function DespesasPageClient({
	initialData,
	categories,
	allExpenses,
}: {
	initialData: any[];
	categories: any[];
	allExpenses: { date: Date }[];
}) {
	const now = new Date();
	const [selectedMonth, setSelectedMonth] = useState<number>(now.getMonth());
	const [selectedYear, setSelectedYear] = useState<number>(now.getFullYear());
	const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
	const [minDate, setMinDate] = useState<Date>();
	const [maxDate, setMaxDate] = useState<Date>();

	useEffect(() => {
		if (allExpenses.length > 0) {
			const dates = allExpenses.map((item) => new Date(item.date));
			setMinDate(new Date(Math.min(...dates.map((d) => d.getTime()))));
			setMaxDate(new Date(Math.max(...dates.map((d) => d.getTime()))));
		}
	}, [allExpenses]);

	const handleMonthChange = (year: number, month: number) => {
		setSelectedYear(year);
		setSelectedMonth(month);
	};

	return (
		<div className="space-y-6">
			{/* Filtros globais */}
			<div className="bg-gray-50 p-4 rounded-lg">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{/* Filtro de mês */}
					<div>
						<MonthFilter
							onMonthChange={handleMonthChange}
							minDate={minDate}
							maxDate={maxDate}
						/>
					</div>

					{/* Filtro de categoria */}
					<div>
						<label className="block text-sm font-medium mb-1">Categoria</label>
						<select
							value={selectedCategoryId}
							onChange={(e) => setSelectedCategoryId(e.target.value)}
							className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="">Todas as categorias</option>
							{categories.map((category) => (
								<option key={category.id} value={category.id}>
									{category.name}
								</option>
							))}
						</select>
					</div>
				</div>
			</div>

			{/* Cards de estatísticas mensais */}
			<Card>
				<CardHeader>
					<CardTitle>Estatísticas de Despesas</CardTitle>
				</CardHeader>
				<CardContent>
					<ExpenseStatsCards
						selectedYear={selectedYear}
						selectedMonth={selectedMonth}
						selectedCategoryId={selectedCategoryId}
					/>
				</CardContent>
			</Card>

			{/* Gráfico de evolução das despesas
			<Card>
				<CardContent className="p-6">
					<ExpensesEvolutionChart
						selectedCategoryId={selectedCategoryId}
					/>
				</CardContent>
			</Card> */}

			{/* Tabela de despesas */}
			<ExpensesTable
				initialCategories={categories}
				globalFilters={{
					selectedMonth,
					selectedYear,
					selectedCategoryId,
				}}
			/>
		</div>
	);
}
