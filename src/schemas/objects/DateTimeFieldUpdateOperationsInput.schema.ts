import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const DateTimeFieldUpdateOperationsInputObjectSchema: z.ZodType<
	Prisma.DateTimeFieldUpdateOperationsInput,
	Prisma.DateTimeFieldUpdateOperationsInput
> = z
	.object({
		set: z.date().optional(),
	})
	.strict();
export const DateTimeFieldUpdateOperationsInputObjectZodSchema = z
	.object({
		set: z.date().optional(),
	})
	.strict();
