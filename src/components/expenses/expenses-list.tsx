"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ExpenseDialog } from "./expense-dialog";
import { formatCurrency } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  color: string;
  userId: string;
}

interface Expense {
  id: string;
  amount: number;
  description: string | null;
  date: Date;
  userId: string;
  categoryId: string;
  category: Category;
  createdAt: Date;
  updatedAt: Date;
}

interface ExpensesListProps {
  initialExpenses: Expense[];
}

export function ExpensesList({ initialExpenses }: ExpensesListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const router = useRouter();

  const handleOpenDialog = (expense?: Expense) => {
    setSelectedExpense(expense || null);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedExpense(null);
    setIsDialogOpen(false);
  };

  const handleSaveExpense = async (data: { amount: number; description?: string; date: string; categoryId: string }) => {
    try {
      if (selectedExpense) {
        // Editar despesa existente
        const response = await fetch(`/api/expenses?id=${selectedExpense.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error("Erro ao atualizar despesa");

        const updatedExpense = await response.json();
        setExpenses((prev) =>
          prev.map((exp) =>
            exp.id === selectedExpense.id ? updatedExpense : exp
          )
        );
      } else {
        // Criar nova despesa
        const response = await fetch("/api/expenses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error("Erro ao criar despesa");

        const newExpense = await response.json();
        setExpenses((prev) => [newExpense, ...prev]);
      }

      router.refresh();
      handleCloseDialog();
    } catch (error) {
      console.error("Erro ao salvar despesa:", error);
      alert("Erro ao salvar despesa. Tente novamente.");
    }
  };

  const handleDeleteExpense = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta despesa?")) {
      try {
        const response = await fetch(`/api/expenses?id=${id}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Erro ao excluir despesa");

        setExpenses((prev) => prev.filter((exp) => exp.id !== id));
        router.refresh();
      } catch (error) {
        console.error("Erro ao excluir despesa:", error);
        alert("Erro ao excluir despesa. Tente novamente.");
      }
    }
  };

  // Função para formatar a data
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  // Função para obter o estilo da categoria
  const getCategoryStyle = (color: string) => {
    return {
      backgroundColor: color,
    };
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Despesas</h1>
            <p className="text-muted-foreground">
              Gerencie suas despesas e saídas de dinheiro
            </p>
          </div>
          <button
            className="rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90"
            type="button"
            onClick={() => handleOpenDialog()}
          >
            Nova Despesa
          </button>
        </div>

        <div className="rounded-lg border">
          <div className="p-4">
            <div className="grid gap-4">
              {expenses.length === 0 ? (
                <p className="text-center text-muted-foreground">
                  Nenhuma despesa cadastrada.
                </p>
              ) : (
                expenses.map((despesa) => (
                  <div
                    key={despesa.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-red-600">
                          {formatCurrency(despesa.amount)}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(despesa.date)}
                        </span>
                        <div 
                          className="ml-2 rounded-full px-2 py-0.5 text-xs text-white"
                          style={getCategoryStyle(despesa.category.color)}
                        >
                          {despesa.category.name}
                        </div>
                      </div>
                      {despesa.description && (
                        <p className="text-sm text-muted-foreground">
                          {despesa.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="rounded-lg px-2 py-1 text-sm text-muted-foreground hover:bg-secondary"
                        type="button"
                        onClick={() => handleOpenDialog(despesa)}
                      >
                        Editar
                      </button>
                      <button
                        className="rounded-lg px-2 py-1 text-sm text-red-600 hover:bg-red-50"
                        type="button"
                        onClick={() => handleDeleteExpense(despesa.id)}
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

      <ExpenseDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSaveExpense}
        initialData={selectedExpense || undefined}
      />
    </>
  );
}