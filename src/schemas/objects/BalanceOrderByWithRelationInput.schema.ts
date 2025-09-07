import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { SortOrderSchema } from "../enums/SortOrder.schema";
import { UserOrderByWithRelationInputObjectSchema } from "./UserOrderByWithRelationInput.schema";

export const BalanceOrderByWithRelationInputObjectSchema: z.ZodType<
	Prisma.BalanceOrderByWithRelationInput,
	Prisma.BalanceOrderByWithRelationInput
> = z
	.object({
		id: SortOrderSchema.optional(),
		totalAmount: SortOrderSchema.optional(),
		totalRevenues: SortOrderSchema.optional(),
		totalExpenses: SortOrderSchema.optional(),
		referenceMonth: SortOrderSchema.optional(),
		createdAt: SortOrderSchema.optional(),
		updatedAt: SortOrderSchema.optional(),
		userId: SortOrderSchema.optional(),
		user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
	})
	.strict();
export const BalanceOrderByWithRelationInputObjectZodSchema = z
	.object({
		id: SortOrderSchema.optional(),
		totalAmount: SortOrderSchema.optional(),
		totalRevenues: SortOrderSchema.optional(),
		totalExpenses: SortOrderSchema.optional(),
		referenceMonth: SortOrderSchema.optional(),
		createdAt: SortOrderSchema.optional(),
		updatedAt: SortOrderSchema.optional(),
		userId: SortOrderSchema.optional(),
		user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
	})
	.strict();
