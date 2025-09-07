import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const NullableBoolFieldUpdateOperationsInputObjectSchema: z.ZodType<
	Prisma.NullableBoolFieldUpdateOperationsInput,
	Prisma.NullableBoolFieldUpdateOperationsInput
> = z
	.object({
		set: z.boolean().nullish(),
	})
	.strict();
export const NullableBoolFieldUpdateOperationsInputObjectZodSchema = z
	.object({
		set: z.boolean().nullish(),
	})
	.strict();
