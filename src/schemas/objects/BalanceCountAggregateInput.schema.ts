import type { Prisma } from "@prisma/client";
import { z } from "zod";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			id: z.literal(true).optional(),
			totalAmount: z.literal(true).optional(),
			totalRevenues: z.literal(true).optional(),
			totalExpenses: z.literal(true).optional(),
			referenceMonth: z.literal(true).optional(),
			createdAt: z.literal(true).optional(),
			updatedAt: z.literal(true).optional(),
			userId: z.literal(true).optional(),
			_all: z.literal(true).optional(),
		})
		.strict();
export const BalanceCountAggregateInputObjectSchema: z.ZodType<Prisma.BalanceCountAggregateInputType> =
	makeSchema() as unknown as z.ZodType<Prisma.BalanceCountAggregateInputType>;
export const BalanceCountAggregateInputObjectZodSchema = makeSchema();
