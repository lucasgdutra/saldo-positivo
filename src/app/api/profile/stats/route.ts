import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import ProfileService from "@/services/ProfileService";

const profileService = new ProfileService();

export async function GET() {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user?.id) {
			return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
		}

		const stats = await profileService.getProfileStats(session.user.id);

		return NextResponse.json({ stats });
	} catch (error) {
		console.error("Erro ao buscar estatísticas do perfil:", error);
		return NextResponse.json(
			{ error: "Erro interno do servidor" },
			{ status: 500 },
		);
	}
}
