import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { SortOrderSchema } from "../enums/SortOrder.schema";

export const PasswordResetTokenOrderByRelationAggregateInputObjectSchema: z.ZodType<
	Prisma.PasswordResetTokenOrderByRelationAggregateInput,
	Prisma.PasswordResetTokenOrderByRelationAggregateInput
> = z
	.object({
		_count: SortOrderSchema.optional(),
	})
	.strict();
export const PasswordResetTokenOrderByRelationAggregateInputObjectZodSchema = z
	.object({
		_count: SortOrderSchema.optional(),
	})
	.strict();
