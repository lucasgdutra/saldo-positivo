import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { SortOrderSchema } from "../enums/SortOrder.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			id: SortOrderSchema.optional(),
			amount: SortOrderSchema.optional(),
			description: SortOrderSchema.optional(),
			date: SortOrderSchema.optional(),
			createdAt: SortOrderSchema.optional(),
			updatedAt: SortOrderSchema.optional(),
			userId: SortOrderSchema.optional(),
		})
		.strict();
export const RevenueMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RevenueMinOrderByAggregateInput> =
	makeSchema() as unknown as z.ZodType<Prisma.RevenueMinOrderByAggregateInput>;
export const RevenueMinOrderByAggregateInputObjectZodSchema = makeSchema();
