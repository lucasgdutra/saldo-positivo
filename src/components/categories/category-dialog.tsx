"use client";

import { standardSchemaResolver as zodResolver } from "@hookform/resolvers/standard-schema";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type CategoryFormData, CategoryFormSchema } from "@/lib/validations";
import { ColorPicker } from "@/components/ui/color-picker";
import { IconPicker } from "@/components/ui/icon-picker";
import { getCategoryIcon } from "@/lib/category-icons";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface CategoryDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (data: CategoryFormData) => Promise<void>;
	initialData?: {
		id: string;
		name: string;
		color?: string;
		icon?: string;
	};
}

export function CategoryDialog({
	isOpen,
	onClose,
	onSave,
	initialData,
}: CategoryDialogProps) {
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		watch,
		setValue,
	} = useForm<CategoryFormData>({
		resolver: zodResolver(CategoryFormSchema),
		defaultValues: {
			name: "",
			color: "#3B82F6",
			icon: "folder",
		},
		mode: "all",
	});

	const watchedColor = watch("color");
	const watchedIcon = watch("icon");

	// Atualizar o formulário quando initialData mudar
	useEffect(() => {
		if (initialData) {
			reset({
				name: initialData.name,
				color: initialData.color || "#3B82F6",
				icon: initialData.icon || "folder",
			});
		} else {
			reset({
				name: "",
				color: "#3B82F6",
				icon: "folder",
			});
		}
	}, [initialData, reset]);

	const onSubmit = async (data: CategoryFormData) => {
		const isEditing = !!initialData;
		try {
			setIsLoading(true);
			await onSave(data);
			toast.success(
				isEditing
					? "Categoria atualizada com sucesso!"
					: "Categoria criada com sucesso!",
			);
			reset();
			onClose();
		} catch (error: any) {
			console.error(
				`Erro ao ${isEditing ? "atualizar" : "criar"} categoria:`,
				error,
			);
			toast.error(
				`Erro ao ${isEditing ? "atualizar" : "criar"} categoria: ${error?.message || "Erro desconhecido"}`,
			);
		} finally {
			setIsLoading(false);
		}
	};

	console.log(errors);
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>


			<DialogContent className="sm:max-w-md z-[60]" style={{ zIndex: 60 }}>
				<DialogHeader>
					<DialogTitle>
						{initialData ? "Editar Categoria" : "Nova Categoria"}
					</DialogTitle>
				</DialogHeader>

				{/* Preview da categoria */}
				<div className="p-3 bg-muted rounded-lg">
					<div className="flex items-center gap-3">
						<div
							className="w-10 h-10 rounded-full flex items-center justify-center"
							style={{ backgroundColor: watchedColor }}
						>
							{(() => {
								const IconComponent = getCategoryIcon(watchedIcon);
								return <IconComponent className="w-5 h-5 text-white" />;
							})()}
						</div>
						<div>
							<p className="text-sm font-medium">Prévia da Categoria</p>
							<p className="text-xs text-muted-foreground">
								{watch("name") || "Nome da categoria"}
							</p>
						</div>
					</div>
				</div>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="name">Nome da Categoria</Label>
						<Input
							{...register("name")}
							type="text"
							id="name"
							placeholder="Ex: Alimentação"
							disabled={isLoading}
						/>
						{errors.name && (
							<p className="text-sm text-destructive">{errors.name.message}</p>
						)}
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label>Cor</Label>
							<ColorPicker
								value={watchedColor}
								onChange={(color) => setValue("color", color)}
								disabled={isLoading}
							/>
							{errors.color && (
								<p className="text-sm text-destructive">{errors.color.message}</p>
							)}
						</div>

						<div className="space-y-2">
							<Label>Ícone</Label>
							<IconPicker
								value={watchedIcon}
								onChange={(icon) => setValue("icon", icon)}
								disabled={isLoading}
							/>
							{errors.icon && (
								<p className="text-sm text-destructive">{errors.icon.message}</p>
							)}
						</div>
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
						<Button
							type="submit"
							disabled={isLoading}
						>
							{isLoading ? "Salvando..." : "Salvar"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>

		</Dialog>
	);
}
