"use client"; // Error components must be Client Components

import { useEffect } from "react";
export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen text-center">
			<h2 className="text-2xl font-bold mb-4">Algo deu errado!</h2>
			<p className="mb-4">{error.message || "Ocorreu um erro inesperado."}</p>
			<button
				onClick={
					// Attempt to recover by trying to re-render the segment
					() => reset()
				}
				className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" // Estilo básico
			>
				Tentar Novamente
			</button>
		</div>
	);
}
