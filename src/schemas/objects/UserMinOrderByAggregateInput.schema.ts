import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { SortOrderSchema } from "../enums/SortOrder.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
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
export const UserMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserMinOrderByAggregateInput>;
export const UserMinOrderByAggregateInputObjectZodSchema = makeSchema();
