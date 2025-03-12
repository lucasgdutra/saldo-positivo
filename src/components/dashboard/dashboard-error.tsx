"use client";

import type { ReactNode } from "react";

interface DashboardErrorProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function DashboardError({
  title = "Erro ao carregar dados",
  message = "Não foi possível carregar os dados. Por favor, tente novamente mais tarde.",
  onRetry,
}: DashboardErrorProps) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="mt-2 text-sm">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-md bg-red-100 px-4 py-2 text-sm font-medium text-red-800 hover:bg-red-200"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}

interface DashboardErrorContainerProps {
  children: ReactNode;
  isError: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export function DashboardErrorContainer({
  children,
  isError,
  error,
  onRetry,
}: DashboardErrorContainerProps) {
  if (isError) {
    return (
      <DashboardError
        message={error || "Ocorreu um erro ao carregar os dados."}
        onRetry={onRetry}
      />
    );
  }

  return <>{children}</>;
}