import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { DateTimeFieldUpdateOperationsInputObjectSchema } from "./DateTimeFieldUpdateOperationsInput.schema";
import { StringFieldUpdateOperationsInputObjectSchema } from "./StringFieldUpdateOperationsInput.schema";
import { UserUpdateOneRequiredWithoutCategoriesNestedInputObjectSchema } from "./UserUpdateOneRequiredWithoutCategoriesNestedInput.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
				])
				.optional(),
			name: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
				])
				.optional(),
			color: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
				])
				.optional(),
			icon: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
				])
				.optional(),
			user: z
				.lazy(
					() => UserUpdateOneRequiredWithoutCategoriesNestedInputObjectSchema,
				)
				.optional(),
		})
		.strict();
export const CategoryUpdateWithoutExpensesInputObjectSchema: z.ZodType<Prisma.CategoryUpdateWithoutExpensesInput> =
	makeSchema() as unknown as z.ZodType<Prisma.CategoryUpdateWithoutExpensesInput>;
export const CategoryUpdateWithoutExpensesInputObjectZodSchema = makeSchema();
