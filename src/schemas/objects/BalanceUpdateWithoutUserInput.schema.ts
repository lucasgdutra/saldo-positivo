import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { DateTimeFieldUpdateOperationsInputObjectSchema } from "./DateTimeFieldUpdateOperationsInput.schema";
import { DecimalFieldUpdateOperationsInputObjectSchema } from "./DecimalFieldUpdateOperationsInput.schema";

export const BalanceUpdateWithoutUserInputObjectSchema: z.ZodType<
	Prisma.BalanceUpdateWithoutUserInput,
	Prisma.BalanceUpdateWithoutUserInput
> = z
	.object({
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
	})
	.strict();
export const BalanceUpdateWithoutUserInputObjectZodSchema = z
	.object({
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
	})
	.strict();
