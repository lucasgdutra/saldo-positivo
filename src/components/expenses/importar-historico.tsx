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
    <div className="mb-6 p-4 rounded-lg border border-gray-200 shadow-sm bg-white">
    <h2 className="text-lg font-semibold mb-2">📥 Importar Histórico do Cartão</h2>
  
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
      <input
        type="file"
        accept=".csv"
        id="fileInput"
        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
                   file:rounded-lg file:border-0
                   file:text-sm file:font-semibold
                   file:bg-primary file:text-white
                   hover:file:bg-primary/90"
      />
      <button
        onClick={handleUpload}
        className="bg-primary text-white px-5 py-2 rounded-md font-medium hover:bg-primary/90 transition"
      >
        Enviar CSV
      </button>
    </div>
  
    {mensagem && (
      <p className="text-sm mt-2 text-blue-600">{mensagem}</p>
    )}
  </div>
  
  );
}
