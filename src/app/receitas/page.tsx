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

	const receitas = await db.revenue.findMany({
		where: { userId: session.user.id },
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

	// Converter os valores Decimal para números
	const formattedReceitas = receitas.map((receita: RevenueFromPrisma) => ({
		...receita,
		amount: receita.amount.toNumber(),
	}));

	return (
		<AuthGuard requireAuth>
			<AppLayout>
				<ReceitasPageClient initialData={formattedReceitas} />
			</AppLayout>
		</AuthGuard>
	);
}
