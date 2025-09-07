import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { ExpenseCreateNestedManyWithoutCategoryInputObjectSchema } from "./ExpenseCreateNestedManyWithoutCategoryInput.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			id: z.string().optional(),
			name: z.string(),
			color: z.string().optional(),
			icon: z.string().optional(),
			createdAt: z.date().optional(),
			updatedAt: z.date().optional(),
			expenses: z
				.lazy(() => ExpenseCreateNestedManyWithoutCategoryInputObjectSchema)
				.optional(),
		})
		.strict();
export const CategoryCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.CategoryCreateWithoutUserInput> =
	makeSchema() as unknown as z.ZodType<Prisma.CategoryCreateWithoutUserInput>;
export const CategoryCreateWithoutUserInputObjectZodSchema = makeSchema();
