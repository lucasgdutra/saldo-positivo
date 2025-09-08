"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

interface MonthFilterProps {
	onMonthChange?: (year: number, month: number) => void;
	minDate?: Date;
	maxDate?: Date;
}

export function MonthFilter({
	onMonthChange,
	minDate,
	maxDate,
}: MonthFilterProps) {
	const [currentDate, setCurrentDate] = useState(() => {
		const now = new Date();
		return { year: now.getFullYear(), month: now.getMonth() };
	});
	const [isOpen, setIsOpen] = useState(false);

	const months = [
		"Janeiro",
		"Fevereiro",
		"Março",
		"Abril",
		"Maio",
		"Junho",
		"Julho",
		"Agosto",
		"Setembro",
		"Outubro",
		"Novembro",
		"Dezembro",
	];

	// Generate available months based on min/max dates
	const getAvailableMonths = () => {
		const options = [];

		if (!minDate || !maxDate) {
			// If no date range provided, show current month only
			const now = new Date();
			return [{ year: now.getFullYear(), month: now.getMonth() }];
		}

		const startDate = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
		const endDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);
		const current = new Date(startDate);

		while (current <= endDate) {
			options.push({
				year: current.getFullYear(),
				month: current.getMonth(),
			});
			current.setMonth(current.getMonth() + 1);
		}

		return options.reverse(); // Most recent first
	};

	const availableMonths = getAvailableMonths();

	const handleMonthSelect = (year: number, month: number) => {
		const newDate = { year, month };
		setCurrentDate(newDate);
		onMonthChange?.(year, month);
		setIsOpen(false);
	};

	// Set initial month to most recent available month
	useEffect(() => {
		if (availableMonths.length > 0) {
			const mostRecent = availableMonths[0];
			if (
				currentDate.year !== mostRecent.year ||
				currentDate.month !== mostRecent.month
			) {
				setCurrentDate(mostRecent);
				onMonthChange?.(mostRecent.year, mostRecent.month);
			}
		}
	}, [minDate, maxDate]);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (isOpen && !target.closest(".month-filter-dropdown")) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener("click", handleClickOutside);
			return () => document.removeEventListener("click", handleClickOutside);
		}
	}, [isOpen]);

	return (
		<div className="relative month-filter-dropdown">
			<label className="block text-sm font-medium mb-2">
				Período de Análise
			</label>
			<div className="relative">
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="w-full md:w-auto min-w-[200px] px-4 py-2 bg-white border rounded-lg flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					<span className="font-medium">
						{months[currentDate.month]} {currentDate.year}
					</span>
					<ChevronDown
						className={`w-4 h-4 transition-transform ${
							isOpen ? "rotate-180" : ""
						}`}
					/>
				</button>

				{isOpen && (
					<div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
						{availableMonths.length === 0 ? (
							<div className="px-4 py-3 text-gray-500 text-sm">
								Nenhuma transação encontrada
							</div>
						) : (
							availableMonths.map(({ year, month }) => (
								<button
									key={`${year}-${month}`}
									onClick={() => handleMonthSelect(year, month)}
									className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${
										currentDate.year === year && currentDate.month === month
											? "bg-blue-50 text-blue-600 font-medium"
											: "text-gray-900"
									}`}
								>
									{months[month]} {year}
								</button>
							))
						)}
					</div>
				)}
			</div>
		</div>
	);
}
