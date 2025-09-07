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
export const RevenueMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RevenueMaxOrderByAggregateInput> =
	makeSchema() as unknown as z.ZodType<Prisma.RevenueMaxOrderByAggregateInput>;
export const RevenueMaxOrderByAggregateInputObjectZodSchema = makeSchema();
