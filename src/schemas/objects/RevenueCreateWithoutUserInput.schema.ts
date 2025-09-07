import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const RevenueCreateWithoutUserInputObjectSchema: z.ZodType<
	Prisma.RevenueCreateWithoutUserInput,
	Prisma.RevenueCreateWithoutUserInput
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
export const RevenueCreateWithoutUserInputObjectZodSchema = z
	.object({
		id: z.string().optional(),
		amount: z.number(),
		description: z.string().nullish(),
		date: z.date(),
		createdAt: z.date().optional(),
		updatedAt: z.date().optional(),
	})
	.strict();
