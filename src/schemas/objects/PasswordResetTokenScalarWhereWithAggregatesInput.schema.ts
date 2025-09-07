import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { BoolWithAggregatesFilterObjectSchema } from "./BoolWithAggregatesFilter.schema";
import { DateTimeWithAggregatesFilterObjectSchema } from "./DateTimeWithAggregatesFilter.schema";
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
			token: z
				.union([
					z.lazy(() => StringWithAggregatesFilterObjectSchema),
					z.string(),
				])
				.optional(),
			userId: z
				.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()])
				.optional(),
			expiresAt: z
				.union([
					z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
					z.date(),
				])
				.optional(),
			used: z
				.union([
					z.lazy(() => BoolWithAggregatesFilterObjectSchema),
					z.boolean(),
				])
				.optional(),
			createdAt: z
				.union([
					z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
					z.date(),
				])
				.optional(),
		})
		.strict();
export const PasswordResetTokenScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.PasswordResetTokenScalarWhereWithAggregatesInput> =
	makeSchema() as unknown as z.ZodType<Prisma.PasswordResetTokenScalarWhereWithAggregatesInput>;
export const PasswordResetTokenScalarWhereWithAggregatesInputObjectZodSchema =
	makeSchema();
