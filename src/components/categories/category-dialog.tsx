"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect } from "react";

const categorySchema = z.object({
  name: z.string().min(1, "Nome da categoria é obrigatório"),
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface CategoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CategoryFormData) => Promise<void>;
  initialData?: {
    id: string;
    name: string;
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
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });
  
  // Atualizar o formulário quando initialData mudar
  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
      });
    } else {
      reset({
        name: "",
      });
    }
  }, [initialData, reset]);

  const onSubmit = async (data: CategoryFormData) => {
    try {
      setIsLoading(true);
      await onSave(data);
      reset();
      onClose();
    } catch (error) {
      console.error("Erro ao salvar categoria:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <h2 className="text-lg font-medium">
          {initialData ? "Editar Categoria" : "Nova Categoria"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Nome da Categoria
            </label>
            <input
              {...register("name")}
              type="text"
              id="name"
              className="mt-1 block w-full rounded-md border px-3 py-2"
              placeholder="Ex: Alimentação"
              disabled={isLoading}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-4 py-2 hover:bg-gray-50"
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}