import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { UserCreateNestedOneWithoutBalanceInputObjectSchema } from "./UserCreateNestedOneWithoutBalanceInput.schema";

export const BalanceCreateInputObjectSchema: z.ZodType<
	Prisma.BalanceCreateInput,
	Prisma.BalanceCreateInput
> = z
	.object({
		id: z.string().optional(),
		totalAmount: z.number(),
		totalRevenues: z.number(),
		totalExpenses: z.number(),
		referenceMonth: z.date(),
		createdAt: z.date().optional(),
		updatedAt: z.date().optional(),
		user: z.lazy(() => UserCreateNestedOneWithoutBalanceInputObjectSchema),
	})
	.strict();
export const BalanceCreateInputObjectZodSchema = z
	.object({
		id: z.string().optional(),
		totalAmount: z.number(),
		totalRevenues: z.number(),
		totalExpenses: z.number(),
		referenceMonth: z.date(),
		createdAt: z.date().optional(),
		updatedAt: z.date().optional(),
		user: z.lazy(() => UserCreateNestedOneWithoutBalanceInputObjectSchema),
	})
	.strict();
