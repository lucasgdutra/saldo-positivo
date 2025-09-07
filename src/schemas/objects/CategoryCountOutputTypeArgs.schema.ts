import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { CategoryCountOutputTypeSelectObjectSchema } from "./CategoryCountOutputTypeSelect.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			select: z
				.lazy(() => CategoryCountOutputTypeSelectObjectSchema)
				.optional(),
		})
		.strict();
export const CategoryCountOutputTypeArgsObjectSchema = makeSchema();
export const CategoryCountOutputTypeArgsObjectZodSchema = makeSchema();
