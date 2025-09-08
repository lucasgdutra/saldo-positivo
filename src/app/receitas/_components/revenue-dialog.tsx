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
import { type RevenueFormData, RevenueFormSchema } from "@/lib/validations";

interface RevenueDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (data: RevenueFormData) => Promise<void>;
	initialData?: {
		id: string;
		amount: number;
		description: string | null;
		date: Date;
	};
}

export function RevenueDialog({
	isOpen,
	onClose,
	onSave,
	initialData,
}: RevenueDialogProps) {
	const [isLoading, setIsLoading] = useState(false);

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

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<RevenueFormData>({
		resolver: zodResolver(RevenueFormSchema),
		defaultValues: {
			amount: 0,
			description: "",
			date: formatDateForInput(new Date()),
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
			});
		} else {
			reset({
				amount: 0,
				description: "",
				date: formatDateForInput(new Date()),
			});
		}
	}, [initialData, reset, formatDateForInput]);

	const onSubmit = async (data: RevenueFormData) => {
		try {
			setIsLoading(true);
			await onSave(data);
			toast.success(
				initialData
					? "Receita atualizada com sucesso!"
					: "Receita criada com sucesso!",
			);
			reset();
			onClose();
		} catch (error) {
			console.error("Erro ao salvar receita:", error);
			const errorMessage =
				error instanceof Error ? error.message : "Ocorreu um erro desconhecido";
			toast.error(
				initialData
					? `Erro ao atualizar receita: ${errorMessage}`
					: `Erro ao criar receita: ${errorMessage}`,
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
						{initialData ? "Editar Receita" : "Nova Receita"}
					</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="amount">Valor (R$)</Label>
						<Input
							{...register("amount", { valueAsNumber: true })}
							type="number"
							id="amount"
							step="0.01"
							min="0.01"
							placeholder="0,00"
							disabled={isLoading}
						/>
						{errors.amount && (
							<p className="text-sm text-destructive">
								{errors.amount.message}
							</p>
						)}
					</div>

					<div className="space-y-2">
						<Label htmlFor="description">Descrição</Label>
						<Input
							{...register("description")}
							type="text"
							id="description"
							placeholder="Ex: Salário, Freelance, etc."
							disabled={isLoading}
						/>
						{errors.description && (
							<p className="text-sm text-destructive">
								{errors.description.message}
							</p>
						)}
					</div>

					<div className="space-y-2">
						<Label htmlFor="date">Data</Label>
						<Input
							{...register("date")}
							type="date"
							id="date"
							disabled={isLoading}
						/>
						{errors.date && (
							<p className="text-sm text-destructive">{errors.date.message}</p>
						)}
					</div>

					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={onClose}
							disabled={isLoading}
						>
							Cancelar
						</Button>
						<Button type="submit" disabled={isLoading}>
							{isLoading ? "Salvando..." : "Salvar"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
