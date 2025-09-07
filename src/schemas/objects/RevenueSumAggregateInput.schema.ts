import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const RevenueSumAggregateInputObjectSchema: z.ZodType<
	Prisma.RevenueSumAggregateInputType,
	Prisma.RevenueSumAggregateInputType
> = z
	.object({
		amount: z.literal(true).optional(),
	})
	.strict();
export const RevenueSumAggregateInputObjectZodSchema = z
	.object({
		amount: z.literal(true).optional(),
	})
	.strict();
