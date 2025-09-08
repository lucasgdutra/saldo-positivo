"use client";

import { standardSchemaResolver as zodResolver } from "@hookform/resolvers/standard-schema";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type ExpenseFormData, ExpenseFormSchema } from "@/lib/validations";

interface Category {
	id: string;
	name: string;
	color?: string | undefined;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
}

interface ExpenseDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (data: ExpenseFormData) => Promise<void>;
	initialData?: {
		id: string;
		amount: number;
		description: string | null;
		date: Date;
		categoryId: string;
		category?: Category;
	};
}

export function ExpenseDialog({
	isOpen,
	onClose,
	onSave,
	initialData,
}: ExpenseDialogProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [categories, setCategories] = useState<Category[]>([]);

	// Formatar a data para o formato YYYY-MM-DD para o input date (usando UTC)
	const formatDateForInput = useCallback((date: Date | null): string => {
		if (!date) return "";
		const d = new Date(date);
		// Usar métodos UTC para garantir que o dia original seja mantido
		const year = d.getUTCFullYear();
		const month = String(d.getUTCMonth() + 1).padStart(2, "0"); // getUTCMonth é 0-indexado
		const day = String(d.getUTCDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	}, []);

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

		if (isOpen) {
			fetchCategories();
		}
	}, [isOpen]);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ExpenseFormData>({
		resolver: zodResolver(ExpenseFormSchema),
		defaultValues: {
			amount: 0,
			description: "",
			date: formatDateForInput(new Date()),
			categoryId: "",
		},
		mode: "all",
	});

	// Atualizar o formulário quando initialData mudar
	useEffect(() => {
		if (initialData) {
			reset({
				amount: initialData.amount,
				description: initialData.description || "",
				date: formatDateForInput(initialData.date),
				categoryId: initialData.categoryId,
			});
		} else {
			reset({
				amount: 0,
				description: "",
				date: formatDateForInput(new Date()),
				categoryId: "",
			});
		}
	}, [initialData, reset, formatDateForInput]);

	const onSubmit = async (data: ExpenseFormData) => {
		const isEditing = !!initialData; // Verifica se estamos editando
		try {
			setIsLoading(true);
			await onSave(data);
			toast.success(
				isEditing
					? "Despesa atualizada com sucesso!"
					: "Despesa criada com sucesso!",
			);
			reset();
			onClose();
		} catch (error: any) {
			console.error(
				`Erro ao ${isEditing ? "atualizar" : "criar"} despesa:`,
				error,
			);
			toast.error(
				`Erro ao ${isEditing ? "atualizar" : "criar"} despesa: ${error?.message || "Erro desconhecido"}`,
			);
		} finally {
			setIsLoading(false);
		}
	};
	if (errors != null && Object.keys(errors).length > 0) {
		console.log(errors);
	}

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>
						{initialData ? "Editar Despesa" : "Nova Despesa"}
					</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="space-y-4"
					noValidate
				>
					<fieldset disabled={isLoading} className="space-y-4">
						<legend className="sr-only">Dados da despesa</legend>

						<div className="space-y-2">
							<Label htmlFor="amount">Valor (R$) *</Label>
							<Input
								{...register("amount", { valueAsNumber: true })}
								type="number"
								id="amount"
								step="0.01"
								min="0.01"
								required
								aria-describedby={
									errors.amount ? "amount-error" : "amount-help"
								}
								aria-invalid={errors.amount ? "true" : "false"}
								placeholder="0,00"
								disabled={isLoading}
							/>
							<p id="amount-help" className="text-xs text-muted-foreground">
								Digite o valor em reais (ex: 29,90)
							</p>
							{errors.amount && (
								<p
									id="amount-error"
									role="alert"
									className="text-sm text-destructive"
								>
									<span className="sr-only">Erro:</span> {errors.amount.message}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="description">Descrição</Label>
							<Input
								{...register("description")}
								type="text"
								id="description"
								maxLength={100}
								aria-describedby={
									errors.description ? "description-error" : "description-help"
								}
								aria-invalid={errors.description ? "true" : "false"}
								placeholder="Ex: Aluguel, Mercado, etc."
								disabled={isLoading}
							/>
							<p
								id="description-help"
								className="text-xs text-muted-foreground"
							>
								Descreva brevemente a despesa (opcional)
							</p>
							{errors.description && (
								<p
									id="description-error"
									role="alert"
									className="text-sm text-destructive"
								>
									<span className="sr-only">Erro:</span>{" "}
									{errors.description.message}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="categoryId">Categoria *</Label>
							<select
								{...register("categoryId")}
								id="categoryId"
								required
								aria-describedby={
									errors.categoryId ? "category-error" : "category-help"
								}
								aria-invalid={errors.categoryId ? "true" : "false"}
								className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
								disabled={isLoading}
							>
								<option value="">Selecione uma categoria</option>
								{categories.map((category) => (
									<option key={category.id} value={category.id}>
										{category.name}
									</option>
								))}
							</select>
							<p id="category-help" className="text-xs text-muted-foreground">
								Escolha a categoria que melhor classifica esta despesa
							</p>
							{errors.categoryId && (
								<p
									id="category-error"
									role="alert"
									className="text-sm text-destructive"
								>
									<span className="sr-only">Erro:</span>{" "}
									{errors.categoryId.message}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="date">Data *</Label>
							<Input
								{...register("date")}
								type="date"
								id="date"
								required
								aria-describedby={errors.date ? "date-error" : "date-help"}
								aria-invalid={errors.date ? "true" : "false"}
								disabled={isLoading}
							/>
							<p id="date-help" className="text-xs text-muted-foreground">
								Data em que a despesa foi realizada
							</p>
							{errors.date && (
								<p
									id="date-error"
									role="alert"
									className="text-sm text-destructive"
								>
									<span className="sr-only">Erro:</span> {errors.date.message}
								</p>
							)}
						</div>
					</fieldset>

					<DialogFooter className="pt-4 border-t">
						<Button
							type="button"
							variant="outline"
							onClick={onClose}
							disabled={isLoading}
						>
							Cancelar
						</Button>
						<Button type="submit" disabled={isLoading}>
							{isLoading ? "Salvando..." : initialData ? "Atualizar" : "Salvar"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
