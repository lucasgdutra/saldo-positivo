import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { ExpenseUncheckedCreateNestedManyWithoutCategoryInputObjectSchema } from "./ExpenseUncheckedCreateNestedManyWithoutCategoryInput.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			id: z.string().optional(),
			name: z.string(),
			color: z.string().optional(),
			icon: z.string().optional(),
			userId: z.string(),
			createdAt: z.date().optional(),
			updatedAt: z.date().optional(),
			expenses: z
				.lazy(
					() =>
						ExpenseUncheckedCreateNestedManyWithoutCategoryInputObjectSchema,
				)
				.optional(),
		})
		.strict();
export const CategoryUncheckedCreateInputObjectSchema: z.ZodType<Prisma.CategoryUncheckedCreateInput> =
	makeSchema() as unknown as z.ZodType<Prisma.CategoryUncheckedCreateInput>;
export const CategoryUncheckedCreateInputObjectZodSchema = makeSchema();
