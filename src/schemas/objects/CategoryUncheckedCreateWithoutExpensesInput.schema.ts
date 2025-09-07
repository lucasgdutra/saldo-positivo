import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const CategoryUncheckedCreateWithoutExpensesInputObjectSchema: z.ZodType<
	Prisma.CategoryUncheckedCreateWithoutExpensesInput,
	Prisma.CategoryUncheckedCreateWithoutExpensesInput
> = z
	.object({
		id: z.string().optional(),
		name: z.string(),
		userId: z.string(),
		createdAt: z.date().optional(),
		updatedAt: z.date().optional(),
	})
	.strict();
export const CategoryUncheckedCreateWithoutExpensesInputObjectZodSchema = z
	.object({
		id: z.string().optional(),
		name: z.string(),
		userId: z.string(),
		createdAt: z.date().optional(),
		updatedAt: z.date().optional(),
	})
	.strict();
