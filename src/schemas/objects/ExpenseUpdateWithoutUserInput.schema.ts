import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { CategoryUpdateOneRequiredWithoutExpensesNestedInputObjectSchema } from "./CategoryUpdateOneRequiredWithoutExpensesNestedInput.schema";
import { DateTimeFieldUpdateOperationsInputObjectSchema } from "./DateTimeFieldUpdateOperationsInput.schema";
import { DecimalFieldUpdateOperationsInputObjectSchema } from "./DecimalFieldUpdateOperationsInput.schema";
import { NullableStringFieldUpdateOperationsInputObjectSchema } from "./NullableStringFieldUpdateOperationsInput.schema";

export const ExpenseUpdateWithoutUserInputObjectSchema: z.ZodType<
	Prisma.ExpenseUpdateWithoutUserInput,
	Prisma.ExpenseUpdateWithoutUserInput
> = z
	.object({
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
		category: z
			.lazy(
				() => CategoryUpdateOneRequiredWithoutExpensesNestedInputObjectSchema,
			)
			.optional(),
	})
	.strict();
export const ExpenseUpdateWithoutUserInputObjectZodSchema = z
	.object({
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
		category: z
			.lazy(
				() => CategoryUpdateOneRequiredWithoutExpensesNestedInputObjectSchema,
			)
			.optional(),
	})
	.strict();
