"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { RevenueDialog } from "./revenue-dialog";
import { formatCurrency } from "@/lib/utils";
import { trpc } from "@/lib/trpc"; // Importar trpc
import type { AppRouter } from "@/server/routers/_app"; // Importar o tipo do AppRouter
import type { inferRouterOutputs } from "@trpc/server"; // Importar inferRouterOutputs
import type { TRPCClientErrorLike } from "@trpc/client"; // Importar tipo de erro

// Inferir o tipo de saída para receitas
type RouterOutput = inferRouterOutputs<AppRouter>;
type Revenue = RouterOutput["revenues"]["list"][number];

export function RevenuesList() {
  // Adicionar os useState que foram removidos
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRevenue, setSelectedRevenue] = useState<Revenue | null>(null);
  const queryClient = useQueryClient();
  const utils = trpc.useUtils(); // Obter utils para invalidação

  // --- Query para buscar receitas com tRPC ---
  const {
    data: revenuesData = [],
    isLoading,
    isError,
    error,
  } = trpc.revenues.list.useQuery({}, { // Passar objeto vazio como input
    // O tipo Revenue já é inferido
    // A conversão de data já é feita pelo superjson
  });

  // --- Mutations com tRPC ---
  const createRevenueMutation = trpc.revenues.create.useMutation({
    onSuccess: () => {
      utils.revenues.list.invalidate();
      utils.revenues.getRecent.invalidate();
      queryClient.invalidateQueries({ queryKey: ["balanceHistory"] });
      queryClient.invalidateQueries({ queryKey: ["recentTransactions"] });
      toast.success("Receita criada com sucesso!");
      handleCloseDialog();
    },
    onError: (error: TRPCClientErrorLike<AppRouter>) => { // Adicionar tipo ao erro
      toast.error(`Erro ao criar receita: ${error.message}`);
    },
  });

  const updateRevenueMutation = trpc.revenues.update.useMutation({
    onSuccess: () => {
      utils.revenues.list.invalidate();
      utils.revenues.getRecent.invalidate();
      queryClient.invalidateQueries({ queryKey: ["balanceHistory"] });
      queryClient.invalidateQueries({ queryKey: ["recentTransactions"] });
      toast.success("Receita atualizada com sucesso!");
      handleCloseDialog();
    },
    onError: (error: TRPCClientErrorLike<AppRouter>) => { // Adicionar tipo ao erro
      toast.error(`Erro ao atualizar receita: ${error.message}`);
    },
  });

  const deleteRevenueMutation = trpc.revenues.delete.useMutation({
    onSuccess: () => {
      utils.revenues.list.invalidate();
      utils.revenues.getRecent.invalidate();
      queryClient.invalidateQueries({ queryKey: ["balanceHistory"] });
      queryClient.invalidateQueries({ queryKey: ["recentTransactions"] });
      toast.success("Receita excluída com sucesso!");
    },
    onError: (error: TRPCClientErrorLike<AppRouter>) => { // Adicionar tipo ao erro
      toast.error(`Erro ao excluir receita: ${error.message}`);
    },
  });

  // --- Handlers ---
  const handleOpenDialog = (revenue?: Revenue) => {
    setSelectedRevenue(revenue || null);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedRevenue(null);
    setIsDialogOpen(false);
  };

  const handleSaveRevenue = (data: { amount: number; description?: string; date: string }) => {
    if (selectedRevenue) {
      updateRevenueMutation.mutate({ id: selectedRevenue.id, data });
    } else {
      createRevenueMutation.mutate(data);
    }
  };

  const handleDeleteRevenue = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta receita?")) {
      deleteRevenueMutation.mutate({ id });
    }
  };

  // --- Funções Auxiliares ---
  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (!(dateObj instanceof Date) || Number.isNaN(dateObj.getTime())) {
			return "Data inválida";
		}
    return dateObj.toLocaleDateString('pt-BR');
  };

  const isMutating = createRevenueMutation.isPending || updateRevenueMutation.isPending || deleteRevenueMutation.isPending;

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
            className="rounded-lg bg-black px-4 py-2 text-white hover:bg-black/90 disabled:opacity-50"
            type="button"
            onClick={() => handleOpenDialog()}
            disabled={isMutating}
          >
            Nova Receita
          </button>
        </div>

        <div className="rounded-lg border">
          <div className="p-4">
            {isLoading && (
              <div className="text-center text-muted-foreground py-4">Carregando receitas...</div>
            )}
            {isError && error && (
              <div className="text-center text-red-600 py-4">
                Erro ao carregar receitas: {error.message}
              </div>
            )}
            {!isLoading && !isError && revenuesData.length === 0 && (
              <p className="text-center text-muted-foreground py-4">
                Nenhuma receita cadastrada.
              </p>
            )}
            {!isLoading && !isError && revenuesData.length > 0 && (
              <div className="grid gap-4">
                {revenuesData.map((receita) => (
                  <div
                    key={receita.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-green-600">
                          {formatCurrency(Number(receita.amount))}
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
                        className="rounded-lg px-2 py-1 text-sm text-muted-foreground hover:bg-secondary disabled:opacity-50"
                        type="button"
                        onClick={() => handleOpenDialog(receita)}
                        disabled={isMutating}
                      >
                        Editar
                      </button>
                      <button
                        className="rounded-lg px-2 py-1 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
                        type="button"
                        onClick={() => handleDeleteRevenue(receita.id)}
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

      <RevenueDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSaveRevenue}
        isSaving={createRevenueMutation.isPending || updateRevenueMutation.isPending}
        // Converter amount para number antes de passar para o dialog
        initialData={selectedRevenue ? { ...selectedRevenue, amount: Number(selectedRevenue.amount) } : undefined}
      />
    </>
  );
}