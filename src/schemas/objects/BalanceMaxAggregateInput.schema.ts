import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const BalanceMaxAggregateInputObjectSchema: z.ZodType<
	Prisma.BalanceMaxAggregateInputType,
	Prisma.BalanceMaxAggregateInputType
> = z
	.object({
		id: z.literal(true).optional(),
		totalAmount: z.literal(true).optional(),
		totalRevenues: z.literal(true).optional(),
		totalExpenses: z.literal(true).optional(),
		referenceMonth: z.literal(true).optional(),
		createdAt: z.literal(true).optional(),
		updatedAt: z.literal(true).optional(),
		userId: z.literal(true).optional(),
	})
	.strict();
export const BalanceMaxAggregateInputObjectZodSchema = z
	.object({
		id: z.literal(true).optional(),
		totalAmount: z.literal(true).optional(),
		totalRevenues: z.literal(true).optional(),
		totalExpenses: z.literal(true).optional(),
		referenceMonth: z.literal(true).optional(),
		createdAt: z.literal(true).optional(),
		updatedAt: z.literal(true).optional(),
		userId: z.literal(true).optional(),
	})
	.strict();
