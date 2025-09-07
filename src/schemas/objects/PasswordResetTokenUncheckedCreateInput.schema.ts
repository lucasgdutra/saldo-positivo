import type { Prisma } from "@prisma/client";
import { z } from "zod";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			id: z.string().optional(),
			token: z.string(),
			userId: z.string(),
			expiresAt: z.date(),
			used: z.boolean().optional(),
			createdAt: z.date().optional(),
		})
		.strict();
export const PasswordResetTokenUncheckedCreateInputObjectSchema: z.ZodType<Prisma.PasswordResetTokenUncheckedCreateInput> =
	makeSchema() as unknown as z.ZodType<Prisma.PasswordResetTokenUncheckedCreateInput>;
export const PasswordResetTokenUncheckedCreateInputObjectZodSchema =
	makeSchema();
