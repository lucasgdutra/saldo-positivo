import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { DateTimeFieldUpdateOperationsInputObjectSchema } from "./DateTimeFieldUpdateOperationsInput.schema";
import { DecimalFieldUpdateOperationsInputObjectSchema } from "./DecimalFieldUpdateOperationsInput.schema";
import { NullableStringFieldUpdateOperationsInputObjectSchema } from "./NullableStringFieldUpdateOperationsInput.schema";
import { UserUpdateOneRequiredWithoutRevenuesNestedInputObjectSchema } from "./UserUpdateOneRequiredWithoutRevenuesNestedInput.schema";

export const RevenueUpdateInputObjectSchema: z.ZodType<
	Prisma.RevenueUpdateInput,
	Prisma.RevenueUpdateInput
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
		user: z
			.lazy(() => UserUpdateOneRequiredWithoutRevenuesNestedInputObjectSchema)
			.optional(),
	})
	.strict();
export const RevenueUpdateInputObjectZodSchema = z
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
		user: z
			.lazy(() => UserUpdateOneRequiredWithoutRevenuesNestedInputObjectSchema)
			.optional(),
	})
	.strict();
