import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const ExpenseSumAggregateInputObjectSchema: z.ZodType<
	Prisma.ExpenseSumAggregateInputType,
	Prisma.ExpenseSumAggregateInputType
> = z
	.object({
		amount: z.literal(true).optional(),
	})
	.strict();
export const ExpenseSumAggregateInputObjectZodSchema = z
	.object({
		amount: z.literal(true).optional(),
	})
	.strict();
