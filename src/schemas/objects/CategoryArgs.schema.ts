import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { CategoryIncludeObjectSchema } from "./CategoryInclude.schema";
import { CategorySelectObjectSchema } from "./CategorySelect.schema";

export const CategoryArgsObjectSchema = z
	.object({
		select: z.lazy(() => CategorySelectObjectSchema).optional(),
		include: z.lazy(() => CategoryIncludeObjectSchema).optional(),
	})
	.strict();
export const CategoryArgsObjectZodSchema = z
	.object({
		select: z.lazy(() => CategorySelectObjectSchema).optional(),
		include: z.lazy(() => CategoryIncludeObjectSchema).optional(),
	})
	.strict();
