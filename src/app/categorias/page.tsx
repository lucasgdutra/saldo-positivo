import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { AuthGuard } from "@/components/auth/auth-guard";
import { CategoriesList } from "@/components/categories/categories-list";
import { AppLayout } from "@/components/layout/app-layout";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function CategoriasPage() {
	const session = await getServerSession(authOptions);

	if (!session?.user?.id) {
		redirect("/");
	}

	const categorias = await db.category.findMany({
		where: { userId: session.user.id },
		orderBy: { name: "asc" },
	});

	return (
		<AuthGuard requireAuth>
			<AppLayout>
				<CategoriesList initialCategories={categorias} />
			</AppLayout>
		</AuthGuard>
	);
}
