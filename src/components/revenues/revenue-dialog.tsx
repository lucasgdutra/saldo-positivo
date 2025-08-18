"use client";

import { useForm } from "react-hook-form";
import { standardSchemaResolver as zodResolver } from "@hookform/resolvers/standard-schema";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { RevenueFormSchema, type RevenueFormData } from "@/lib/validations";

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
    const month = String(d.getUTCMonth() + 1).padStart(2, '0'); // getUTCMonth é 0-indexado
    const day = String(d.getUTCDate()).padStart(2, '0');
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
    mode: "all"
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
      toast.success(initialData ? "Receita atualizada com sucesso!" : "Receita criada com sucesso!");
      reset();
      onClose();
    } catch (error) {
      console.error("Erro ao salvar receita:", error);
      const errorMessage = error instanceof Error ? error.message : "Ocorreu um erro desconhecido";
      toast.error(initialData ? `Erro ao atualizar receita: ${errorMessage}` : `Erro ao criar receita: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <h2 className="text-lg font-medium">
          {initialData ? "Editar Receita" : "Nova Receita"}
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
              disabled={isLoading}
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
              placeholder="Ex: Salário, Freelance, etc."
              disabled={isLoading}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
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
              disabled={isLoading}
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
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
              className="rounded-lg bg-black px-4 py-2 text-white hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-50"
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