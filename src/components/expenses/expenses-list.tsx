"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ExpenseDialog } from "./expense-dialog";
import { formatCurrency } from "@/lib/utils";

interface Category {
	id: string;
	name: string;
	color: string | undefined;
	userId: string;
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

interface ExpensesListProps {
	initialExpenses: Expense[];
}

export function ExpensesList({ initialExpenses }: ExpensesListProps) {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
	const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
	const [categories, setCategories] = useState<Category[]>([]);
	const [startDate, setStartDate] = useState<string>("");
	const [endDate, setEndDate] = useState<string>("");
	const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	// Buscar categorias
	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await fetch("/api/categorias");
				if (response.ok) {
					const data = await response.json();
					setCategories(data);
				}
			} catch (error) {
				console.error("Erro ao buscar categorias:", error);
			}
		};

		fetchCategories();
	}, []);

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
				// Editar despesa existente
				const response = await fetch(`/api/expenses?id=${selectedExpense.id}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				});

				if (!response.ok) throw new Error("Erro ao atualizar despesa");

				const updatedExpense = await response.json();
				setExpenses((prev) =>
					prev.map((exp) =>
						exp.id === selectedExpense.id ? updatedExpense : exp,
					),
				);
			} else {
				// Criar nova despesa
				const response = await fetch("/api/expenses", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				});

				if (!response.ok) throw new Error("Erro ao criar despesa");

				const newExpense = await response.json();
				setExpenses((prev) => [newExpense, ...prev]);
			}

			router.refresh();
			handleCloseDialog();
		} catch (error) {
			console.error("Erro ao salvar despesa:", error);
			alert("Erro ao salvar despesa. Tente novamente.");
		}
	};

	const handleDeleteExpense = async (id: string) => {
		if (window.confirm("Tem certeza que deseja excluir esta despesa?")) {
			try {
				const response = await fetch(`/api/expenses?id=${id}`, {
					method: "DELETE",
				});

				if (!response.ok) throw new Error("Erro ao excluir despesa");

				setExpenses((prev) => prev.filter((exp) => exp.id !== id));
				router.refresh();
			} catch (error) {
				console.error("Erro ao excluir despesa:", error);
				alert("Erro ao excluir despesa. Tente novamente.");
			}
		}
	};

	// Função para buscar despesas com filtros
	const fetchFilteredExpenses = async () => {
		try {
			setIsLoading(true);

			// Construir a URL com os parâmetros de filtro
			let url = "/api/expenses";
			const params = new URLSearchParams();

			if (startDate) {
				params.append("startDate", startDate);
			}

			if (endDate) {
				params.append("endDate", endDate);
			}

			if (selectedCategoryId) {
				params.append("categoryId", selectedCategoryId);
			}

			if (params.toString()) {
				url += `?${params.toString()}`;
			}

			const response = await fetch(url);

			if (!response.ok) throw new Error("Erro ao buscar despesas");

			const data = await response.json();
			setExpenses(data);
		} catch (error) {
			console.error("Erro ao buscar despesas filtradas:", error);
			alert("Erro ao buscar despesas. Tente novamente.");
		} finally {
			setIsLoading(false);
		}
	};

	// Função para limpar os filtros
	const clearFilters = () => {
		setStartDate("");
		setEndDate("");
		setSelectedCategoryId("");
		setExpenses(initialExpenses);
	};

	// Função para formatar a data
	const formatDate = (date: Date) => {
		return new Date(date).toLocaleDateString("pt-BR");
	};

	// Função para obter o estilo da categoria
	const getCategoryStyle = (color: string | undefined) => {
		return {
			backgroundColor: color ?? "#6E56CF",
		};
	};

	// Função para formatar a data para o input date (YYYY-MM-DD)
	const formatDateForInput = (date: Date): string => {
		const d = new Date(date);
		const year = d.getFullYear();
		const month = String(d.getMonth() + 1).padStart(2, "0");
		const day = String(d.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
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
					<button
						className="rounded-lg bg-black px-4 py-2 text-white hover:bg-black"
						type="button"
						onClick={() => handleOpenDialog()}
					>
						Nova Despesa
					</button>
				</div>

				{/* Filtros */}
				<div className="rounded-lg border p-4 mb-4">
					<h2 className="text-lg font-medium mb-3">Filtros</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
						<div>
							<label
								htmlFor="startDate"
								className="block text-sm font-medium mb-1"
							>
								Data Inicial
							</label>
							<input
								type="date"
								id="startDate"
								value={startDate}
								onChange={(e) => setStartDate(e.target.value)}
								className="w-full rounded-md border px-3 py-2"
							/>
						</div>
						<div>
							<label
								htmlFor="endDate"
								className="block text-sm font-medium mb-1"
							>
								Data Final
							</label>
							<input
								type="date"
								id="endDate"
								value={endDate}
								onChange={(e) => setEndDate(e.target.value)}
								className="w-full rounded-md border px-3 py-2"
							/>
						</div>
						<div>
							<label
								htmlFor="categoryId"
								className="block text-sm font-medium mb-1"
							>
								Categoria
							</label>
							<select
								id="categoryId"
								value={selectedCategoryId}
								onChange={(e) => setSelectedCategoryId(e.target.value)}
								className="w-full rounded-md border px-3 py-2"
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
					<div className="flex justify-end gap-2">
						<button
							type="button"
							onClick={clearFilters}
							className="rounded-lg border px-4 py-2 hover:bg-gray-50"
							disabled={isLoading}
						>
							Limpar
						</button>
						<button
							type="button"
							onClick={fetchFilteredExpenses}
							className="rounded-lg bg-black px-4 py-2 text-white hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-50"
							disabled={isLoading}
						>
							{isLoading ? "Filtrando..." : "Filtrar"}
						</button>
					</div>
				</div>

				<div className="rounded-lg border">
					<div className="p-4">
						<div className="grid gap-4">
							{expenses.length === 0 ? (
								<p className="text-center text-muted-foreground">
									Nenhuma despesa cadastrada.
								</p>
							) : (
								expenses.map((despesa) => (
									<div
										key={despesa.id}
										className="flex items-center justify-between rounded-lg border p-4"
									>
										<div className="space-y-1">
											<div className="flex items-center gap-2">
												<span className="font-medium text-red-600">
													{formatCurrency(despesa.amount)}
												</span>
												<span className="text-sm text-muted-foreground">
													{formatDate(despesa.date)}
												</span>
												<div
													className="ml-2 rounded-full px-2 py-0.5 text-xs text-white"
													style={getCategoryStyle(despesa.category.color)}
												>
													{despesa.category.name}
												</div>
											</div>
											{despesa.description && (
												<p className="text-sm text-muted-foreground">
													{despesa.description}
												</p>
											)}
										</div>
										<div className="flex items-center gap-2">
											<button
												className="rounded-lg px-2 py-1 text-sm text-muted-foreground hover:bg-secondary"
												type="button"
												onClick={() => handleOpenDialog(despesa)}
											>
												Editar
											</button>
											<button
												className="rounded-lg px-2 py-1 text-sm text-red-600 hover:bg-red-50"
												type="button"
												onClick={() => handleDeleteExpense(despesa.id)}
											>
												Excluir
											</button>
										</div>
									</div>
								))
							)}
						</div>
					</div>
				</div>
			</div>

			<ExpenseDialog
				isOpen={isDialogOpen}
				onClose={handleCloseDialog}
				onSave={handleSaveExpense}
				initialData={selectedExpense || undefined}
			/>
		</>
	);
}
