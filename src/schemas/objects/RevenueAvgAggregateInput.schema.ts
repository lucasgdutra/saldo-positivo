import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const RevenueAvgAggregateInputObjectSchema: z.ZodType<
	Prisma.RevenueAvgAggregateInputType,
	Prisma.RevenueAvgAggregateInputType
> = z
	.object({
		amount: z.literal(true).optional(),
	})
	.strict();
export const RevenueAvgAggregateInputObjectZodSchema = z
	.object({
		amount: z.literal(true).optional(),
	})
	.strict();
