import type { Prisma } from "@prisma/client";
import { z } from "zod";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			id: z.string(),
		})
		.strict();
export const CategoryWhereUniqueInputObjectSchema: z.ZodType<Prisma.CategoryWhereUniqueInput> =
	makeSchema() as unknown as z.ZodType<Prisma.CategoryWhereUniqueInput>;
export const CategoryWhereUniqueInputObjectZodSchema = makeSchema();
