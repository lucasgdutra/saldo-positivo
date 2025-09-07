import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import ProfileService from "@/services/ProfileService";

const profileService = new ProfileService();

const updateProfileSchema = z
	.object({
		name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").optional(),
		email: z.string().email("Email inválido").optional(),
		currentPassword: z.string().optional(),
		newPassword: z
			.string()
			.min(6, "Nova senha deve ter pelo menos 6 caracteres")
			.optional(),
	})
	.refine(
		(data) => {
			if (data.newPassword && !data.currentPassword) {
				return false;
			}
			return true;
		},
		{
			message: "Senha atual é obrigatória para alterar a senha",
			path: ["currentPassword"],
		},
	);

export async function GET() {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user?.id) {
			return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
		}

		const profile = await profileService.getProfile(session.user.id);

		if (!profile) {
			return NextResponse.json(
				{ error: "Perfil não encontrado" },
				{ status: 404 },
			);
		}

		return NextResponse.json({ profile });
	} catch (error) {
		console.error("Erro ao buscar perfil:", error);
		return NextResponse.json(
			{ error: "Erro interno do servidor" },
			{ status: 500 },
		);
	}
}

export async function PUT(request: NextRequest) {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user?.id) {
			return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
		}

		const body = await request.json();
		const validatedData = updateProfileSchema.parse(body);

		if (validatedData.newPassword && validatedData.currentPassword) {
			const isValidPassword = await profileService.validateCurrentPassword(
				session.user.id,
				validatedData.currentPassword,
			);

			if (!isValidPassword) {
				return NextResponse.json(
					{ error: "Senha atual incorreta" },
					{ status: 400 },
				);
			}
		}

		const updateData: any = {};
		if (validatedData.name !== undefined) updateData.name = validatedData.name;
		if (validatedData.email !== undefined)
			updateData.email = validatedData.email;
		if (validatedData.newPassword)
			updateData.password = validatedData.newPassword;

		const updatedProfile = await profileService.updateProfile(
			session.user.id,
			updateData,
		);

		return NextResponse.json({
			profile: updatedProfile,
			message: "Perfil atualizado com sucesso",
		});
	} catch (error) {
		console.error("Erro ao atualizar perfil:", error);

		if (error instanceof z.ZodError) {
			return NextResponse.json(
				{ error: "Dados inválidos", details: error.issues },
				{ status: 400 },
			);
		}

		if (
			error instanceof Error &&
			error.message === "Este email já está sendo usado por outro usuário"
		) {
			return NextResponse.json({ error: error.message }, { status: 400 });
		}

		return NextResponse.json(
			{ error: "Erro interno do servidor" },
			{ status: 500 },
		);
	}
}
