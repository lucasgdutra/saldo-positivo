import type { Prisma } from "@prisma/client";
import { z } from "zod";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			amount: z.literal(true).optional(),
		})
		.strict();
export const ExpenseSumAggregateInputObjectSchema: z.ZodType<Prisma.ExpenseSumAggregateInputType> =
	makeSchema() as unknown as z.ZodType<Prisma.ExpenseSumAggregateInputType>;
export const ExpenseSumAggregateInputObjectZodSchema = makeSchema();
