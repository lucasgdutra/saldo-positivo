import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { SortOrderSchema } from "../enums/SortOrder.schema";

export const PasswordResetTokenMaxOrderByAggregateInputObjectSchema: z.ZodType<
	Prisma.PasswordResetTokenMaxOrderByAggregateInput,
	Prisma.PasswordResetTokenMaxOrderByAggregateInput
> = z
	.object({
		id: SortOrderSchema.optional(),
		token: SortOrderSchema.optional(),
		userId: SortOrderSchema.optional(),
		expiresAt: SortOrderSchema.optional(),
		used: SortOrderSchema.optional(),
		createdAt: SortOrderSchema.optional(),
	})
	.strict();
export const PasswordResetTokenMaxOrderByAggregateInputObjectZodSchema = z
	.object({
		id: SortOrderSchema.optional(),
		token: SortOrderSchema.optional(),
		userId: SortOrderSchema.optional(),
		expiresAt: SortOrderSchema.optional(),
		used: SortOrderSchema.optional(),
		createdAt: SortOrderSchema.optional(),
	})
	.strict();
