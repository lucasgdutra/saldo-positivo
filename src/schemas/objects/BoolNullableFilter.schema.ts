import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { NestedBoolNullableFilterObjectSchema } from "./NestedBoolNullableFilter.schema";

export const BoolNullableFilterObjectSchema: z.ZodType<
	Prisma.BoolNullableFilter,
	Prisma.BoolNullableFilter
> = z
	.object({
		equals: z.boolean().nullish(),
		not: z
			.union([z.boolean(), z.lazy(() => NestedBoolNullableFilterObjectSchema)])
			.nullish(),
	})
	.strict();
export const BoolNullableFilterObjectZodSchema = z
	.object({
		equals: z.boolean().nullish(),
		not: z
			.union([z.boolean(), z.lazy(() => NestedBoolNullableFilterObjectSchema)])
			.nullish(),
	})
	.strict();
