import type { Prisma } from "@prisma/client";
import { z } from "zod";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			id: z.string().optional(),
			totalAmount: z.number(),
			totalRevenues: z.number(),
			totalExpenses: z.number(),
			referenceMonth: z.date(),
			createdAt: z.date().optional(),
			updatedAt: z.date().optional(),
		})
		.strict();
export const BalanceUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.BalanceUncheckedCreateWithoutUserInput> =
	makeSchema() as unknown as z.ZodType<Prisma.BalanceUncheckedCreateWithoutUserInput>;
export const BalanceUncheckedCreateWithoutUserInputObjectZodSchema =
	makeSchema();
