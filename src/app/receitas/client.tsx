"use client";

import { useEffect, useState } from "react";
import { MonthFilter } from "@/components/dashboard/month-filter";
import { RevenueStatsCards } from "@/components/dashboard/revenue-stats-cards";
import { RevenuesEvolutionChart } from "@/components/dashboard/revenues-evolution-chart";
import { RevenuesTable } from "@/components/revenues/revenues-table";

export function ReceitasPageClient({ initialData }: { initialData: any[] }) {
	const [selectedMonth, setSelectedMonth] = useState<number>();
	const [selectedYear, setSelectedYear] = useState<number>();
	const [minDate, setMinDate] = useState<Date>();
	const [maxDate, setMaxDate] = useState<Date>();

	useEffect(() => {
		if (initialData.length > 0) {
			const dates = initialData.map((item) => new Date(item.date));
			setMinDate(new Date(Math.min(...dates.map((d) => d.getTime()))));
			setMaxDate(new Date(Math.max(...dates.map((d) => d.getTime()))));
		}
	}, [initialData]);

	const handleMonthChange = (year: number, month: number) => {
		setSelectedYear(year);
		setSelectedMonth(month);
	};

	return (
		<div className="space-y-6">
			{/* Filtros globais */}
			<div className="bg-gray-50 p-4 rounded-lg">
				<div className="grid grid-cols-1 md:grid-cols-1 gap-4">
					{/* Filtro de mês */}
					<div>
						<MonthFilter
							onMonthChange={handleMonthChange}
							minDate={minDate}
							maxDate={maxDate}
						/>
					</div>
				</div>
			</div>

			{/* Cards de estatísticas mensais */}
			<div>
				<h2 className="text-xl font-semibold mb-4">Estatísticas de Receitas</h2>
				<RevenueStatsCards
					selectedYear={selectedYear}
					selectedMonth={selectedMonth}
				/>
			</div>

			{/* Gráfico de evolução das receitas
			<div className="rounded-lg border p-6">
				<RevenuesEvolutionChart />
			</div> */}

			{/* Tabela de receitas */}
			<RevenuesTable
				initialRevenues={initialData}
				globalFilters={{
					selectedMonth,
					selectedYear
				}}
			/>
		</div>
	);
}