import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { DateTimeFieldUpdateOperationsInputObjectSchema } from "./DateTimeFieldUpdateOperationsInput.schema";
import { DecimalFieldUpdateOperationsInputObjectSchema } from "./DecimalFieldUpdateOperationsInput.schema";
import { StringFieldUpdateOperationsInputObjectSchema } from "./StringFieldUpdateOperationsInput.schema";

export const BalanceUncheckedUpdateWithoutUserInputObjectSchema: z.ZodType<
	Prisma.BalanceUncheckedUpdateWithoutUserInput,
	Prisma.BalanceUncheckedUpdateWithoutUserInput
> = z
	.object({
		id: z
			.union([
				z.string(),
				z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
			])
			.optional(),
		totalAmount: z
			.union([
				z.number(),
				z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema),
			])
			.optional(),
		totalRevenues: z
			.union([
				z.number(),
				z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema),
			])
			.optional(),
		totalExpenses: z
			.union([
				z.number(),
				z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema),
			])
			.optional(),
		referenceMonth: z
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
	})
	.strict();
export const BalanceUncheckedUpdateWithoutUserInputObjectZodSchema = z
	.object({
		id: z
			.union([
				z.string(),
				z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
			])
			.optional(),
		totalAmount: z
			.union([
				z.number(),
				z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema),
			])
			.optional(),
		totalRevenues: z
			.union([
				z.number(),
				z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema),
			])
			.optional(),
		totalExpenses: z
			.union([
				z.number(),
				z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema),
			])
			.optional(),
		referenceMonth: z
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
	})
	.strict();
