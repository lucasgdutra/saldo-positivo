import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const UserSumAggregateInputObjectSchema: z.ZodType<
	Prisma.UserSumAggregateInputType,
	Prisma.UserSumAggregateInputType
> = z
	.object({
		familySize: z.literal(true).optional(),
	})
	.strict();
export const UserSumAggregateInputObjectZodSchema = z
	.object({
		familySize: z.literal(true).optional(),
	})
	.strict();
