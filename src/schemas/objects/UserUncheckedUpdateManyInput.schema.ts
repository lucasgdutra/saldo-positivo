import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { NullableBoolFieldUpdateOperationsInputObjectSchema } from "./NullableBoolFieldUpdateOperationsInput.schema";
import { NullableIntFieldUpdateOperationsInputObjectSchema } from "./NullableIntFieldUpdateOperationsInput.schema";
import { NullableStringFieldUpdateOperationsInputObjectSchema } from "./NullableStringFieldUpdateOperationsInput.schema";
import { StringFieldUpdateOperationsInputObjectSchema } from "./StringFieldUpdateOperationsInput.schema";

export const UserUncheckedUpdateManyInputObjectSchema: z.ZodType<
	Prisma.UserUncheckedUpdateManyInput,
	Prisma.UserUncheckedUpdateManyInput
> = z
	.object({
		email: z
			.union([
				z.string(),
				z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
			])
			.optional(),
		password: z
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
		salaryRange: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
			])
			.nullish(),
		usageMotivation: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
			])
			.nullish(),
		customMotivation: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
			])
			.nullish(),
		financialGoals: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
			])
			.nullish(),
		hasDebts: z
			.union([
				z.boolean(),
				z.lazy(() => NullableBoolFieldUpdateOperationsInputObjectSchema),
			])
			.nullish(),
		familySize: z
			.union([
				z.number().int(),
				z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema),
			])
			.nullish(),
		financialExperience: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
			])
			.nullish(),
	})
	.strict();
export const UserUncheckedUpdateManyInputObjectZodSchema = z
	.object({
		email: z
			.union([
				z.string(),
				z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
			])
			.optional(),
		password: z
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
		salaryRange: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
			])
			.nullish(),
		usageMotivation: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
			])
			.nullish(),
		customMotivation: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
			])
			.nullish(),
		financialGoals: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
			])
			.nullish(),
		hasDebts: z
			.union([
				z.boolean(),
				z.lazy(() => NullableBoolFieldUpdateOperationsInputObjectSchema),
			])
			.nullish(),
		familySize: z
			.union([
				z.number().int(),
				z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema),
			])
			.nullish(),
		financialExperience: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
			])
			.nullish(),
	})
	.strict();
