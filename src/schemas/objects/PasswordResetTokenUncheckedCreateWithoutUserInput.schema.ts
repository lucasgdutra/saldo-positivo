import type { Prisma } from "@prisma/client";
import { z } from "zod";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			id: z.string().optional(),
			token: z.string(),
			expiresAt: z.date(),
			used: z.boolean().optional(),
			createdAt: z.date().optional(),
		})
		.strict();
export const PasswordResetTokenUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.PasswordResetTokenUncheckedCreateWithoutUserInput> =
	makeSchema() as unknown as z.ZodType<Prisma.PasswordResetTokenUncheckedCreateWithoutUserInput>;
export const PasswordResetTokenUncheckedCreateWithoutUserInputObjectZodSchema =
	makeSchema();
