import type { Prisma } from "@prisma/client";
import { z } from "zod";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			id: z.literal(true).optional(),
			amount: z.literal(true).optional(),
			description: z.literal(true).optional(),
			date: z.literal(true).optional(),
			createdAt: z.literal(true).optional(),
			updatedAt: z.literal(true).optional(),
			userId: z.literal(true).optional(),
			categoryId: z.literal(true).optional(),
			_all: z.literal(true).optional(),
		})
		.strict();
export const ExpenseCountAggregateInputObjectSchema: z.ZodType<Prisma.ExpenseCountAggregateInputType> =
	makeSchema() as unknown as z.ZodType<Prisma.ExpenseCountAggregateInputType>;
export const ExpenseCountAggregateInputObjectZodSchema = makeSchema();
