import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { DateTimeWithAggregatesFilterObjectSchema } from "./DateTimeWithAggregatesFilter.schema";
import { DecimalWithAggregatesFilterObjectSchema } from "./DecimalWithAggregatesFilter.schema";
import { UuidWithAggregatesFilterObjectSchema } from "./UuidWithAggregatesFilter.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
			OR: z.lazy(makeSchema).array().optional(),
			NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
			id: z
				.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()])
				.optional(),
			totalAmount: z
				.union([
					z.lazy(() => DecimalWithAggregatesFilterObjectSchema),
					z.number(),
				])
				.optional(),
			totalRevenues: z
				.union([
					z.lazy(() => DecimalWithAggregatesFilterObjectSchema),
					z.number(),
				])
				.optional(),
			totalExpenses: z
				.union([
					z.lazy(() => DecimalWithAggregatesFilterObjectSchema),
					z.number(),
				])
				.optional(),
			referenceMonth: z
				.union([
					z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
					z.date(),
				])
				.optional(),
			createdAt: z
				.union([
					z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
					z.date(),
				])
				.optional(),
			updatedAt: z
				.union([
					z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
					z.date(),
				])
				.optional(),
			userId: z
				.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()])
				.optional(),
		})
		.strict();
export const BalanceScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.BalanceScalarWhereWithAggregatesInput> =
	makeSchema() as unknown as z.ZodType<Prisma.BalanceScalarWhereWithAggregatesInput>;
export const BalanceScalarWhereWithAggregatesInputObjectZodSchema =
	makeSchema();
