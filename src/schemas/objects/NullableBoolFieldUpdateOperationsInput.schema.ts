import type { Prisma } from "@prisma/client";
import { z } from "zod";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			set: z.boolean().nullish(),
		})
		.strict();
export const NullableBoolFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.NullableBoolFieldUpdateOperationsInput> =
	makeSchema() as unknown as z.ZodType<Prisma.NullableBoolFieldUpdateOperationsInput>;
export const NullableBoolFieldUpdateOperationsInputObjectZodSchema =
	makeSchema();
