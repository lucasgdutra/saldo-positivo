import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface Expense {
	id: string;
	amount: number;
	description: string | null;
	date: Date;
	userId: string;
	categoryId: string;
	category: {
		id: string;
		name: string;
		color: string;
		icon: string;
		userId: string;
		createdAt: Date;
		updatedAt: Date;
	};
	createdAt: Date;
	updatedAt: Date;
}

interface ExpensesQueryParams {
	startDate?: string;
	endDate?: string;
	categoryId?: string;
	search?: string;
	sortBy?: string;
	sortOrder?: string;
	expand?: boolean;
}

interface CreateExpenseData {
	amount: number;
	description?: string;
	date: string;
	categoryId: string;
}

interface UpdateExpenseData extends CreateExpenseData {
	id: string;
}

const EXPENSES_QUERY_KEY = "expenses";

export function useExpenses(params?: ExpensesQueryParams) {
	return useQuery({
		queryKey: [EXPENSES_QUERY_KEY, params],
		queryFn: async (): Promise<Expense[]> => {
			const searchParams = new URLSearchParams();

			if (params?.startDate) {
				searchParams.append("startDate", params.startDate);
			}
			if (params?.endDate) {
				searchParams.append("endDate", params.endDate);
			}
			if (params?.categoryId) {
				searchParams.append("categoryId", params.categoryId);
			}
			if (params?.search) {
				searchParams.append("search", params.search);
			}
			if (params?.sortBy) {
				searchParams.append("sortBy", params.sortBy);
			}
			if (params?.sortOrder) {
				searchParams.append("sortOrder", params.sortOrder);
			}
			if (params?.expand !== undefined) {
				searchParams.append("$expand", params.expand.toString());
			}

			const response = await fetch(`/api/expenses?${searchParams.toString()}`);

			if (!response.ok) {
				throw new Error("Erro ao buscar despesas");
			}

			const data = await response.json();

			// Convert date strings back to Date objects
			return data.map((expense: any) => ({
				...expense,
				date: new Date(expense.date),
				createdAt: new Date(expense.createdAt),
				updatedAt: new Date(expense.updatedAt),
				category: {
					...expense.category,
					createdAt: new Date(expense.category.createdAt),
					updatedAt: new Date(expense.category.updatedAt),
				},
			}));
		},
	});
}

export function useCreateExpense() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: CreateExpenseData): Promise<Expense> => {
			const response = await fetch("/api/expenses", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				throw new Error("Erro ao criar despesa");
			}

			const result = await response.json();

			// Convert date strings back to Date objects
			return {
				...result,
				date: new Date(result.date),
				createdAt: new Date(result.createdAt),
				updatedAt: new Date(result.updatedAt),
				category: {
					...result.category,
					createdAt: new Date(result.category.createdAt),
					updatedAt: new Date(result.category.updatedAt),
				},
			};
		},
		onSuccess: () => {
			// Invalidate all expenses queries to refetch data
			queryClient.invalidateQueries({ queryKey: [EXPENSES_QUERY_KEY] });
		},
	});
}

export function useUpdateExpense() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: UpdateExpenseData): Promise<Expense> => {
			const { id, ...updateData } = data;
			const response = await fetch(`/api/expenses?id=${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(updateData),
			});

			if (!response.ok) {
				throw new Error("Erro ao atualizar despesa");
			}

			const result = await response.json();

			// Convert date strings back to Date objects
			return {
				...result,
				date: new Date(result.date),
				createdAt: new Date(result.createdAt),
				updatedAt: new Date(result.updatedAt),
				category: {
					...result.category,
					createdAt: new Date(result.category.createdAt),
					updatedAt: new Date(result.category.updatedAt),
				},
			};
		},
		onSuccess: () => {
			// Invalidate all expenses queries to refetch data
			queryClient.invalidateQueries({ queryKey: [EXPENSES_QUERY_KEY] });
		},
	});
}

export function useDeleteExpense() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: string): Promise<void> => {
			const response = await fetch(`/api/expenses?id=${id}`, {
				method: "DELETE",
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(errorData?.message || "Erro ao excluir despesa");
			}
		},
		onSuccess: () => {
			// Invalidate all expenses queries to refetch data
			queryClient.invalidateQueries({ queryKey: [EXPENSES_QUERY_KEY] });
		},
	});
}
