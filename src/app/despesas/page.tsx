import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { AuthGuard } from "@/components/auth/auth-guard";
import { AppLayout } from "@/components/layout/app-layout";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { DespesasPageClient } from "./client";

export default async function DespesasPage() {
	const session = await getServerSession(authOptions);

	if (!session?.user?.id) {
		redirect("/");
	}

	// Buscar despesas do mês atual por padrão
	const now = new Date();
	const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
	const endOfMonth = new Date(
		now.getFullYear(),
		now.getMonth() + 1,
		0,
		23,
		59,
		59,
		999,
	);

	const despesas = await db.expense.findMany({
		where: {
			userId: session.user.id,
			date: {
				gte: startOfMonth,
				lte: endOfMonth,
			},
		},
		orderBy: { date: "desc" },
		include: {
			category: true,
		},
	});

	// Buscar categorias do usuário
	const categories = await db.category.findMany({
		where: { userId: session.user.id },
		orderBy: { name: "asc" },
	});

	// Buscar range de datas para o filtro (todas as despesas)
	const allExpenses = await db.expense.findMany({
		where: { userId: session.user.id },
		select: { date: true },
		orderBy: { date: "desc" },
	});

	// Converter os valores Decimal para números
	const formattedDespesas = despesas.map(
		(despesa: {
			id: string;
			amount: { toNumber: () => number };
			description?: string | null;
			date: Date;
			createdAt: Date;
			updatedAt: Date;
			userId: string;
			categoryId: string;
			category: {
				id: string;
				name: string;
				userId: string;
				createdAt: Date;
				updatedAt: Date;
				color?: string;
			};
		}) => ({
			...despesa,
			amount: despesa.amount.toNumber(),
			description: despesa.description || null, // Garantir que description seja string | null
			category: {
				...despesa.category,
				color: despesa.category.color,
			},
		}),
	);

	return (
		<AuthGuard requireAuth>
			<AppLayout>
				<DespesasPageClient
					initialData={formattedDespesas}
					categories={categories}
					allExpenses={allExpenses}
				/>
			</AppLayout>
		</AuthGuard>
	);
}
