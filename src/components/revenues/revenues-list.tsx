"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils";
import { RevenueDialog } from "./revenue-dialog";

interface Revenue {
	id: string;
	amount: number;
	description: string | null;
	date: Date;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
}

interface RevenuesListProps {
	initialRevenues: Revenue[];
}

export function RevenuesList({ initialRevenues }: RevenuesListProps) {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedRevenue, setSelectedRevenue] = useState<Revenue | null>(null);
	const [revenues, setRevenues] = useState<Revenue[]>(initialRevenues);
	const router = useRouter();

	const handleOpenDialog = (revenue?: Revenue) => {
		setSelectedRevenue(revenue || null);
		setIsDialogOpen(true);
	};

	const handleCloseDialog = () => {
		setSelectedRevenue(null);
		setIsDialogOpen(false);
	};

	const handleSaveRevenue = async (data: {
		amount: number;
		description?: string;
		date: string;
	}) => {
		try {
			if (selectedRevenue) {
				// Editar receita existente
				const response = await fetch(`/api/revenues?id=${selectedRevenue.id}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				});

				if (!response.ok) throw new Error("Erro ao atualizar receita");

				const updatedRevenue = await response.json();
				setRevenues((prev) =>
					prev.map((rev) =>
						rev.id === selectedRevenue.id ? updatedRevenue : rev,
					),
				);
			} else {
				// Criar nova receita
				const response = await fetch("/api/revenues", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				});

				if (!response.ok) throw new Error("Erro ao criar receita");

				const newRevenue = await response.json();
				setRevenues((prev) => [newRevenue, ...prev]);
			}

			router.refresh();
			handleCloseDialog();
		} catch (error) {
			console.error("Erro ao salvar receita:", error);
			alert("Erro ao salvar receita. Tente novamente.");
		}
	};

	const handleDeleteRevenue = async (id: string) => {
		if (window.confirm("Tem certeza que deseja excluir esta receita?")) {
			try {
				const response = await fetch(`/api/revenues?id=${id}`, {
					method: "DELETE",
				});

				if (!response.ok) throw new Error("Erro ao excluir receita");

				setRevenues((prev) => prev.filter((rev) => rev.id !== id));
				toast.success("Receita excluída com sucesso!");
				router.refresh();
			} catch (error) {
				console.error("Erro ao excluir receita:", error);
				const errorMessage =
					error instanceof Error
						? error.message
						: "Ocorreu um erro desconhecido";
				toast.error(`Erro ao excluir receita: ${errorMessage}`);
			}
		}
	};

	// Função para formatar a data (mantendo o dia UTC original)
	const formatDate = (date: Date) => {
		return new Date(date).toLocaleDateString("pt-BR", { timeZone: "UTC" });
	};

	return (
		<>
			<div className="space-y-6">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold">Receitas</h1>
						<p className="text-muted-foreground">
							Gerencie suas receitas e entradas de dinheiro
						</p>
					</div>
					<button
						className="rounded-lg bg-black px-4 py-2 text-white hover:bg-black/90"
						type="button"
						onClick={() => handleOpenDialog()}
					>
						Nova Receita
					</button>
				</div>

				<div className="rounded-lg border">
					<div className="p-4">
						<div className="grid gap-4">
							{revenues.length === 0 ? (
								<p className="text-center text-muted-foreground">
									Nenhuma receita cadastrada.
								</p>
							) : (
								revenues.map((receita) => (
									<div
										key={receita.id}
										className="flex items-center justify-between rounded-lg border p-4"
									>
										<div className="space-y-1">
											<div className="flex items-center gap-2">
												<span className="font-medium text-green-600">
													{formatCurrency(receita.amount)}
												</span>
												<span className="text-sm text-muted-foreground">
													{formatDate(receita.date)}
												</span>
											</div>
											{receita.description && (
												<p className="text-sm text-muted-foreground">
													{receita.description}
												</p>
											)}
										</div>
										<div className="flex items-center gap-2">
											<button
												className="rounded-lg px-2 py-1 text-sm text-muted-foreground hover:bg-secondary"
												type="button"
												onClick={() => handleOpenDialog(receita)}
											>
												Editar
											</button>
											<button
												className="rounded-lg px-2 py-1 text-sm text-red-600 hover:bg-red-50"
												type="button"
												onClick={() => handleDeleteRevenue(receita.id)}
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

			<RevenueDialog
				isOpen={isDialogOpen}
				onClose={handleCloseDialog}
				onSave={handleSaveRevenue}
				initialData={selectedRevenue || undefined}
			/>
		</>
	);
}
