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
export const PasswordResetTokenCreateManyInputObjectSchema: z.ZodType<Prisma.PasswordResetTokenCreateManyInput> =
	makeSchema() as unknown as z.ZodType<Prisma.PasswordResetTokenCreateManyInput>;
export const PasswordResetTokenCreateManyInputObjectZodSchema = makeSchema();
