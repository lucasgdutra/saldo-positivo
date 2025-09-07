import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { SortOrderSchema } from "../enums/SortOrder.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			id: SortOrderSchema.optional(),
			name: SortOrderSchema.optional(),
			color: SortOrderSchema.optional(),
			icon: SortOrderSchema.optional(),
			userId: SortOrderSchema.optional(),
			createdAt: SortOrderSchema.optional(),
			updatedAt: SortOrderSchema.optional(),
		})
		.strict();
export const CategoryCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CategoryCountOrderByAggregateInput> =
	makeSchema() as unknown as z.ZodType<Prisma.CategoryCountOrderByAggregateInput>;
export const CategoryCountOrderByAggregateInputObjectZodSchema = makeSchema();
