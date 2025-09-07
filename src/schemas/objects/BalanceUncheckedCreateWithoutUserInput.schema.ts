import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const BalanceUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<
	Prisma.BalanceUncheckedCreateWithoutUserInput,
	Prisma.BalanceUncheckedCreateWithoutUserInput
> = z
	.object({
		id: z.string().optional(),
		totalAmount: z.number(),
		totalRevenues: z.number(),
		totalExpenses: z.number(),
		referenceMonth: z.date(),
		createdAt: z.date().optional(),
		updatedAt: z.date().optional(),
	})
	.strict();
export const BalanceUncheckedCreateWithoutUserInputObjectZodSchema = z
	.object({
		id: z.string().optional(),
		totalAmount: z.number(),
		totalRevenues: z.number(),
		totalExpenses: z.number(),
		referenceMonth: z.date(),
		createdAt: z.date().optional(),
		updatedAt: z.date().optional(),
	})
	.strict();
