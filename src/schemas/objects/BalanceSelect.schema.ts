import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { UserArgsObjectSchema } from "./UserArgs.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			id: z.boolean().optional(),
			totalAmount: z.boolean().optional(),
			totalRevenues: z.boolean().optional(),
			totalExpenses: z.boolean().optional(),
			referenceMonth: z.boolean().optional(),
			createdAt: z.boolean().optional(),
			updatedAt: z.boolean().optional(),
			userId: z.boolean().optional(),
			user: z
				.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)])
				.optional(),
		})
		.strict();
export const BalanceSelectObjectSchema: z.ZodType<Prisma.BalanceSelect> =
	makeSchema() as unknown as z.ZodType<Prisma.BalanceSelect>;
export const BalanceSelectObjectZodSchema = makeSchema();
