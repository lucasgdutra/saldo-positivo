import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const RevenueCreateManyInputObjectSchema: z.ZodType<
	Prisma.RevenueCreateManyInput,
	Prisma.RevenueCreateManyInput
> = z
	.object({
		id: z.string().optional(),
		amount: z.number(),
		description: z.string().nullish(),
		date: z.date(),
		createdAt: z.date().optional(),
		updatedAt: z.date().optional(),
		userId: z.string(),
	})
	.strict();
export const RevenueCreateManyInputObjectZodSchema = z
	.object({
		id: z.string().optional(),
		amount: z.number(),
		description: z.string().nullish(),
		date: z.date(),
		createdAt: z.date().optional(),
		updatedAt: z.date().optional(),
		userId: z.string(),
	})
	.strict();
