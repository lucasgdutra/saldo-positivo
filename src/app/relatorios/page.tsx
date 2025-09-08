import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { AuthGuard } from "@/components/auth/auth-guard";
import { AppLayout } from "@/components/layout/app-layout";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { ReportsList } from "./_components/reports-list";

export default async function RelatoriosPage() {
	const session = await getServerSession(authOptions);

	if (!session?.user?.id) {
		redirect("/");
	}

	// Buscar categorias para o filtro
	const categorias = await db.category.findMany({
		where: { userId: session.user.id },
		orderBy: { name: "asc" },
	});

	return (
		<AuthGuard requireAuth>
			<AppLayout>
				<ReportsList initialCategories={categorias} />
			</AppLayout>
		</AuthGuard>
	);
}
