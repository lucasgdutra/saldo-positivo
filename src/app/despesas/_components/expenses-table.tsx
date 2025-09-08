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
	useCreateExpense,
	useDeleteExpense,
	useExpenses,
	useUpdateExpense,
} from "@/hooks/use-expenses";
import { getCategoryIcon } from "@/lib/category-icons";
import { formatCurrency } from "@/lib/utils";
import { CategoryManagementModal } from "./category-management-modal";
import { ExpenseDialog } from "./expense-dialog";

interface Category {
	id: string;
	name: string;
	color: string;
	icon: string;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
}

interface Expense {
	id: string;
	amount: number;
	description: string | null;
	date: Date;
	userId: string;
	categoryId: string;
	category: Category;
	createdAt: Date;
	updatedAt: Date;
}

interface GlobalFilters {
	selectedMonth?: number;
	selectedYear?: number;
	selectedCategoryId?: string;
}

interface ExpensesTableProps {
	initialCategories?: Category[];
	globalFilters?: GlobalFilters;
}

type SortField = "amount" | "date" | "description" | "category";
type SortDirection = "asc" | "desc";

export function ExpensesTable({
	initialCategories = [],
	globalFilters = {},
}: ExpensesTableProps) {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
	const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
	const [categories, setCategories] = useState<Category[]>(initialCategories);
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
			categoryId?: string;
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

		if (globalFilters.selectedCategoryId) {
			params.categoryId = globalFilters.selectedCategoryId;
		}

		if (searchTerm) {
			params.search = searchTerm;
		}

		params.sortBy = sortField;
		params.sortOrder = sortDirection;
		params.expand = true; // Always expand to include category data

		return params;
	}, [
		globalFilters.selectedMonth,
		globalFilters.selectedYear,
		globalFilters.selectedCategoryId,
		searchTerm,
		sortField,
		sortDirection,
	]);

	// Use TanStack Query hooks
	const {
		data: allExpenses = [],
		isLoading,
		error,
		refetch,
	} = useExpenses(queryParams);
	const createExpenseMutation = useCreateExpense();
	const updateExpenseMutation = useUpdateExpense();
	const deleteExpenseMutation = useDeleteExpense();

	// Fetch categories
	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await fetch("/api/categorias");
				if (response.ok) {
					const data = await response.json();
					setCategories(data);
				} else if (initialCategories.length > 0) {
					setCategories(initialCategories);
				}
			} catch (error) {
				console.error("Erro ao buscar categorias:", error);
				if (initialCategories.length > 0) {
					setCategories(initialCategories);
				}
			}
		};

		if (initialCategories.length > 0) {
			setCategories(initialCategories);
		}
		fetchCategories();
	}, [initialCategories]);

	// Paginated expenses for display (server already handles filtering and sorting)
	const expenses = useMemo(() => {
		return allExpenses.slice(0, page * 15);
	}, [allExpenses, page]);

	// Check if there are more items to load
	const hasMore = useMemo(() => {
		return allExpenses.length > page * 15;
	}, [allExpenses.length, page]);

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

	const handleOpenDialog = (expense?: Expense) => {
		setSelectedExpense(expense || null);
		setIsDialogOpen(true);
	};

	const handleCloseDialog = () => {
		setSelectedExpense(null);
		setIsDialogOpen(false);
	};

	const handleSaveExpense = async (data: {
		amount: number;
		description?: string;
		date: string;
		categoryId: string;
	}) => {
		try {
			if (selectedExpense) {
				await updateExpenseMutation.mutateAsync({
					id: selectedExpense.id,
					...data,
				});
				toast.success("Despesa atualizada com sucesso!");
			} else {
				await createExpenseMutation.mutateAsync(data);
				toast.success("Despesa criada com sucesso!");
			}
			handleCloseDialog();
		} catch (error) {
			console.error("Erro ao salvar despesa:", error);
			toast.error(
				error instanceof Error ? error.message : "Erro ao salvar despesa",
			);
		}
	};

	const handleDeleteExpense = async (id: string) => {
		if (window.confirm("Tem certeza que deseja excluir esta despesa?")) {
			try {
				await deleteExpenseMutation.mutateAsync(id);
				toast.success("Despesa excluída com sucesso!");
			} catch (error) {
				console.error("Erro ao excluir despesa:", error);
				toast.error(
					error instanceof Error ? error.message : "Erro ao excluir despesa",
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
						<h1 className="text-3xl font-bold">Despesas</h1>
						<p className="text-muted-foreground">
							Gerencie suas despesas e saídas de dinheiro
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
							className="rounded-lg border px-4 py-2 hover:bg-gray-50"
							type="button"
							onClick={() => setIsCategoryModalOpen(true)}
						>
							Gerenciar Categorias
						</button>
						<button
							className="rounded-lg bg-black px-4 py-2 text-white hover:bg-black/90 disabled:opacity-50"
							type="button"
							onClick={() => handleOpenDialog()}
							disabled={isLoading}
						>
							Nova Despesa
						</button>
					</div>
				</div>

				{/* Search Bar */}
				<div className="bg-gray-50 p-4 rounded-lg">
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
						<div className="flex justify-end mt-2">
							<button
								onClick={clearFilters}
								className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors"
							>
								Limpar busca
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
										onClick={() => handleSort("category")}
									>
										<div className="flex items-center gap-1">
											Categoria
											<SortIcon field="category" />
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
											colSpan={5}
											className="px-6 py-8 text-center text-muted-foreground"
										>
											<div className="flex items-center justify-center gap-2">
												<RefreshCw className="w-4 h-4 animate-spin" />
												Carregando despesas...
											</div>
										</td>
									</tr>
								) : error ? (
									<tr>
										<td
											colSpan={5}
											className="px-6 py-8 text-center text-red-600"
										>
											Erro ao carregar despesas:{" "}
											{error instanceof Error
												? error.message
												: "Erro desconhecido"}
										</td>
									</tr>
								) : expenses.length === 0 ? (
									<tr>
										<td
											colSpan={5}
											className="px-6 py-8 text-center text-muted-foreground"
										>
											{searchTerm
												? "Nenhuma despesa encontrada."
												: "Nenhuma despesa cadastrada."}
										</td>
									</tr>
								) : (
									expenses.map((expense, index) => (
										<tr
											key={expense.id}
											ref={
												index === expenses.length - 1
													? lastElementCallback
													: undefined
											}
											className="hover:bg-gray-50"
										>
											<td className="px-6 py-4 whitespace-nowrap">
												<span className="font-medium text-red-600">
													{formatCurrency(expense.amount)}
												</span>
											</td>
											<td className="px-6 py-4">
												<span className="text-sm text-gray-900">
													{expense.description || "-"}
												</span>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="flex items-center gap-2">
													<div
														className="w-6 h-6 rounded-full flex items-center justify-center"
														style={{ backgroundColor: expense.category.color }}
													>
														{(() => {
															const IconComponent = getCategoryIcon(
																expense.category.icon,
															);
															return (
																<IconComponent className="w-3 h-3 text-white" />
															);
														})()}
													</div>
													<span className="text-sm text-gray-900">
														{expense.category.name}
													</span>
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												{formatDate(expense.date)}
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="flex gap-2">
													<button
														className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-muted-foreground hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
														onClick={() => handleOpenDialog(expense)}
														aria-label={`Editar despesa de ${formatCurrency(expense.amount)}`}
													>
														<Pencil className="h-4 w-4" />
														Editar
													</button>
													<button
														className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
														onClick={() => handleDeleteExpense(expense.id)}
														aria-label={`Excluir despesa de ${formatCurrency(expense.amount)}`}
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

			<ExpenseDialog
				isOpen={isDialogOpen}
				onClose={handleCloseDialog}
				onSave={handleSaveExpense}
				initialData={selectedExpense || undefined}
			/>

			<CategoryManagementModal
				isOpen={isCategoryModalOpen}
				onClose={() => setIsCategoryModalOpen(false)}
				initialCategories={categories}
			/>
		</>
	);
}
