import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { PrismaClientWithExtensions, db as prismaInstance } from "@/lib/db";
import {
	ProfileRepository,
	ProfileUpdateData,
} from "../repositories/ProfileRepository";

export type ProfileData = Omit<User, "password">;

export interface ProfileStats {
	totalExpenses: number;
	totalRevenues: number;
	totalCategories: number;
	accountAge: number;
}

export class ProfileService {
	private profileRepository: ProfileRepository;
	private prisma: PrismaClientWithExtensions;

	constructor(prisma: PrismaClientWithExtensions = prismaInstance) {
		this.prisma = prisma;
		this.profileRepository = new ProfileRepository(this.prisma);
	}

	async getProfile(userId: string): Promise<ProfileData | null> {
		console.log(`ProfileService: Buscando perfil para usuário ID: ${userId}`);

		const profile = await this.profileRepository.getProfile(userId);
		if (!profile) {
			console.warn(
				`ProfileService: Perfil não encontrado para usuário ID: ${userId}`,
			);
			return null;
		}

		console.log(`ProfileService: Perfil encontrado para usuário ID: ${userId}`);
		return profile;
	}

	async updateProfile(
		userId: string,
		data: ProfileUpdateData,
	): Promise<ProfileData> {
		console.log(
			`ProfileService: Atualizando perfil para usuário ID: ${userId}`,
		);

		if (data.email) {
			const emailExists = await this.profileRepository.checkEmailExists(
				data.email,
				userId,
			);
			if (emailExists) {
				throw new Error("Este email já está sendo usado por outro usuário");
			}
		}

		if (data.password) {
			console.log(
				`ProfileService: Senha será atualizada para usuário ID: ${userId}`,
			);
			data.password = await bcrypt.hash(data.password, 12);
		}

		const updatedProfile = await this.profileRepository.updateProfile(
			userId,
			data,
		);
		console.log(
			`ProfileService: Perfil atualizado com sucesso para usuário ID: ${userId}`,
		);

		return updatedProfile;
	}

	async getProfileStats(userId: string): Promise<ProfileStats> {
		console.log(
			`ProfileService: Buscando estatísticas para usuário ID: ${userId}`,
		);

		const stats = await this.profileRepository.getProfileStats(userId);

		console.log(
			`ProfileService: Estatísticas encontradas para usuário ID: ${userId}`,
			stats,
		);
		return stats;
	}

	async validateCurrentPassword(
		userId: string,
		currentPassword: string,
	): Promise<boolean> {
		console.log(
			`ProfileService: Validando senha atual para usuário ID: ${userId}`,
		);

		const user = await this.prisma.user.findUnique({
			where: { id: userId },
			select: { password: true },
		});

		if (!user) {
			throw new Error("Usuário não encontrado");
		}

		const isValid = await bcrypt.compare(currentPassword, user.password);
		console.log(
			`ProfileService: Validação de senha para usuário ID: ${userId} - ${isValid ? "válida" : "inválida"}`,
		);

		return isValid;
	}
}

export default ProfileService;
