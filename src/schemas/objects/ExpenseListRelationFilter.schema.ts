import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { ExpenseWhereInputObjectSchema } from "./ExpenseWhereInput.schema";

export const ExpenseListRelationFilterObjectSchema: z.ZodType<
	Prisma.ExpenseListRelationFilter,
	Prisma.ExpenseListRelationFilter
> = z
	.object({
		every: z.lazy(() => ExpenseWhereInputObjectSchema).optional(),
		some: z.lazy(() => ExpenseWhereInputObjectSchema).optional(),
		none: z.lazy(() => ExpenseWhereInputObjectSchema).optional(),
	})
	.strict();
export const ExpenseListRelationFilterObjectZodSchema = z
	.object({
		every: z.lazy(() => ExpenseWhereInputObjectSchema).optional(),
		some: z.lazy(() => ExpenseWhereInputObjectSchema).optional(),
		none: z.lazy(() => ExpenseWhereInputObjectSchema).optional(),
	})
	.strict();
