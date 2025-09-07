import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { CategoryCreateManyUserInputObjectSchema } from "./CategoryCreateManyUserInput.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			data: z.union([
				z.lazy(() => CategoryCreateManyUserInputObjectSchema),
				z.lazy(() => CategoryCreateManyUserInputObjectSchema).array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();
export const CategoryCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.CategoryCreateManyUserInputEnvelope> =
	makeSchema() as unknown as z.ZodType<Prisma.CategoryCreateManyUserInputEnvelope>;
export const CategoryCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
