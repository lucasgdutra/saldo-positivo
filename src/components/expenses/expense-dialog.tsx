"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useCallback } from "react";
import { toast } from "sonner";
import type { RouterOutputs } from "@/lib/trpc";

type CategoryType = RouterOutputs["categories"]["list"][number];
type ExpenseWithCategory = RouterOutputs["expenses"]["list"][number];

const expenseSchema = z.object({
  amount: z.number().positive("O valor deve ser positivo"),
  description: z.string().optional(),
  date: z.string().refine((date) => !Number.isNaN(Date.parse(date)), {
    message: "Data inválida",
  }),
  categoryId: z.string().min(1, "Categoria é obrigatória"),
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

interface ExpenseWithNumberAmount extends Omit<ExpenseWithCategory, "amount"> {
  amount: number;
}

interface ExpenseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ExpenseFormData) => void;
  categories: CategoryType[];
  isSaving?: boolean;
  initialData?: ExpenseWithNumberAmount;
}

export function ExpenseDialog({
  isOpen,
  onClose,
  onSave,
  categories,
  isSaving = false,
  initialData,
}: ExpenseDialogProps) {
  // Formatar a data para o formato YYYY-MM-DD para o input date (usando UTC)
  const formatDateForInput = useCallback((date: Date | string | null): string => {
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
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      amount: 0,
      description: "",
      date: formatDateForInput(new Date()),
      categoryId: "",
    },
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

  const onSubmit = (data: ExpenseFormData) => {
    onSave(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <h2 className="text-lg font-medium">
          {initialData ? "Editar Despesa" : "Nova Despesa"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium">
              Valor (R$)
            </label>
            <input
              {...register("amount", { valueAsNumber: true })}
              type="number"
              id="amount"
              step="0.01"
              min="0.01"
              className="mt-1 block w-full rounded-md border px-3 py-2"
              placeholder="0,00"
              disabled={isSaving}
            />
            {errors.amount && (
              <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium">
              Descrição
            </label>
            <input
              {...register("description")}
              type="text"
              id="description"
              className="mt-1 block w-full rounded-md border px-3 py-2"
              placeholder="Ex: Aluguel, Mercado, etc."
              disabled={isSaving}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium">
              Categoria
            </label>
            <select
              {...register("categoryId")}
              id="categoryId"
              className="mt-1 block w-full rounded-md border px-3 py-2"
              disabled={isSaving || categories.length === 0}
            >
              <option value="">
                {categories.length === 0
                  ? "Carregando..."
                  : "Selecione uma categoria"}
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="mt-1 text-sm text-red-600">
                {errors.categoryId.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium">
              Data
            </label>
            <input
              {...register("date")}
              type="date"
              id="date"
              className="mt-1 block w-full rounded-md border px-3 py-2"
              disabled={isSaving}
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-4 py-2 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isSaving}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-lg bg-black px-4 py-2 text-white hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isSaving}
            >
              {isSaving ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}