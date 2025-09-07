import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { CategoryUpdateOneRequiredWithoutExpensesNestedInputObjectSchema } from "./CategoryUpdateOneRequiredWithoutExpensesNestedInput.schema";
import { DateTimeFieldUpdateOperationsInputObjectSchema } from "./DateTimeFieldUpdateOperationsInput.schema";
import { DecimalFieldUpdateOperationsInputObjectSchema } from "./DecimalFieldUpdateOperationsInput.schema";
import { NullableStringFieldUpdateOperationsInputObjectSchema } from "./NullableStringFieldUpdateOperationsInput.schema";
import { StringFieldUpdateOperationsInputObjectSchema } from "./StringFieldUpdateOperationsInput.schema";
import { UserUpdateOneRequiredWithoutExpensesNestedInputObjectSchema } from "./UserUpdateOneRequiredWithoutExpensesNestedInput.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			id: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
				])
				.optional(),
			amount: z
				.union([
					z.number(),
					z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema),
				])
				.optional(),
			description: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
				])
				.nullish(),
			date: z
				.union([
					z.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
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
				.lazy(() => UserUpdateOneRequiredWithoutExpensesNestedInputObjectSchema)
				.optional(),
			category: z
				.lazy(
					() => CategoryUpdateOneRequiredWithoutExpensesNestedInputObjectSchema,
				)
				.optional(),
		})
		.strict();
export const ExpenseUpdateInputObjectSchema: z.ZodType<Prisma.ExpenseUpdateInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ExpenseUpdateInput>;
export const ExpenseUpdateInputObjectZodSchema = makeSchema();
