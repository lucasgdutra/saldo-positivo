"use client";

import {
	ChevronDown,
	ChevronUp,
	Pencil,
	RefreshCw,
	Search,
	X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import {
	useCreateRevenue,
	useDeleteRevenue,
	useRevenues,
	useUpdateRevenue,
} from "@/hooks/use-revenues";
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
	globalFilters?: GlobalFilters;
}

type SortField = "amount" | "date" | "description";
type SortDirection = "asc" | "desc";

export function RevenuesTable({ globalFilters = {} }: RevenuesTableProps) {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedRevenue, setSelectedRevenue] = useState<Revenue | null>(null);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [sortField, setSortField] = useState<SortField>("date");
	const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
	const [page, setPage] = useState(1);
	const observerRef = useRef<IntersectionObserver>(null);

	// Build query params for TanStack Query
	const queryParams = useMemo(() => {
		const params: {
			startDate?: string;
			endDate?: string;
			search?: string;
			sortBy?: string;
			sortOrder?: string;
		} = {};

		if (
			globalFilters.selectedMonth !== undefined &&
			globalFilters.selectedYear !== undefined
		) {
			const startOfMonth = new Date(
				globalFilters.selectedYear,
				globalFilters.selectedMonth,
				1,
			);
			const endOfMonth = new Date(
				globalFilters.selectedYear,
				globalFilters.selectedMonth + 1,
				0,
				23,
				59,
				59,
				999,
			);
			params.startDate = startOfMonth.toISOString();
			params.endDate = endOfMonth.toISOString();
		}

		if (searchTerm) {
			params.search = searchTerm;
		}

		params.sortBy = sortField;
		params.sortOrder = sortDirection;
		params.expand = false; // Revenues don't have relations to expand

		return params;
	}, [
		globalFilters.selectedMonth,
		globalFilters.selectedYear,
		searchTerm,
		sortField,
		sortDirection,
	]);

	// Use TanStack Query hooks
	const {
		data: allRevenues = [],
		isLoading,
		error,
		refetch,
	} = useRevenues(queryParams);
	const createRevenueMutation = useCreateRevenue();
	const updateRevenueMutation = useUpdateRevenue();
	const deleteRevenueMutation = useDeleteRevenue();

	// Paginated revenues for display (server already handles filtering and sorting)
	const revenues = useMemo(() => {
		return allRevenues.slice(0, page * 15);
	}, [allRevenues, page]);

	// Check if there are more items to load
	const hasMore = useMemo(() => {
		return allRevenues.length > page * 15;
	}, [allRevenues.length, page]);

	// Reset page when filters change
	useEffect(() => {
		setPage(1);
	}, [searchTerm, globalFilters, sortField, sortDirection]);

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
				await updateRevenueMutation.mutateAsync({
					id: selectedRevenue.id,
					...data,
				});
				toast.success("Receita atualizada com sucesso!");
			} else {
				await createRevenueMutation.mutateAsync(data);
				toast.success("Receita criada com sucesso!");
			}
			handleCloseDialog();
		} catch (error) {
			console.error("Erro ao salvar receita:", error);
			toast.error(
				error instanceof Error ? error.message : "Erro ao salvar receita",
			);
		}
	};

	const handleDeleteRevenue = async (id: string) => {
		if (window.confirm("Tem certeza que deseja excluir esta receita?")) {
			try {
				await deleteRevenueMutation.mutateAsync(id);
				toast.success("Receita excluída com sucesso!");
			} catch (error) {
				console.error("Erro ao excluir receita:", error);
				toast.error(
					error instanceof Error ? error.message : "Erro ao excluir receita",
				);
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
					<div className="flex gap-2">
						<button
							className="rounded-lg border px-4 py-2 hover:bg-gray-50 disabled:opacity-50"
							type="button"
							onClick={() => refetch()}
							disabled={isLoading}
						>
							<RefreshCw
								className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
							/>
						</button>
						<button
							className="rounded-lg bg-black px-4 py-2 text-white hover:bg-black/90 disabled:opacity-50"
							type="button"
							onClick={() => handleOpenDialog()}
							disabled={isLoading}
						>
							Nova Receita
						</button>
					</div>
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
								{isLoading ? (
									<tr>
										<td
											colSpan={4}
											className="px-6 py-8 text-center text-muted-foreground"
										>
											<div className="flex items-center justify-center gap-2">
												<RefreshCw className="w-4 h-4 animate-spin" />
												Carregando receitas...
											</div>
										</td>
									</tr>
								) : error ? (
									<tr>
										<td
											colSpan={4}
											className="px-6 py-8 text-center text-red-600"
										>
											Erro ao carregar receitas:{" "}
											{error instanceof Error
												? error.message
												: "Erro desconhecido"}
										</td>
									</tr>
								) : revenues.length === 0 ? (
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
