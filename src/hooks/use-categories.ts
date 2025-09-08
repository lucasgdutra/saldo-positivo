"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Types
interface Category {
	id: string;
	name: string;
	color: string;
	icon: string;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
}

interface CreateCategoryData {
	name: string;
	color: string;
	icon: string;
}

type UpdateCategoryData = CreateCategoryData;

// Hook to fetch categories
export function useCategories() {
	return useQuery<Category[], Error>({
		queryKey: ["categories"],
		queryFn: async () => {
			const response = await fetch("/api/categorias");
			if (!response.ok) {
				throw new Error("Falha ao buscar categorias");
			}
			return response.json();
		},
		staleTime: 10 * 60 * 1000, // 10 minutes
		gcTime: 15 * 60 * 1000, // 15 minutes
	});
}

// Hook to create a category
export function useCreateCategory() {
	const queryClient = useQueryClient();

	return useMutation<Category, Error, CreateCategoryData>({
		mutationFn: async (data) => {
			const response = await fetch("/api/categorias", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				throw new Error("Erro ao criar categoria");
			}

			return response.json();
		},
		onSuccess: () => {
			// Invalidate categories query to refresh the list
			queryClient.invalidateQueries({ queryKey: ["categories"] });
			// Also invalidate dashboard queries that depend on category data
			queryClient.invalidateQueries({ queryKey: ["dashboard"] });
		},
	});
}

// Hook to update a category
export function useUpdateCategory() {
	const queryClient = useQueryClient();

	return useMutation<Category, Error, { id: string; data: UpdateCategoryData }>(
		{
			mutationFn: async ({ id, data }) => {
				const response = await fetch(`/api/categorias?id=${id}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				});

				if (!response.ok) {
					throw new Error("Erro ao atualizar categoria");
				}

				return response.json();
			},
			onSuccess: () => {
				// Invalidate categories query to refresh the list
				queryClient.invalidateQueries({ queryKey: ["categories"] });
			},
		},
	);
}

// Hook to delete a category
export function useDeleteCategory() {
	const queryClient = useQueryClient();

	return useMutation<void, Error, string>({
		mutationFn: async (id) => {
			const response = await fetch(`/api/categorias?id=${id}`, {
				method: "DELETE",
			});

			if (!response.ok) {
				throw new Error("Erro ao excluir categoria");
			}
		},
		onSuccess: () => {
			// Invalidate categories query to refresh the list
			queryClient.invalidateQueries({ queryKey: ["categories"] });
			// Also invalidate dashboard queries that depend on category data
			queryClient.invalidateQueries({ queryKey: ["dashboard"] });
		},
	});
}
