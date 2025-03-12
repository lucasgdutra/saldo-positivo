"use client";

import { useState, useEffect, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function ErrorBoundary({ children, fallback }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Função para lidar com erros não capturados
    const handleError = (event: ErrorEvent) => {
      event.preventDefault();
      setHasError(true);
      setError(event.error || new Error(event.message));
    };

    // Função para lidar com rejeições de promessas não tratadas
    const handleRejection = (event: PromiseRejectionEvent) => {
      event.preventDefault();
      setHasError(true);
      setError(
        event.reason instanceof Error
          ? event.reason
          : new Error(String(event.reason))
      );
    };

    // Adicionar event listeners
    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);

    // Remover event listeners ao desmontar
    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
    };
  }, []);

  // Função para tentar novamente
  const resetError = () => {
    setHasError(false);
    setError(null);
  };

  // Se houver um erro, mostrar o fallback ou o componente de erro padrão
  if (hasError) {
    return (
      fallback || (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
          <h3 className="text-lg font-medium">Algo deu errado</h3>
          <p className="mt-2 text-sm">
            {error?.message || "Ocorreu um erro inesperado."}
          </p>
          <button
            onClick={resetError}
            className="mt-4 rounded-md bg-red-100 px-4 py-2 text-sm font-medium text-red-800 hover:bg-red-200"
            type="button"
          >
            Tentar novamente
          </button>
        </div>
      )
    );
  }

  // Se não houver erro, renderizar os filhos normalmente
  return <>{children}</>;
}