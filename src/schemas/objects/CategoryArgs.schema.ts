import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { CategoryIncludeObjectSchema } from "./CategoryInclude.schema";
import { CategorySelectObjectSchema } from "./CategorySelect.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			select: z.lazy(() => CategorySelectObjectSchema).optional(),
			include: z.lazy(() => CategoryIncludeObjectSchema).optional(),
		})
		.strict();
export const CategoryArgsObjectSchema = makeSchema();
export const CategoryArgsObjectZodSchema = makeSchema();
