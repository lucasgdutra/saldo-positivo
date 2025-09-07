import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { ExpenseCreateManyCategoryInputObjectSchema } from "./ExpenseCreateManyCategoryInput.schema";

export const ExpenseCreateManyCategoryInputEnvelopeObjectSchema: z.ZodType<
	Prisma.ExpenseCreateManyCategoryInputEnvelope,
	Prisma.ExpenseCreateManyCategoryInputEnvelope
> = z
	.object({
		data: z.union([
			z.lazy(() => ExpenseCreateManyCategoryInputObjectSchema),
			z.lazy(() => ExpenseCreateManyCategoryInputObjectSchema).array(),
		]),
		skipDuplicates: z.boolean().optional(),
	})
	.strict();
export const ExpenseCreateManyCategoryInputEnvelopeObjectZodSchema = z
	.object({
		data: z.union([
			z.lazy(() => ExpenseCreateManyCategoryInputObjectSchema),
			z.lazy(() => ExpenseCreateManyCategoryInputObjectSchema).array(),
		]),
		skipDuplicates: z.boolean().optional(),
	})
	.strict();
