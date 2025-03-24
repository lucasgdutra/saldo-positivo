"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { DashboardErrorContainer } from "./dashboard-error";

type SummaryData = {
  availableBalance: number;
  currentBalance: number;
  currentExpenses: number;
};

export function DashboardSummary() {
  const { data: session } = useSession();
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSummaryData = useCallback(async () => {
    if (!session?.user?.id) return;

    try {
      setIsLoading(true);
      setError(null);

      // Buscar o saldo do usuário usando a API de saldo
      const balanceResponse = await fetch('/api/balance');
      
      // Se a requisição falhar, usar dados de exemplo
      if (!balanceResponse.ok) {
        throw new Error('Falha ao buscar dados de saldo');
      }

      const balanceData = await balanceResponse.json();

      setSummaryData({
        currentExpenses: balanceData.totalExpenses,
        currentBalance: balanceData.totalRevenues,
        availableBalance: balanceData.totalAmount,
      });
    } catch (err) {
      console.error('Erro ao buscar dados de resumo:', err);
      setError('Não foi possível carregar os dados de resumo');
      
      // Não usar dados fictícios em caso de erro
      setSummaryData({
        availableBalance: 0,
        currentBalance: 0,
        currentExpenses: 0,
      });
    } finally {
      setIsLoading(false);
    }
  }, [session?.user?.id]);

  useEffect(() => {
    fetchSummaryData();
  }, [fetchSummaryData]);

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border p-4">
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
          <div className="mt-2 h-8 w-32 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="rounded-lg border p-4">
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
          <div className="mt-2 h-8 w-32 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="rounded-lg border p-4">
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
          <div className="mt-2 h-8 w-32 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    );
  }

  const hasNoData =
    (summaryData?.availableBalance === 0 &&
     summaryData?.currentBalance === 0 &&
     summaryData?.currentExpenses === 0);

  return (
    <DashboardErrorContainer
      isError={!!error}
      error={error}
      onRetry={fetchSummaryData}
    >
      {hasNoData ? (
        <div className="rounded-lg border p-6 text-center">
          <h3 className="text-lg font-medium mb-2">Sem dados financeiros</h3>
          <p className="text-muted-foreground mb-4">
            Você ainda não possui receitas ou despesas registradas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/receitas"
              className="inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
            >
              Adicionar Receitas
            </a>
            <a
              href="/despesas"
              className="inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Adicionar Despesas
            </a>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border p-4">
            <div className="text-sm text-muted-foreground">Saldo Total (Histórico Completo)</div>
            <div className="mt-2 text-2xl font-bold">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(summaryData?.availableBalance ?? 0)}
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <div className="text-sm text-muted-foreground">Total de Receitas</div>
            <div className="mt-2 text-2xl font-bold text-green-600">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(summaryData?.currentBalance ?? 0)}
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <div className="text-sm text-muted-foreground">Total de Despesas</div>
            <div className="mt-2 text-2xl font-bold text-red-600">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(summaryData?.currentExpenses ?? 0)}
            </div>
          </div>
        </div>
      )}
    </DashboardErrorContainer>
  );
}