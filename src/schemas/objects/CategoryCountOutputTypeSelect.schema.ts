import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const CategoryCountOutputTypeSelectObjectSchema: z.ZodType<
	Prisma.CategoryCountOutputTypeSelect,
	Prisma.CategoryCountOutputTypeSelect
> = z
	.object({
		expenses: z.boolean().optional(),
	})
	.strict();
export const CategoryCountOutputTypeSelectObjectZodSchema = z
	.object({
		expenses: z.boolean().optional(),
	})
	.strict();
