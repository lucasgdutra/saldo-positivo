import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const PasswordResetTokenMaxAggregateInputObjectSchema: z.ZodType<
	Prisma.PasswordResetTokenMaxAggregateInputType,
	Prisma.PasswordResetTokenMaxAggregateInputType
> = z
	.object({
		id: z.literal(true).optional(),
		token: z.literal(true).optional(),
		userId: z.literal(true).optional(),
		expiresAt: z.literal(true).optional(),
		used: z.literal(true).optional(),
		createdAt: z.literal(true).optional(),
	})
	.strict();
export const PasswordResetTokenMaxAggregateInputObjectZodSchema = z
	.object({
		id: z.literal(true).optional(),
		token: z.literal(true).optional(),
		userId: z.literal(true).optional(),
		expiresAt: z.literal(true).optional(),
		used: z.literal(true).optional(),
		createdAt: z.literal(true).optional(),
	})
	.strict();
