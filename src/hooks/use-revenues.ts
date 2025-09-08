import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface Revenue {
	id: string;
	amount: number;
	description: string | null;
	date: Date;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
}

interface RevenuesQueryParams {
	startDate?: string;
	endDate?: string;
	search?: string;
	sortBy?: string;
	sortOrder?: string;
	expand?: boolean;
}

interface CreateRevenueData {
	amount: number;
	description?: string;
	date: string;
}

interface UpdateRevenueData extends CreateRevenueData {
	id: string;
}

const REVENUES_QUERY_KEY = "revenues";

export function useRevenues(params?: RevenuesQueryParams) {
	return useQuery({
		queryKey: [REVENUES_QUERY_KEY, params],
		queryFn: async (): Promise<Revenue[]> => {
			const searchParams = new URLSearchParams();

			if (params?.startDate) {
				searchParams.append("startDate", params.startDate);
			}
			if (params?.endDate) {
				searchParams.append("endDate", params.endDate);
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

			const response = await fetch(`/api/revenues?${searchParams.toString()}`);

			if (!response.ok) {
				throw new Error("Erro ao buscar receitas");
			}

			const data = await response.json();

			// Convert date strings back to Date objects
			return data.map((revenue: any) => ({
				...revenue,
				date: new Date(revenue.date),
				createdAt: new Date(revenue.createdAt),
				updatedAt: new Date(revenue.updatedAt),
			}));
		},
	});
}

export function useCreateRevenue() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: CreateRevenueData): Promise<Revenue> => {
			const response = await fetch("/api/revenues", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				throw new Error("Erro ao criar receita");
			}

			const result = await response.json();

			// Convert date strings back to Date objects
			return {
				...result,
				date: new Date(result.date),
				createdAt: new Date(result.createdAt),
				updatedAt: new Date(result.updatedAt),
			};
		},
		onSuccess: () => {
			// Invalidate all revenues queries to refetch data
			queryClient.invalidateQueries({ queryKey: [REVENUES_QUERY_KEY] });
			// Also invalidate dashboard queries that depend on revenue data
			queryClient.invalidateQueries({ queryKey: ["dashboard"] });
		},
	});
}

export function useUpdateRevenue() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: UpdateRevenueData): Promise<Revenue> => {
			const { id, ...updateData } = data;
			const response = await fetch(`/api/revenues?id=${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(updateData),
			});

			if (!response.ok) {
				throw new Error("Erro ao atualizar receita");
			}

			const result = await response.json();

			// Convert date strings back to Date objects
			return {
				...result,
				date: new Date(result.date),
				createdAt: new Date(result.createdAt),
				updatedAt: new Date(result.updatedAt),
			};
		},
		onSuccess: () => {
			// Invalidate all revenues queries to refetch data
			queryClient.invalidateQueries({ queryKey: [REVENUES_QUERY_KEY] });
			// Also invalidate dashboard queries that depend on revenue data
			queryClient.invalidateQueries({ queryKey: ["dashboard"] });
		},
	});
}

export function useDeleteRevenue() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: string): Promise<void> => {
			const response = await fetch(`/api/revenues?id=${id}`, {
				method: "DELETE",
			});

			if (!response.ok) {
				throw new Error("Erro ao excluir receita");
			}
		},
		onSuccess: () => {
			// Invalidate all revenues queries to refetch data
			queryClient.invalidateQueries({ queryKey: [REVENUES_QUERY_KEY] });
			// Also invalidate dashboard queries that depend on revenue data
			queryClient.invalidateQueries({ queryKey: ["dashboard"] });
		},
	});
}
