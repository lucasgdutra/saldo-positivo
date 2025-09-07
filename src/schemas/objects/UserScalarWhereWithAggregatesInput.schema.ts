import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { BoolNullableWithAggregatesFilterObjectSchema } from "./BoolNullableWithAggregatesFilter.schema";
import { DateTimeWithAggregatesFilterObjectSchema } from "./DateTimeWithAggregatesFilter.schema";
import { IntNullableWithAggregatesFilterObjectSchema } from "./IntNullableWithAggregatesFilter.schema";
import { StringNullableWithAggregatesFilterObjectSchema } from "./StringNullableWithAggregatesFilter.schema";
import { StringWithAggregatesFilterObjectSchema } from "./StringWithAggregatesFilter.schema";
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
			email: z
				.union([
					z.lazy(() => StringWithAggregatesFilterObjectSchema),
					z.string(),
				])
				.optional(),
			password: z
				.union([
					z.lazy(() => StringWithAggregatesFilterObjectSchema),
					z.string(),
				])
				.optional(),
			name: z
				.union([
					z.lazy(() => StringWithAggregatesFilterObjectSchema),
					z.string(),
				])
				.optional(),
			salaryRange: z
				.union([
					z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
					z.string(),
				])
				.nullish(),
			usageMotivation: z
				.union([
					z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
					z.string(),
				])
				.nullish(),
			customMotivation: z
				.union([
					z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
					z.string(),
				])
				.nullish(),
			financialGoals: z
				.union([
					z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
					z.string(),
				])
				.nullish(),
			hasDebts: z
				.union([
					z.lazy(() => BoolNullableWithAggregatesFilterObjectSchema),
					z.boolean(),
				])
				.nullish(),
			familySize: z
				.union([
					z.lazy(() => IntNullableWithAggregatesFilterObjectSchema),
					z.number().int(),
				])
				.nullish(),
			financialExperience: z
				.union([
					z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
					z.string(),
				])
				.nullish(),
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
		})
		.strict();
export const UserScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserScalarWhereWithAggregatesInput>;
export const UserScalarWhereWithAggregatesInputObjectZodSchema = makeSchema();
