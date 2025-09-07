import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const ExpenseUncheckedCreateInputObjectSchema: z.ZodType<
	Prisma.ExpenseUncheckedCreateInput,
	Prisma.ExpenseUncheckedCreateInput
> = z
	.object({
		id: z.string().optional(),
		amount: z.number(),
		description: z.string().nullish(),
		date: z.date(),
		createdAt: z.date().optional(),
		updatedAt: z.date().optional(),
		userId: z.string(),
		categoryId: z.string(),
	})
	.strict();
export const ExpenseUncheckedCreateInputObjectZodSchema = z
	.object({
		id: z.string().optional(),
		amount: z.number(),
		description: z.string().nullish(),
		date: z.date(),
		createdAt: z.date().optional(),
		updatedAt: z.date().optional(),
		userId: z.string(),
		categoryId: z.string(),
	})
	.strict();
