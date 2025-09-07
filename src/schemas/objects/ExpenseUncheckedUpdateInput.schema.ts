import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { DateTimeFieldUpdateOperationsInputObjectSchema } from "./DateTimeFieldUpdateOperationsInput.schema";
import { DecimalFieldUpdateOperationsInputObjectSchema } from "./DecimalFieldUpdateOperationsInput.schema";
import { NullableStringFieldUpdateOperationsInputObjectSchema } from "./NullableStringFieldUpdateOperationsInput.schema";
import { StringFieldUpdateOperationsInputObjectSchema } from "./StringFieldUpdateOperationsInput.schema";

export const ExpenseUncheckedUpdateInputObjectSchema: z.ZodType<
	Prisma.ExpenseUncheckedUpdateInput,
	Prisma.ExpenseUncheckedUpdateInput
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
		userId: z
			.union([
				z.string(),
				z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
			])
			.optional(),
		categoryId: z
			.union([
				z.string(),
				z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
			])
			.optional(),
	})
	.strict();
export const ExpenseUncheckedUpdateInputObjectZodSchema = z
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
		userId: z
			.union([
				z.string(),
				z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
			])
			.optional(),
		categoryId: z
			.union([
				z.string(),
				z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
			])
			.optional(),
	})
	.strict();
