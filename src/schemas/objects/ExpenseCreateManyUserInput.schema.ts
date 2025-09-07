import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const ExpenseCreateManyUserInputObjectSchema: z.ZodType<
	Prisma.ExpenseCreateManyUserInput,
	Prisma.ExpenseCreateManyUserInput
> = z
	.object({
		id: z.string().optional(),
		amount: z.number(),
		description: z.string().nullish(),
		date: z.date(),
		createdAt: z.date().optional(),
		updatedAt: z.date().optional(),
		categoryId: z.string(),
	})
	.strict();
export const ExpenseCreateManyUserInputObjectZodSchema = z
	.object({
		id: z.string().optional(),
		amount: z.number(),
		description: z.string().nullish(),
		date: z.date(),
		createdAt: z.date().optional(),
		updatedAt: z.date().optional(),
		categoryId: z.string(),
	})
	.strict();
