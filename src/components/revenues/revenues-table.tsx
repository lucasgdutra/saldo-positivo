"use client";

import { ChevronDown, ChevronUp, Pencil, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils";
import { RevenueDialog } from "./revenue-dialog";

interface Revenue {
	id: string;
	amount: number;
	description: string | null;
	date: Date;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
}

interface GlobalFilters {
	selectedMonth?: number;
	selectedYear?: number;
}

interface RevenuesTableProps {
	initialRevenues: Revenue[];
	globalFilters?: GlobalFilters;
}

type SortField = "amount" | "date" | "description";
type SortDirection = "asc" | "desc";

export function RevenuesTable({
	initialRevenues,
	globalFilters = {},
}: RevenuesTableProps) {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedRevenue, setSelectedRevenue] = useState<Revenue | null>(null);
	const [revenues, setRevenues] = useState<Revenue[]>(
		initialRevenues.slice(0, 15),
	);
	const [allRevenues, setAllRevenues] = useState<Revenue[]>(initialRevenues);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [sortField, setSortField] = useState<SortField>("date");
	const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
	const [hasMore, setHasMore] = useState(initialRevenues.length > 15);
	const [page, setPage] = useState(1);
	const router = useRouter();
	const observerRef = useRef<IntersectionObserver>(null);

	// Filter and sort revenues
	const processRevenues = useCallback(
		(
			revenueList: Revenue[],
			search: string,
			filters: GlobalFilters,
			field: SortField,
			direction: SortDirection,
		) => {
			let filtered = revenueList;

			// Filter by search term
			if (search) {
				filtered = filtered.filter((revenue) =>
					revenue.description?.toLowerCase().includes(search.toLowerCase()),
				);
			}

			// Filter by month/year
			if (
				filters.selectedMonth !== undefined &&
				filters.selectedYear !== undefined
			) {
				filtered = filtered.filter((revenue) => {
					const revenueDate = new Date(revenue.date);
					return (
						revenueDate.getMonth() === filters.selectedMonth! &&
						revenueDate.getFullYear() === filters.selectedYear!
					);
				});
			}

			return filtered.sort((a, b) => {
				let aVal: any, bVal: any;

				switch (field) {
					case "amount":
						aVal = a.amount;
						bVal = b.amount;
						break;
					case "date":
						aVal = new Date(a.date).getTime();
						bVal = new Date(b.date).getTime();
						break;
					case "description":
						aVal = a.description?.toLowerCase() || "";
						bVal = b.description?.toLowerCase() || "";
						break;
					default:
						return 0;
				}

				if (direction === "asc") {
					return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
				} else {
					return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
				}
			});
		},
		[],
	);

	// Update displayed revenues when filters or sort changes
	useEffect(() => {
		const processed = processRevenues(
			allRevenues,
			searchTerm,
			globalFilters,
			sortField,
			sortDirection,
		);
		setRevenues(processed.slice(0, page * 15));
		setHasMore(processed.length > page * 15);
	}, [
		allRevenues,
		searchTerm,
		globalFilters,
		sortField,
		sortDirection,
		page,
		processRevenues,
	]);

	// Infinite scroll observer
	const lastElementCallback = useCallback(
		(node: HTMLTableRowElement) => {
			if (observerRef.current) observerRef.current.disconnect();

			observerRef.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					setPage((prev) => prev + 1);
				}
			});

			if (node) observerRef.current.observe(node);
		},
		[hasMore],
	);

	const handleSort = (field: SortField) => {
		if (sortField === field) {
			setSortDirection(sortDirection === "asc" ? "desc" : "asc");
		} else {
			setSortField(field);
			setSortDirection("desc");
		}
		setPage(1); // Reset to first page when sorting
	};

	const handleSearch = (value: string) => {
		setSearchTerm(value);
		setPage(1); // Reset to first page when searching
	};

	const clearFilters = () => {
		setSearchTerm("");
		setPage(1);
	};

	const SortIcon = ({ field }: { field: SortField }) => {
		if (sortField !== field)
			return <ChevronUp className="w-4 h-4 opacity-30" />;
		return sortDirection === "asc" ? (
			<ChevronUp className="w-4 h-4" />
		) : (
			<ChevronDown className="w-4 h-4" />
		);
	};

	const handleOpenDialog = (revenue?: Revenue) => {
		setSelectedRevenue(revenue || null);
		setIsDialogOpen(true);
	};

	const handleCloseDialog = () => {
		setSelectedRevenue(null);
		setIsDialogOpen(false);
	};

	const handleSaveRevenue = async (data: {
		amount: number;
		description?: string;
		date: string;
	}) => {
		try {
			if (selectedRevenue) {
				const response = await fetch(`/api/revenues?id=${selectedRevenue.id}`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(data),
				});

				if (!response.ok) throw new Error("Erro ao atualizar receita");

				const updatedRevenue = await response.json();
				setAllRevenues((prev) =>
					prev.map((rev) =>
						rev.id === selectedRevenue.id ? updatedRevenue : rev,
					),
				);
			} else {
				const response = await fetch("/api/revenues", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(data),
				});

				if (!response.ok) throw new Error("Erro ao criar receita");

				const newRevenue = await response.json();
				setAllRevenues((prev) => [newRevenue, ...prev]);
			}

			router.refresh();
			handleCloseDialog();
		} catch (error) {
			console.error("Erro ao salvar receita:", error);
			alert("Erro ao salvar receita. Tente novamente.");
		}
	};

	const handleDeleteRevenue = async (id: string) => {
		if (window.confirm("Tem certeza que deseja excluir esta receita?")) {
			try {
				const response = await fetch(`/api/revenues?id=${id}`, {
					method: "DELETE",
				});

				if (!response.ok) throw new Error("Erro ao excluir receita");

				setAllRevenues((prev) => prev.filter((rev) => rev.id !== id));
				toast.success("Receita excluída com sucesso!");
				router.refresh();
			} catch (error) {
				console.error("Erro ao excluir receita:", error);
				const errorMessage =
					error instanceof Error
						? error.message
						: "Ocorreu um erro desconhecido";
				toast.error(`Erro ao excluir receita: ${errorMessage}`);
			}
		}
	};

	const formatDate = (date: Date) => {
		return new Date(date).toLocaleDateString("pt-BR", { timeZone: "UTC" });
	};

	return (
		<>
			<div className="space-y-6">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold">Receitas</h1>
						<p className="text-muted-foreground">
							Gerencie suas receitas e entradas de dinheiro
						</p>
					</div>
					<button
						className="rounded-lg bg-black px-4 py-2 text-white hover:bg-black/90"
						type="button"
						onClick={() => handleOpenDialog()}
					>
						Nova Receita
					</button>
				</div>

				{/* Filters */}
				<div className="bg-gray-50 p-4 rounded-lg space-y-4">
					{/* Search Bar */}
					<div className="relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
						<input
							type="text"
							placeholder="Buscar por descrição..."
							value={searchTerm}
							onChange={(e) => handleSearch(e.target.value)}
							className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					{/* Clear Filters Button */}
					{searchTerm && (
						<div className="flex justify-end">
							<button
								onClick={clearFilters}
								className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors"
							>
								Limpar filtros
							</button>
						</div>
					)}
				</div>

				{/* Table */}
				<div className="rounded-lg border overflow-hidden">
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-gray-50">
								<tr>
									<th
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
										onClick={() => handleSort("amount")}
									>
										<div className="flex items-center gap-1">
											Valor
											<SortIcon field="amount" />
										</div>
									</th>
									<th
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
										onClick={() => handleSort("description")}
									>
										<div className="flex items-center gap-1">
											Descrição
											<SortIcon field="description" />
										</div>
									</th>
									<th
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
										onClick={() => handleSort("date")}
									>
										<div className="flex items-center gap-1">
											Data
											<SortIcon field="date" />
										</div>
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Ações
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{revenues.length === 0 ? (
									<tr>
										<td
											colSpan={4}
											className="px-6 py-8 text-center text-muted-foreground"
										>
											{searchTerm
												? "Nenhuma receita encontrada."
												: "Nenhuma receita cadastrada."}
										</td>
									</tr>
								) : (
									revenues.map((revenue, index) => (
										<tr
											key={revenue.id}
											ref={
												index === revenues.length - 1
													? lastElementCallback
													: undefined
											}
											className="hover:bg-gray-50"
										>
											<td className="px-6 py-4 whitespace-nowrap">
												<span className="font-medium text-green-600">
													{formatCurrency(revenue.amount)}
												</span>
											</td>
											<td className="px-6 py-4">
												<span className="text-sm text-gray-900">
													{revenue.description || "-"}
												</span>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												{formatDate(revenue.date)}
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="flex gap-2">
													<button
														className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-muted-foreground hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
														onClick={() => handleOpenDialog(revenue)}
														aria-label={`Editar receita de ${formatCurrency(revenue.amount)}`}
													>
														<Pencil className="h-4 w-4" />
														Editar
													</button>
													<button
														className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
														onClick={() => handleDeleteRevenue(revenue.id)}
														aria-label={`Excluir receita de ${formatCurrency(revenue.amount)}`}
													>
														<X className="h-4 w-4" />
														Excluir
													</button>
												</div>
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<RevenueDialog
				isOpen={isDialogOpen}
				onClose={handleCloseDialog}
				onSave={handleSaveRevenue}
				initialData={selectedRevenue || undefined}
			/>
		</>
	);
}
