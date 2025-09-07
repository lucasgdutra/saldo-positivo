import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { CategoryCreateNestedOneWithoutExpensesInputObjectSchema } from "./CategoryCreateNestedOneWithoutExpensesInput.schema";

export const ExpenseCreateWithoutUserInputObjectSchema: z.ZodType<
	Prisma.ExpenseCreateWithoutUserInput,
	Prisma.ExpenseCreateWithoutUserInput
> = z
	.object({
		id: z.string().optional(),
		amount: z.number(),
		description: z.string().nullish(),
		date: z.date(),
		createdAt: z.date().optional(),
		updatedAt: z.date().optional(),
		category: z.lazy(
			() => CategoryCreateNestedOneWithoutExpensesInputObjectSchema,
		),
	})
	.strict();
export const ExpenseCreateWithoutUserInputObjectZodSchema = z
	.object({
		id: z.string().optional(),
		amount: z.number(),
		description: z.string().nullish(),
		date: z.date(),
		createdAt: z.date().optional(),
		updatedAt: z.date().optional(),
		category: z.lazy(
			() => CategoryCreateNestedOneWithoutExpensesInputObjectSchema,
		),
	})
	.strict();
