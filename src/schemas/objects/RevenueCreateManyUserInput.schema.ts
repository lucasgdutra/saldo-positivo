import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const RevenueCreateManyUserInputObjectSchema: z.ZodType<
	Prisma.RevenueCreateManyUserInput,
	Prisma.RevenueCreateManyUserInput
> = z
	.object({
		id: z.string().optional(),
		amount: z.number(),
		description: z.string().nullish(),
		date: z.date(),
		createdAt: z.date().optional(),
		updatedAt: z.date().optional(),
	})
	.strict();
export const RevenueCreateManyUserInputObjectZodSchema = z
	.object({
		id: z.string().optional(),
		amount: z.number(),
		description: z.string().nullish(),
		date: z.date(),
		createdAt: z.date().optional(),
		updatedAt: z.date().optional(),
	})
	.strict();
