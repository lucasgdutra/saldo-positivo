"use client";

import { format } from "date-fns";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/utils";

interface Transaction {
	id: string;
	amount: number;
	description: string | null;
	date: string;
}

interface TransactionListProps {
	categoryId: string;
	startDate: string;
	endDate: string;
}

export function TransactionList({
	categoryId,
	startDate,
	endDate,
}: TransactionListProps) {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchTransactions = async () => {
			setIsLoading(true);
			const response = await fetch(
				`/api/reports/transactions?categoryId=${categoryId}&startDate=${startDate}&endDate=${endDate}`,
			);
			const data = await response.json();
			setTransactions(data);
			setIsLoading(false);
		};

		fetchTransactions();
	}, [categoryId, startDate, endDate]);

	if (isLoading) {
		return <div>Carregando transações...</div>;
	}

	if (transactions.length === 0) {
		return <div>Nenhuma transação encontrada.</div>;
	}

	return (
		<table className="w-full text-sm">
			<thead>
				<tr className="bg-gray-200">
					<th className="p-2 text-left">Data</th>
					<th className="p-2 text-left">Descrição</th>
					<th className="p-2 text-right">Valor</th>
				</tr>
			</thead>
			<tbody>
				{transactions.map((tx) => (
					<tr key={tx.id}>
						<td className="p-2">{format(new Date(tx.date), "dd/MM/yyyy")}</td>
						<td className="p-2">{tx.description}</td>
						<td className="p-2 text-right">
							{formatCurrency(Number(tx.amount))}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
