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

	// Buscar todas as despesas inicialmente (sem filtros)
	const despesas = await db.expense.findMany({
		where: { userId: session.user.id },
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
				/>
			</AppLayout>
		</AuthGuard>
	);
}
