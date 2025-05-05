"use client";

import { useState } from "react";
import { keepPreviousData } from "@tanstack/react-query";
import { toast } from "sonner";
import { ExpenseDialog } from "./expense-dialog";
import { formatCurrency } from "@/lib/utils";
import { trpc } from "@/lib/trpc";
import type { RouterOutputs } from "@/lib/trpc";

type ExpenseWithCategory = RouterOutputs["expenses"]["list"][number];
type CategoryType = RouterOutputs["categories"]["list"][number];

interface ExpenseWithNumberAmount extends Omit<ExpenseWithCategory, "amount"> {
    amount: number;
}

export function ExpensesList() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedExpense, setSelectedExpense] = useState<ExpenseWithNumberAmount | null>(null);
	const [startDate, setStartDate] = useState<string>("");
	const [endDate, setEndDate] = useState<string>("");
	const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

	const utils = trpc.useUtils();

	// Query para buscar categorias
	const {
		data: categoriesData = [],
		isLoading: isLoadingCategories,
		isError: isErrorCategories,
		error: errorCategories,
	} = trpc.categories.list.useQuery();

	// Query para buscar despesas com filtros
	const {
		data: expensesData = [],
		isLoading: isLoadingExpenses,
		isFetching: isFetchingExpenses,
		isError: isErrorExpenses,
		error: errorExpenses,
	} = trpc.expenses.list.useQuery(
		{
			startDate,
			endDate,
			categoryId: selectedCategoryId,
		},
		{
			placeholderData: keepPreviousData,
		}
	);

	// Mutations
	const createExpenseMutation = trpc.expenses.create.useMutation({
		onSuccess: () => {
			utils.expenses.list.invalidate();
			utils.expenses.expensesByCategory.invalidate();
			utils.expenses.recent.invalidate();
			toast.success("Despesa criada com sucesso!");
			handleCloseDialog();
		},
		onError: (error) => {
			toast.error(`Erro ao criar despesa: ${error.message}`);
		},
	});

	const updateExpenseMutation = trpc.expenses.update.useMutation({
		onSuccess: () => {
			utils.expenses.list.invalidate();
			utils.expenses.expensesByCategory.invalidate();
			utils.expenses.recent.invalidate();
			toast.success("Despesa atualizada com sucesso!");
			handleCloseDialog();
		},
		onError: (error) => {
			toast.error(`Erro ao atualizar despesa: ${error.message}`);
		},
	});

	const deleteExpenseMutation = trpc.expenses.delete.useMutation({
		onSuccess: () => {
			utils.expenses.list.invalidate();
			utils.expenses.expensesByCategory.invalidate();
			utils.expenses.recent.invalidate();
			toast.success("Despesa excluída com sucesso!");
		},
		onError: (error) => {
			toast.error(`Erro ao excluir despesa: ${error.message}`);
		},
	});

	// Handlers
	const handleOpenDialog = (expense?: ExpenseWithCategory) => {
		if (expense) {
			setSelectedExpense({
				...expense,
				amount: Number(expense.amount),
			});
		} else {
			setSelectedExpense(null);
		}
		setIsDialogOpen(true);
	};

	const handleCloseDialog = () => {
		setSelectedExpense(null);
		setIsDialogOpen(false);
	};

	const handleSaveExpense = (data: {
		amount: number;
		description?: string;
		date: string;
		categoryId: string;
	}) => {
		if (selectedExpense) {
			updateExpenseMutation.mutate({
				id: selectedExpense.id,
				...data,
			});
		} else {
			createExpenseMutation.mutate(data);
		}
	};

	const handleDeleteExpense = (id: string) => {
		if (window.confirm("Tem certeza que deseja excluir esta despesa?")) {
			deleteExpenseMutation.mutate({ id });
		}
	};

	const clearFilters = () => {
		setStartDate("");
		setEndDate("");
		setSelectedCategoryId("");
	};

	// Funções Auxiliares
	const formatDate = (date: Date) => {
		if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
			return "Data inválida";
		}
		return date.toLocaleDateString("pt-BR", { timeZone: "UTC" });
	};

	const getCategoryStyle = (color: string | undefined | null) => {
		return {
			backgroundColor: color || "#6E56CF", // Cor padrão se não definida
		};
	};

	const isMutating =
		createExpenseMutation.isPending ||
		updateExpenseMutation.isPending ||
		deleteExpenseMutation.isPending;

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
						className="rounded-lg bg-black px-4 py-2 text-white hover:bg-black/90 disabled:opacity-50"
						type="button"
						onClick={() => handleOpenDialog()}
						disabled={isMutating || isLoadingCategories}
					>
						Nova Despesa
					</button>
				</div>

				{/* Filtros */}
				<div className="rounded-lg border p-4 mb-4">
					<h2 className="text-lg font-medium mb-3">Filtros</h2>
					{isErrorCategories && (
						<p className="text-red-600 mb-3">
							Erro ao carregar categorias: {errorCategories.message}
						</p>
					)}
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
								className="w-full rounded-md border px-3 py-2 disabled:opacity-50"
								disabled={isFetchingExpenses || isMutating}
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
								className="w-full rounded-md border px-3 py-2 disabled:opacity-50"
								disabled={isFetchingExpenses || isMutating}
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
								onChange={(e) =>
									setSelectedCategoryId(e.target.value)
								}
								className="w-full rounded-md border px-3 py-2 disabled:opacity-50"
								disabled={
									isLoadingCategories ||
									isFetchingExpenses ||
									isMutating
								}
							>
								<option value="">
									{isLoadingCategories
										? "Carregando..."
										: "Todas as categorias"}
								</option>
								{categoriesData.map((category) => (
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
							className="rounded-lg border px-4 py-2 hover:bg-gray-50 disabled:opacity-50"
							disabled={
								isFetchingExpenses ||
								isMutating ||
								(!startDate &&
									!endDate &&
									!selectedCategoryId)
							}
						>
							Limpar
						</button>
					</div>
				</div>

				{/* Lista de Despesas */}
				<div className="rounded-lg border">
					<div className="p-4">
						{isLoadingExpenses && !isFetchingExpenses && (
							<div className="text-center text-muted-foreground py-4">
								Carregando despesas...
							</div>
						)}
						{isErrorExpenses && (
							<div className="text-center text-red-600 py-4">
								Erro ao carregar despesas: {errorExpenses.message}
							</div>
						)}
						{!isLoadingExpenses &&
							!isErrorExpenses &&
							expensesData.length === 0 && (
								<p className="text-center text-muted-foreground py-4">
									Nenhuma despesa encontrada{" "}
									{startDate || endDate || selectedCategoryId
										? "para os filtros selecionados"
										: "cadastrada"}
									.
								</p>
							)}
						{!isLoadingExpenses &&
							!isErrorExpenses &&
							expensesData.length > 0 && (
								<div
									className={`grid gap-4 ${
										isFetchingExpenses ? "opacity-50" : ""
									}`}
								>
									{expensesData.map((despesa) => (
										<div
											key={despesa.id}
											className="flex items-center justify-between rounded-lg border p-4"
										>
											<div className="space-y-1">
												<div className="flex items-center gap-2">
													<span className="font-medium text-red-600">
														{formatCurrency(
															Number(despesa.amount)
														)}
													</span>
													<span className="text-sm text-muted-foreground">
														{formatDate(
															new Date(
																despesa.date
															)
														)}
													</span>
												</div>
												<div
													className="mt-1 sm:mt-0 inline-block rounded-full px-2 py-0.5 text-xs text-white self-start"
													style={getCategoryStyle(
														despesa.category?.color
													)}
												>
													{despesa.category?.name ??
														"Sem Categoria"}
												</div>
												{despesa.description && (
													<p className="text-sm text-muted-foreground pt-1">
														{despesa.description}
													</p>
												)}
											</div>
											<div className="flex items-center gap-2 self-end sm:self-auto">
												<button
													className="rounded-lg px-2 py-1 text-sm text-muted-foreground hover:bg-secondary disabled:opacity-50"
													type="button"
													onClick={() =>
														handleOpenDialog(despesa)
													}
													disabled={isMutating}
												>
													Editar
												</button>
												<button
													className="rounded-lg px-2 py-1 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
													type="button"
													onClick={() =>
														handleDeleteExpense(
															despesa.id
														)
													}
													disabled={isMutating}
												>
													Excluir
												</button>
											</div>
										</div>
									))}
								</div>
							)}
					</div>
				</div>
			</div>

			<ExpenseDialog
				isOpen={isDialogOpen}
				onClose={handleCloseDialog}
				onSave={handleSaveExpense}
				categories={categoriesData}
				isSaving={
					createExpenseMutation.isPending ||
					updateExpenseMutation.isPending
				}
				initialData={selectedExpense || undefined}
			/>
		</>
	);
}
