"use client";

import { Pencil, X } from "lucide-react";
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
	const [startDate, setStartDate] = useState<string>("");
	const [endDate, setEndDate] = useState<string>("");
	const [isLoading, setIsLoading] = useState(false);
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

	// Função para buscar receitas com filtros
	const fetchFilteredRevenues = async () => {
		try {
			setIsLoading(true);

			// Construir a URL com os parâmetros de filtro
			let url = "/api/revenues";
			const params = new URLSearchParams();

			if (startDate) {
				params.append("startDate", startDate);
			}

			if (endDate) {
				params.append("endDate", endDate);
			}

			if (params.toString()) {
				url += `?${params.toString()}`;
			}

			const response = await fetch(url);

			if (!response.ok) throw new Error("Erro ao buscar receitas");

			const data = await response.json();
			setRevenues(data);
		} catch (error) {
			console.error("Erro ao buscar receitas filtradas:", error);
			alert("Erro ao buscar receitas. Tente novamente.");
		} finally {
			setIsLoading(false);
		}
	};

	// Função para limpar os filtros
	const clearFilters = () => {
		setStartDate("");
		setEndDate("");
		setRevenues(initialRevenues);
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

				{/* Filtros */}
				<div className="rounded-lg border p-4 mb-4">
					<h2 className="text-lg font-medium mb-3">Filtros</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
							onClick={fetchFilteredRevenues}
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
												className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-blue-600 transition-colors"
												type="button"
												onClick={() => handleOpenDialog(receita)}
												aria-label={`Editar receita de ${formatCurrency(receita.amount)}`}
											>
												<Pencil className="h-4 w-4" />
												Editar
											</button>
											<button
												className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
												type="button"
												onClick={() => handleDeleteRevenue(receita.id)}
												aria-label={`Excluir receita de ${formatCurrency(receita.amount)}`}
											>
												<X className="h-4 w-4" />
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
