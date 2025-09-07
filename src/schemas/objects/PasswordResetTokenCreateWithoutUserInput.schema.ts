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
export const PasswordResetTokenCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.PasswordResetTokenCreateWithoutUserInput> =
	makeSchema() as unknown as z.ZodType<Prisma.PasswordResetTokenCreateWithoutUserInput>;
export const PasswordResetTokenCreateWithoutUserInputObjectZodSchema =
	makeSchema();
