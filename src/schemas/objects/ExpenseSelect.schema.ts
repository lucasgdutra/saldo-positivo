import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { CategoryArgsObjectSchema } from "./CategoryArgs.schema";
import { UserArgsObjectSchema } from "./UserArgs.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			id: z.boolean().optional(),
			amount: z.boolean().optional(),
			description: z.boolean().optional(),
			date: z.boolean().optional(),
			createdAt: z.boolean().optional(),
			updatedAt: z.boolean().optional(),
			userId: z.boolean().optional(),
			categoryId: z.boolean().optional(),
			user: z
				.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)])
				.optional(),
			category: z
				.union([z.boolean(), z.lazy(() => CategoryArgsObjectSchema)])
				.optional(),
		})
		.strict();
export const ExpenseSelectObjectSchema: z.ZodType<Prisma.ExpenseSelect> =
	makeSchema() as unknown as z.ZodType<Prisma.ExpenseSelect>;
export const ExpenseSelectObjectZodSchema = makeSchema();
