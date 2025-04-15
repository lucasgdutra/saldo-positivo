"use client";

import { useState } from "react";

export function ImportarHistorico() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [mensagem, setMensagem] = useState("");

  const handleUpload = async () => {
    if (!selectedFile) {
      setMensagem("Selecione um arquivo CSV.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await fetch("/api/expenses/import", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setMensagem(data.error || "Erro ao importar despesas.");
        return;
      }

      setMensagem(data.message || "Importação realizada com sucesso.");
    } catch (err) {
      console.error(err);
      setMensagem("Erro inesperado.");
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Importar Histórico do Cartão</h2>
      <div className="flex items-center gap-4">
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
        />
        <button
          className="bg-primary text-white px-4 py-2 rounded"
          onClick={handleUpload}
        >
          Enviar CSV
        </button>
      </div>
      {mensagem && <p className="text-sm mt-2 text-blue-600">{mensagem}</p>}
    </div>
  );
}
