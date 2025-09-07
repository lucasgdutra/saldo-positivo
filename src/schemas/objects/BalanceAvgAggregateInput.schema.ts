import type { Prisma } from "@prisma/client";
import { z } from "zod";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			totalAmount: z.literal(true).optional(),
			totalRevenues: z.literal(true).optional(),
			totalExpenses: z.literal(true).optional(),
		})
		.strict();
export const BalanceAvgAggregateInputObjectSchema: z.ZodType<Prisma.BalanceAvgAggregateInputType> =
	makeSchema() as unknown as z.ZodType<Prisma.BalanceAvgAggregateInputType>;
export const BalanceAvgAggregateInputObjectZodSchema = makeSchema();
