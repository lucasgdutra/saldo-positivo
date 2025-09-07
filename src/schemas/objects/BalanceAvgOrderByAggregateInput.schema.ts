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
export const BalanceAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.BalanceAvgOrderByAggregateInput> =
	makeSchema() as unknown as z.ZodType<Prisma.BalanceAvgOrderByAggregateInput>;
export const BalanceAvgOrderByAggregateInputObjectZodSchema = makeSchema();
