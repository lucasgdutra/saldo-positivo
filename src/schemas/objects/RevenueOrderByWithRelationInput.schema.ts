import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { SortOrderSchema } from "../enums/SortOrder.schema";
import { SortOrderInputObjectSchema } from "./SortOrderInput.schema";
import { UserOrderByWithRelationInputObjectSchema } from "./UserOrderByWithRelationInput.schema";

export const RevenueOrderByWithRelationInputObjectSchema: z.ZodType<
	Prisma.RevenueOrderByWithRelationInput,
	Prisma.RevenueOrderByWithRelationInput
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
		user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
	})
	.strict();
export const RevenueOrderByWithRelationInputObjectZodSchema = z
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
		user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
	})
	.strict();
