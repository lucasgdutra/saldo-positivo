import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { ExpenseUpdateManyWithoutCategoryNestedInputObjectSchema } from "./ExpenseUpdateManyWithoutCategoryNestedInput.schema";
import { StringFieldUpdateOperationsInputObjectSchema } from "./StringFieldUpdateOperationsInput.schema";
import { UserUpdateOneRequiredWithoutCategoriesNestedInputObjectSchema } from "./UserUpdateOneRequiredWithoutCategoriesNestedInput.schema";

export const CategoryUpdateInputObjectSchema: z.ZodType<
	Prisma.CategoryUpdateInput,
	Prisma.CategoryUpdateInput
> = z
	.object({
		name: z
			.union([
				z.string(),
				z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
			])
			.optional(),
		user: z
			.lazy(() => UserUpdateOneRequiredWithoutCategoriesNestedInputObjectSchema)
			.optional(),
		expenses: z
			.lazy(() => ExpenseUpdateManyWithoutCategoryNestedInputObjectSchema)
			.optional(),
	})
	.strict();
export const CategoryUpdateInputObjectZodSchema = z
	.object({
		name: z
			.union([
				z.string(),
				z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
			])
			.optional(),
		user: z
			.lazy(() => UserUpdateOneRequiredWithoutCategoriesNestedInputObjectSchema)
			.optional(),
		expenses: z
			.lazy(() => ExpenseUpdateManyWithoutCategoryNestedInputObjectSchema)
			.optional(),
	})
	.strict();
