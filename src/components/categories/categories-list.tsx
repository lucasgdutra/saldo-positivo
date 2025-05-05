"use client";

import { useState } from "react";
import { CategoryDialog } from "./category-dialog";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import type { Category } from "@prisma/client";

export function CategoriesList() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const utils = trpc.useContext();

  // Query para buscar categorias usando tRPC
  const {
    data: categorias = [],
    isLoading,
    isError,
    error,
  } = trpc.categories.list.useQuery();

  // Mutations usando tRPC
  const createCategory = trpc.categories.create.useMutation({
    onSuccess: () => {
      utils.categories.list.invalidate();
      toast.success("Categoria criada com sucesso!");
      handleCloseDialog();
    },
    onError: (error) => {
      toast.error(`Erro ao criar categoria: ${error.message}`);
    },
  });

  const updateCategory = trpc.categories.update.useMutation({
    onSuccess: () => {
      utils.categories.list.invalidate();
      toast.success("Categoria atualizada com sucesso!");
      handleCloseDialog();
    },
    onError: (error) => {
      toast.error(`Erro ao atualizar categoria: ${error.message}`);
    },
  });

  const deleteCategory = trpc.categories.delete.useMutation({
    onSuccess: () => {
      utils.categories.list.invalidate();
      toast.success("Categoria excluída com sucesso!");
    },
    onError: (error) => {
      toast.error(`Erro ao excluir categoria: ${error.message}`);
    },
  });

  const handleOpenDialog = (categoria?: Category) => {
    setSelectedCategory(categoria || null);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedCategory(null);
    setIsDialogOpen(false);
  };

  const handleSaveCategory = (data: { name: string }): void => {
    if (selectedCategory) {
      updateCategory.mutate({
        id: selectedCategory.id,
        name: data.name,
      });
    } else {
      createCategory.mutate(data);
    }
  };

  const handleDeleteCategory = (id: string) => {
    if (
      window.confirm(
        "Tem certeza que deseja excluir esta categoria? As despesas associadas não serão excluídas, mas ficarão sem categoria."
      )
    ) {
      deleteCategory.mutate({ id });
    }
  };

  // Estado de carregamento
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Categorias</h1>
            <p className="text-muted-foreground">
              Gerencie as categorias das suas despesas
            </p>
          </div>
          <div className="h-10 w-32 rounded-lg bg-gray-200 animate-pulse"></div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="grid gap-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border p-4 h-16 bg-gray-100 animate-pulse"
              >
                <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
                <div className="flex items-center gap-2">
                  <div className="h-6 w-16 bg-gray-300 rounded"></div>
                  <div className="h-6 w-16 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Estado de erro
  if (isError) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Categorias</h1>
            <p className="text-muted-foreground">
              Gerencie as categorias das suas despesas
            </p>
          </div>
          <button
            className="rounded-lg bg-black px-4 py-2 text-white hover:bg-black/90"
            type="button"
            onClick={() => handleOpenDialog()}
            disabled
          >
            Nova Categoria
          </button>
        </div>
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-center text-destructive">
          Erro ao carregar categorias: {error.message}. Tente recarregar a página.
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Categorias</h1>
            <p className="text-muted-foreground">
              Gerencie as categorias das suas despesas
            </p>
          </div>
          <button
            className="rounded-lg bg-black px-4 py-2 text-white hover:bg-black/90 disabled:opacity-50"
            type="button"
            onClick={() => handleOpenDialog()}
            disabled={
              createCategory.isPending ||
              updateCategory.isPending ||
              deleteCategory.isPending
            }
          >
            Nova Categoria
          </button>
        </div>

        <div className="rounded-lg border">
          <div className="p-4">
            <div className="grid gap-4">
              {categorias.length === 0 ? (
                <p className="text-center text-muted-foreground">
                  Nenhuma categoria cadastrada.
                </p>
              ) : (
                categorias.map((categoria) => (
                  <div
                    key={categoria.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <span className="font-medium">{categoria.name}</span>
                    <div className="flex items-center gap-2">
                      <button
                        className="rounded-lg px-2 py-1 text-sm text-muted-foreground hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                        type="button"
                        onClick={() => handleOpenDialog(categoria)}
                        disabled={
                          createCategory.isPending ||
                          updateCategory.isPending ||
                          deleteCategory.isPending
                        }
                      >
                        Editar
                      </button>
                      <button
                        className="rounded-lg px-2 py-1 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        type="button"
                        onClick={() => handleDeleteCategory(categoria.id)}
                        disabled={
                          createCategory.isPending ||
                          updateCategory.isPending ||
                          deleteCategory.isPending
                        }
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

      <CategoryDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSaveCategory}
        initialData={selectedCategory || undefined}
        isSaving={createCategory.isPending || updateCategory.isPending}
      />
    </>
  );
}