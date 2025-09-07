import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const NestedBoolNullableFilterObjectSchema: z.ZodType<
	Prisma.NestedBoolNullableFilter,
	Prisma.NestedBoolNullableFilter
> = z
	.object({
		equals: z.boolean().nullish(),
		not: z
			.union([z.boolean(), z.lazy(() => NestedBoolNullableFilterObjectSchema)])
			.nullish(),
	})
	.strict();
export const NestedBoolNullableFilterObjectZodSchema = z
	.object({
		equals: z.boolean().nullish(),
		not: z
			.union([z.boolean(), z.lazy(() => NestedBoolNullableFilterObjectSchema)])
			.nullish(),
	})
	.strict();
