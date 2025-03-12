"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CategoryDialog } from "./category-dialog";

interface Category {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CategoriesListProps {
  initialCategories: Category[];
}

export function CategoriesList({ initialCategories }: CategoriesListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [categorias, setCategorias] = useState<Category[]>(initialCategories);
  const router = useRouter();

  const handleOpenDialog = (categoria?: Category) => {
    setSelectedCategory(categoria || null);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedCategory(null);
    setIsDialogOpen(false);
  };

  const handleSaveCategory = async (data: { name: string }) => {
    try {
      if (selectedCategory) {
        // Editar categoria existente
        const response = await fetch(`/api/categorias?id=${selectedCategory.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error("Erro ao atualizar categoria");

        const updatedCategory = await response.json();
        setCategorias((prev) =>
          prev.map((cat) =>
            cat.id === selectedCategory.id ? updatedCategory : cat
          )
        );
      } else {
        // Criar nova categoria
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
      alert("Erro ao salvar categoria. Tente novamente.");
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
      } catch (error) {
        console.error("Erro ao excluir categoria:", error);
        alert("Erro ao excluir categoria. Tente novamente.");
      }
    }
  };

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
            className="rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90"
            type="button"
            onClick={() => handleOpenDialog()}
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
                        className="rounded-lg px-2 py-1 text-sm text-muted-foreground hover:bg-secondary"
                        type="button"
                        onClick={() => handleOpenDialog(categoria)}
                      >
                        Editar
                      </button>
                      <button
                        className="rounded-lg px-2 py-1 text-sm text-red-600 hover:bg-red-50"
                        type="button"
                        onClick={() => handleDeleteCategory(categoria.id)}
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
      />
    </>
  );
}