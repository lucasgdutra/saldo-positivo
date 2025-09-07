import type { Prisma } from "@prisma/client";
import { z } from "zod";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			amount: z.literal(true).optional(),
		})
		.strict();
export const RevenueAvgAggregateInputObjectSchema: z.ZodType<Prisma.RevenueAvgAggregateInputType> =
	makeSchema() as unknown as z.ZodType<Prisma.RevenueAvgAggregateInputType>;
export const RevenueAvgAggregateInputObjectZodSchema = makeSchema();
