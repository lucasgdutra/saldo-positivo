import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { StringFieldUpdateOperationsInputObjectSchema } from "./StringFieldUpdateOperationsInput.schema";

export const CategoryUncheckedUpdateManyWithoutUserInputObjectSchema: z.ZodType<
	Prisma.CategoryUncheckedUpdateManyWithoutUserInput,
	Prisma.CategoryUncheckedUpdateManyWithoutUserInput
> = z
	.object({
		name: z
			.union([
				z.string(),
				z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
			])
			.optional(),
	})
	.strict();
export const CategoryUncheckedUpdateManyWithoutUserInputObjectZodSchema = z
	.object({
		name: z
			.union([
				z.string(),
				z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
			])
			.optional(),
	})
	.strict();
