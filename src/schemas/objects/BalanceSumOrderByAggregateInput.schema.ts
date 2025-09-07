import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { SortOrderSchema } from "../enums/SortOrder.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			totalAmount: SortOrderSchema.optional(),
			totalRevenues: SortOrderSchema.optional(),
			totalExpenses: SortOrderSchema.optional(),
		})
		.strict();
export const BalanceSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.BalanceSumOrderByAggregateInput> =
	makeSchema() as unknown as z.ZodType<Prisma.BalanceSumOrderByAggregateInput>;
export const BalanceSumOrderByAggregateInputObjectZodSchema = makeSchema();
