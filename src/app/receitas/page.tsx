import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { AuthGuard } from "@/components/auth/auth-guard";
import { AppLayout } from "@/components/layout/app-layout";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { ReceitasPageClient } from "./client";

export default async function ReceitasPage() {
	const session = await getServerSession(authOptions);

	if (!session?.user?.id) {
		redirect("/");
	}

	// Buscar receitas do mês atual por padrão
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

	const receitas = await db.revenue.findMany({
		where: {
			userId: session.user.id,
			date: {
				gte: startOfMonth,
				lte: endOfMonth,
			},
		},
		orderBy: { date: "desc" },
	});

	// Definindo o tipo para o resultado do Prisma
	interface RevenueFromPrisma {
		id: string;
		amount: { toNumber: () => number };
		description: string | null;
		date: Date;
		userId: string;
		createdAt: Date;
		updatedAt: Date;
	}

	// Buscar range de datas para o filtro (todas as receitas)
	const allRevenues = await db.revenue.findMany({
		where: { userId: session.user.id },
		select: { date: true },
		orderBy: { date: "desc" },
	});

	// Converter os valores Decimal para números
	const formattedReceitas = receitas.map((receita: RevenueFromPrisma) => ({
		...receita,
		amount: receita.amount.toNumber(),
	}));

	return (
		<AuthGuard requireAuth>
			<AppLayout>
				<ReceitasPageClient
					initialData={formattedReceitas}
					allRevenues={allRevenues}
				/>
			</AppLayout>
		</AuthGuard>
	);
}
