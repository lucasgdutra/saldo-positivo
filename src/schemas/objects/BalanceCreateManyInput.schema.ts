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
			userId: z.string(),
		})
		.strict();
export const BalanceCreateManyInputObjectSchema: z.ZodType<Prisma.BalanceCreateManyInput> =
	makeSchema() as unknown as z.ZodType<Prisma.BalanceCreateManyInput>;
export const BalanceCreateManyInputObjectZodSchema = makeSchema();
