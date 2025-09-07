import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { CategoryCreateNestedOneWithoutExpensesInputObjectSchema } from "./CategoryCreateNestedOneWithoutExpensesInput.schema";
import { UserCreateNestedOneWithoutExpensesInputObjectSchema } from "./UserCreateNestedOneWithoutExpensesInput.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			id: z.string().optional(),
			amount: z.number(),
			description: z.string().nullish(),
			date: z.date(),
			createdAt: z.date().optional(),
			updatedAt: z.date().optional(),
			user: z.lazy(() => UserCreateNestedOneWithoutExpensesInputObjectSchema),
			category: z.lazy(
				() => CategoryCreateNestedOneWithoutExpensesInputObjectSchema,
			),
		})
		.strict();
export const ExpenseCreateInputObjectSchema: z.ZodType<Prisma.ExpenseCreateInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ExpenseCreateInput>;
export const ExpenseCreateInputObjectZodSchema = makeSchema();
