import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { UserCreateNestedOneWithoutRevenuesInputObjectSchema } from "./UserCreateNestedOneWithoutRevenuesInput.schema";

export const RevenueCreateInputObjectSchema: z.ZodType<
	Prisma.RevenueCreateInput,
	Prisma.RevenueCreateInput
> = z
	.object({
		id: z.string().optional(),
		amount: z.number(),
		description: z.string().nullish(),
		date: z.date(),
		createdAt: z.date().optional(),
		updatedAt: z.date().optional(),
		user: z.lazy(() => UserCreateNestedOneWithoutRevenuesInputObjectSchema),
	})
	.strict();
export const RevenueCreateInputObjectZodSchema = z
	.object({
		id: z.string().optional(),
		amount: z.number(),
		description: z.string().nullish(),
		date: z.date(),
		createdAt: z.date().optional(),
		updatedAt: z.date().optional(),
		user: z.lazy(() => UserCreateNestedOneWithoutRevenuesInputObjectSchema),
	})
	.strict();
