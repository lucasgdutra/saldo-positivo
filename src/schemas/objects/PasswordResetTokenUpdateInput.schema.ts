import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { BoolFieldUpdateOperationsInputObjectSchema } from "./BoolFieldUpdateOperationsInput.schema";
import { DateTimeFieldUpdateOperationsInputObjectSchema } from "./DateTimeFieldUpdateOperationsInput.schema";
import { StringFieldUpdateOperationsInputObjectSchema } from "./StringFieldUpdateOperationsInput.schema";
import { UserUpdateOneRequiredWithoutPasswordResetTokensNestedInputObjectSchema } from "./UserUpdateOneRequiredWithoutPasswordResetTokensNestedInput.schema";

export const PasswordResetTokenUpdateInputObjectSchema: z.ZodType<
	Prisma.PasswordResetTokenUpdateInput,
	Prisma.PasswordResetTokenUpdateInput
> = z
	.object({
		token: z
			.union([
				z.string(),
				z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
			])
			.optional(),
		expiresAt: z
			.union([
				z.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
			])
			.optional(),
		used: z
			.union([
				z.boolean(),
				z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema),
			])
			.optional(),
		user: z
			.lazy(
				() =>
					UserUpdateOneRequiredWithoutPasswordResetTokensNestedInputObjectSchema,
			)
			.optional(),
	})
	.strict();
export const PasswordResetTokenUpdateInputObjectZodSchema = z
	.object({
		token: z
			.union([
				z.string(),
				z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
			])
			.optional(),
		expiresAt: z
			.union([
				z.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
			])
			.optional(),
		used: z
			.union([
				z.boolean(),
				z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema),
			])
			.optional(),
		user: z
			.lazy(
				() =>
					UserUpdateOneRequiredWithoutPasswordResetTokensNestedInputObjectSchema,
			)
			.optional(),
	})
	.strict();
