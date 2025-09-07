import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { SortOrderSchema } from "../enums/SortOrder.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			amount: SortOrderSchema.optional(),
		})
		.strict();
export const ExpenseSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ExpenseSumOrderByAggregateInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ExpenseSumOrderByAggregateInput>;
export const ExpenseSumOrderByAggregateInputObjectZodSchema = makeSchema();
