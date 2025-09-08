"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { getCategoryIcon } from "@/lib/category-icons";
import { CategoryDialog } from "../../categorias/_components/category-dialog";

interface Category {
	id: string;
	name: string;
	color: string;
	icon: string;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
}

interface CategoryManagementModalProps {
	isOpen: boolean;
	onClose: () => void;
	initialCategories: Category[];
}

export function CategoryManagementModal({
	isOpen,
	onClose,
	initialCategories,
}: CategoryManagementModalProps) {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState<Category | null>(
		null,
	);
	const [categorias, setCategorias] = useState<Category[]>(initialCategories);
	const router = useRouter();

	// Update categories when initial data changes
	useEffect(() => {
		setCategorias(initialCategories);
	}, [initialCategories]);

	const handleOpenDialog = (categoria?: Category) => {
		setSelectedCategory(categoria || null);
		setIsDialogOpen(true);
	};

	const handleCloseDialog = () => {
		setSelectedCategory(null);
		setIsDialogOpen(false);
	};

	const handleSaveCategory = async (data: {
		name: string;
		color: string;
		icon: string;
	}) => {
		try {
			if (selectedCategory) {
				// Edit existing category
				const response = await fetch(
					`/api/categorias?id=${selectedCategory.id}`,
					{
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(data),
					},
				);

				if (!response.ok) throw new Error("Erro ao atualizar categoria");

				const updatedCategory = await response.json();
				setCategorias((prev) =>
					prev.map((cat) =>
						cat.id === selectedCategory.id ? updatedCategory : cat,
					),
				);
			} else {
				// Create new category
				const response = await fetch("/api/categorias", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				});

				if (!response.ok) throw new Error("Erro ao criar categoria");

				const newCategory = await response.json();
				setCategorias((prev) => [...prev, newCategory]);
			}

			router.refresh();
			handleCloseDialog();
		} catch (error) {
			console.error("Erro ao salvar categoria:", error);
			// O toast de erro já é exibido pelo CategoryDialog
		}
	};

	const handleDeleteCategory = async (id: string) => {
		if (window.confirm("Tem certeza que deseja excluir esta categoria?")) {
			try {
				const response = await fetch(`/api/categorias?id=${id}`, {
					method: "DELETE",
				});

				if (!response.ok) throw new Error("Erro ao excluir categoria");

				setCategorias((prev) => prev.filter((cat) => cat.id !== id));
				router.refresh();
				toast.success("Categoria excluída com sucesso!");
			} catch (error) {
				console.error("Erro ao excluir categoria:", error);
				const errorMessage =
					error instanceof Error ? error.message : "Erro desconhecido";
				toast.error(`Erro ao excluir categoria: ${errorMessage}`);
			}
		}
	};

	return (
		<>
			<Dialog open={isOpen} onOpenChange={onClose}>
				<DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
					<DialogHeader>
						<div className="flex items-center justify-between">
							<div>
								<DialogTitle>Gerenciar Categorias</DialogTitle>
								<CardDescription className="mt-2">
									Gerencie as categorias das suas despesas
								</CardDescription>
							</div>
							<Button onClick={() => handleOpenDialog()}>Nova Categoria</Button>
						</div>
					</DialogHeader>

					<div className="flex-1 overflow-y-auto mt-4">
						<div className="space-y-3">
							{categorias.length === 0 ? (
								<div className="text-center py-8 text-muted-foreground">
									<p>Nenhuma categoria cadastrada.</p>
								</div>
							) : (
								categorias.map((categoria) => {
									const IconComponent = getCategoryIcon(categoria.icon);
									return (
										<Card key={categoria.id}>
											<CardContent className="p-4">
												<div className="flex items-center justify-between">
													<div className="flex items-center gap-3">
														<div
															className="w-10 h-10 rounded-full flex items-center justify-center"
															style={{ backgroundColor: categoria.color }}
														>
															<IconComponent className="w-5 h-5 text-white" />
														</div>
														<span className="font-medium">
															{categoria.name}
														</span>
													</div>
													<div className="flex items-center gap-2">
														<Button
															variant="ghost"
															size="sm"
															onClick={() => handleOpenDialog(categoria)}
														>
															Editar
														</Button>
														<Button
															variant="ghost"
															size="sm"
															onClick={() => handleDeleteCategory(categoria.id)}
															className="text-destructive hover:text-destructive"
														>
															Excluir
														</Button>
													</div>
												</div>
											</CardContent>
										</Card>
									);
								})
							)}
						</div>
					</div>

					<div className="flex justify-end mt-6 pt-4 border-t">
						<Button variant="outline" onClick={onClose}>
							Fechar
						</Button>
					</div>
				</DialogContent>
			</Dialog>

			<CategoryDialog
				isOpen={isDialogOpen}
				onClose={handleCloseDialog}
				onSave={handleSaveCategory}
				initialData={selectedCategory || undefined}
			/>
		</>
	);
}
