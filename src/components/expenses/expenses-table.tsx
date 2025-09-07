"use client";

import { ChevronDown, ChevronUp, Pencil, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils";
import { CategoryManagementModal } from "./category-management-modal";
import { ExpenseDialog } from "./expense-dialog";
import { getCategoryIcon } from "@/lib/category-icons";

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
	initialExpenses: Expense[];
	initialCategories?: Category[];
	globalFilters?: GlobalFilters;
}

type SortField = "amount" | "date" | "description" | "category";
type SortDirection = "asc" | "desc";

export function ExpensesTable({
	initialExpenses,
	initialCategories = [],
	globalFilters = {},
}: ExpensesTableProps) {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
	const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
	const [expenses, setExpenses] = useState<Expense[]>(
		initialExpenses.slice(0, 15),
	);
	const [allExpenses, setAllExpenses] = useState<Expense[]>(initialExpenses);
	const [categories, setCategories] = useState<Category[]>(initialCategories);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [sortField, setSortField] = useState<SortField>("date");
	const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
	const [hasMore, setHasMore] = useState(initialExpenses.length > 15);
	const [page, setPage] = useState(1);
	const router = useRouter();
	const observerRef = useRef<IntersectionObserver>(null);

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

	// Filter and sort expenses
	const processExpenses = useCallback(
		(
			expenseList: Expense[],
			search: string,
			filters: GlobalFilters,
			field: SortField,
			direction: SortDirection,
		) => {
			let filtered = expenseList;

			// Filter by search term
			if (search) {
				filtered = filtered.filter((expense) =>
					expense.description?.toLowerCase().includes(search.toLowerCase()),
				);
			}

			// Filter by category
			if (filters.selectedCategoryId) {
				filtered = filtered.filter(
					(expense) => expense.categoryId === filters.selectedCategoryId,
				);
			}

			// Filter by month/year
			if (filters.selectedMonth !== undefined && filters.selectedYear !== undefined) {
				filtered = filtered.filter((expense) => {
					const expenseDate = new Date(expense.date);
					return expenseDate.getMonth() === filters.selectedMonth!  && 
						   expenseDate.getFullYear() === filters.selectedYear!;
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
					case "category":
						aVal = a.category.name.toLowerCase();
						bVal = b.category.name.toLowerCase();
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

	// Update displayed expenses when filters or sort changes
	useEffect(() => {
		const processed = processExpenses(
			allExpenses,
			searchTerm,
			globalFilters,
			sortField,
			sortDirection,
		);
		setExpenses(processed.slice(0, page * 15));
		setHasMore(processed.length > page * 15);
	}, [
		allExpenses,
		searchTerm,
		globalFilters,
		sortField,
		sortDirection,
		page,
		processExpenses,
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
				const response = await fetch(`/api/expenses?id=${selectedExpense.id}`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(data),
				});

				if (!response.ok) throw new Error("Erro ao atualizar despesa");

				const updatedExpense = await response.json();
				setAllExpenses((prev) =>
					prev.map((exp) =>
						exp.id === selectedExpense.id ? updatedExpense : exp,
					),
				);
			} else {
				const response = await fetch("/api/expenses", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(data),
				});

				if (!response.ok) throw new Error("Erro ao criar despesa");

				const newExpense = await response.json();
				setAllExpenses((prev) => [newExpense, ...prev]);
			}

			router.refresh();
			handleCloseDialog();
		} catch (error) {
			console.error("Erro ao salvar despesa:", error);
			// O toast de erro já é exibido pelo ExpenseDialog
		}
	};

	const handleDeleteExpense = async (id: string) => {
		if (window.confirm("Tem certeza que deseja excluir esta despesa?")) {
			try {
				const response = await fetch(`/api/expenses?id=${id}`, {
					method: "DELETE",
				});

				if (!response.ok) {
					const errorData = await response.json().catch(() => ({}));
					throw new Error(errorData?.message || "Erro ao excluir despesa");
				}

				setAllExpenses((prev) => prev.filter((exp) => exp.id !== id));
				toast.success("Despesa excluída com sucesso!");
				router.refresh();
			} catch (error: any) {
				console.error("Erro ao excluir despesa:", error);
				toast.error(
					`Erro ao excluir despesa: ${error?.message || "Erro desconhecido"}`,
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
							className="rounded-lg border px-4 py-2 hover:bg-gray-50"
							type="button"
							onClick={() => setIsCategoryModalOpen(true)}
						>
							Gerenciar Categorias
						</button>
						<button
							className="rounded-lg bg-black px-4 py-2 text-white hover:bg-black/90"
							type="button"
							onClick={() => handleOpenDialog()}
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
								{expenses.length === 0 ? (
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
															const IconComponent = getCategoryIcon(expense.category.icon);
															return <IconComponent className="w-3 h-3 text-white" />;
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
