import type { Prisma } from "@prisma/client";
import { z } from "zod";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			id: z.literal(true).optional(),
			token: z.literal(true).optional(),
			userId: z.literal(true).optional(),
			expiresAt: z.literal(true).optional(),
			used: z.literal(true).optional(),
			createdAt: z.literal(true).optional(),
			_all: z.literal(true).optional(),
		})
		.strict();
export const PasswordResetTokenCountAggregateInputObjectSchema: z.ZodType<Prisma.PasswordResetTokenCountAggregateInputType> =
	makeSchema() as unknown as z.ZodType<Prisma.PasswordResetTokenCountAggregateInputType>;
export const PasswordResetTokenCountAggregateInputObjectZodSchema =
	makeSchema();
