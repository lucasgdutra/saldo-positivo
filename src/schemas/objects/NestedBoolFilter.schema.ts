import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const NestedBoolFilterObjectSchema: z.ZodType<
	Prisma.NestedBoolFilter,
	Prisma.NestedBoolFilter
> = z
	.object({
		equals: z.boolean().optional(),
		not: z
			.union([z.boolean(), z.lazy(() => NestedBoolFilterObjectSchema)])
			.optional(),
	})
	.strict();
export const NestedBoolFilterObjectZodSchema = z
	.object({
		equals: z.boolean().optional(),
		not: z
			.union([z.boolean(), z.lazy(() => NestedBoolFilterObjectSchema)])
			.optional(),
	})
	.strict();
