import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { StringFieldUpdateOperationsInputObjectSchema } from "./StringFieldUpdateOperationsInput.schema";
import { UserUpdateOneRequiredWithoutCategoriesNestedInputObjectSchema } from "./UserUpdateOneRequiredWithoutCategoriesNestedInput.schema";

export const CategoryUpdateWithoutExpensesInputObjectSchema: z.ZodType<
	Prisma.CategoryUpdateWithoutExpensesInput,
	Prisma.CategoryUpdateWithoutExpensesInput
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
	})
	.strict();
export const CategoryUpdateWithoutExpensesInputObjectZodSchema = z
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
	})
	.strict();
