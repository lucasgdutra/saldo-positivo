import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const NullableStringFieldUpdateOperationsInputObjectSchema: z.ZodType<
	Prisma.NullableStringFieldUpdateOperationsInput,
	Prisma.NullableStringFieldUpdateOperationsInput
> = z
	.object({
		set: z.string().nullish(),
	})
	.strict();
export const NullableStringFieldUpdateOperationsInputObjectZodSchema = z
	.object({
		set: z.string().nullish(),
	})
	.strict();
