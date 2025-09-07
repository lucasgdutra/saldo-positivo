import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const ExpenseWhereUniqueInputObjectSchema: z.ZodType<
	Prisma.ExpenseWhereUniqueInput,
	Prisma.ExpenseWhereUniqueInput
> = z
	.object({
		id: z.string(),
	})
	.strict();
export const ExpenseWhereUniqueInputObjectZodSchema = z
	.object({
		id: z.string(),
	})
	.strict();
