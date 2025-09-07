import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { SortOrderSchema } from "../enums/SortOrder.schema";

export const UserMaxOrderByAggregateInputObjectSchema: z.ZodType<
	Prisma.UserMaxOrderByAggregateInput,
	Prisma.UserMaxOrderByAggregateInput
> = z
	.object({
		id: SortOrderSchema.optional(),
		email: SortOrderSchema.optional(),
		password: SortOrderSchema.optional(),
		name: SortOrderSchema.optional(),
		salaryRange: SortOrderSchema.optional(),
		usageMotivation: SortOrderSchema.optional(),
		customMotivation: SortOrderSchema.optional(),
		financialGoals: SortOrderSchema.optional(),
		hasDebts: SortOrderSchema.optional(),
		familySize: SortOrderSchema.optional(),
		financialExperience: SortOrderSchema.optional(),
		createdAt: SortOrderSchema.optional(),
		updatedAt: SortOrderSchema.optional(),
	})
	.strict();
export const UserMaxOrderByAggregateInputObjectZodSchema = z
	.object({
		id: SortOrderSchema.optional(),
		email: SortOrderSchema.optional(),
		password: SortOrderSchema.optional(),
		name: SortOrderSchema.optional(),
		salaryRange: SortOrderSchema.optional(),
		usageMotivation: SortOrderSchema.optional(),
		customMotivation: SortOrderSchema.optional(),
		financialGoals: SortOrderSchema.optional(),
		hasDebts: SortOrderSchema.optional(),
		familySize: SortOrderSchema.optional(),
		financialExperience: SortOrderSchema.optional(),
		createdAt: SortOrderSchema.optional(),
		updatedAt: SortOrderSchema.optional(),
	})
	.strict();
