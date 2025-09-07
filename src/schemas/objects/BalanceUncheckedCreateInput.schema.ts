import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const BalanceUncheckedCreateInputObjectSchema: z.ZodType<
	Prisma.BalanceUncheckedCreateInput,
	Prisma.BalanceUncheckedCreateInput
> = z
	.object({
		id: z.string().optional(),
		totalAmount: z.number(),
		totalRevenues: z.number(),
		totalExpenses: z.number(),
		referenceMonth: z.date(),
		createdAt: z.date().optional(),
		updatedAt: z.date().optional(),
		userId: z.string(),
	})
	.strict();
export const BalanceUncheckedCreateInputObjectZodSchema = z
	.object({
		id: z.string().optional(),
		totalAmount: z.number(),
		totalRevenues: z.number(),
		totalExpenses: z.number(),
		referenceMonth: z.date(),
		createdAt: z.date().optional(),
		updatedAt: z.date().optional(),
		userId: z.string(),
	})
	.strict();
