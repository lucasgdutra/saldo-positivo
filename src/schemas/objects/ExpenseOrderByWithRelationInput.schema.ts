import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { SortOrderSchema } from "../enums/SortOrder.schema";
import { CategoryOrderByWithRelationInputObjectSchema } from "./CategoryOrderByWithRelationInput.schema";
import { SortOrderInputObjectSchema } from "./SortOrderInput.schema";
import { UserOrderByWithRelationInputObjectSchema } from "./UserOrderByWithRelationInput.schema";

export const ExpenseOrderByWithRelationInputObjectSchema: z.ZodType<
	Prisma.ExpenseOrderByWithRelationInput,
	Prisma.ExpenseOrderByWithRelationInput
> = z
	.object({
		id: SortOrderSchema.optional(),
		amount: SortOrderSchema.optional(),
		description: z
			.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
			.optional(),
		date: SortOrderSchema.optional(),
		createdAt: SortOrderSchema.optional(),
		updatedAt: SortOrderSchema.optional(),
		userId: SortOrderSchema.optional(),
		categoryId: SortOrderSchema.optional(),
		user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
		category: z
			.lazy(() => CategoryOrderByWithRelationInputObjectSchema)
			.optional(),
	})
	.strict();
export const ExpenseOrderByWithRelationInputObjectZodSchema = z
	.object({
		id: SortOrderSchema.optional(),
		amount: SortOrderSchema.optional(),
		description: z
			.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
			.optional(),
		date: SortOrderSchema.optional(),
		createdAt: SortOrderSchema.optional(),
		updatedAt: SortOrderSchema.optional(),
		userId: SortOrderSchema.optional(),
		categoryId: SortOrderSchema.optional(),
		user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
		category: z
			.lazy(() => CategoryOrderByWithRelationInputObjectSchema)
			.optional(),
	})
	.strict();
