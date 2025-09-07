import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const StringFieldUpdateOperationsInputObjectSchema: z.ZodType<
	Prisma.StringFieldUpdateOperationsInput,
	Prisma.StringFieldUpdateOperationsInput
> = z
	.object({
		set: z.string().optional(),
	})
	.strict();
export const StringFieldUpdateOperationsInputObjectZodSchema = z
	.object({
		set: z.string().optional(),
	})
	.strict();
