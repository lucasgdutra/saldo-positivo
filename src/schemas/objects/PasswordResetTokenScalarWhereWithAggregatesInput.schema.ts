import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { BoolWithAggregatesFilterObjectSchema } from "./BoolWithAggregatesFilter.schema";
import { DateTimeWithAggregatesFilterObjectSchema } from "./DateTimeWithAggregatesFilter.schema";
import { StringWithAggregatesFilterObjectSchema } from "./StringWithAggregatesFilter.schema";
import { UuidWithAggregatesFilterObjectSchema } from "./UuidWithAggregatesFilter.schema";

export const PasswordResetTokenScalarWhereWithAggregatesInputObjectSchema: z.ZodType<
	Prisma.PasswordResetTokenScalarWhereWithAggregatesInput,
	Prisma.PasswordResetTokenScalarWhereWithAggregatesInput
> = z
	.object({
		AND: z
			.union([
				z.lazy(
					() => PasswordResetTokenScalarWhereWithAggregatesInputObjectSchema,
				),
				z
					.lazy(
						() => PasswordResetTokenScalarWhereWithAggregatesInputObjectSchema,
					)
					.array(),
			])
			.optional(),
		OR: z
			.lazy(() => PasswordResetTokenScalarWhereWithAggregatesInputObjectSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(
					() => PasswordResetTokenScalarWhereWithAggregatesInputObjectSchema,
				),
				z
					.lazy(
						() => PasswordResetTokenScalarWhereWithAggregatesInputObjectSchema,
					)
					.array(),
			])
			.optional(),
		token: z
			.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
			.optional(),
		userId: z
			.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()])
			.optional(),
		expiresAt: z
			.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.date()])
			.optional(),
		used: z
			.union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()])
			.optional(),
	})
	.strict();
export const PasswordResetTokenScalarWhereWithAggregatesInputObjectZodSchema = z
	.object({
		AND: z
			.union([
				z.lazy(
					() => PasswordResetTokenScalarWhereWithAggregatesInputObjectSchema,
				),
				z
					.lazy(
						() => PasswordResetTokenScalarWhereWithAggregatesInputObjectSchema,
					)
					.array(),
			])
			.optional(),
		OR: z
			.lazy(() => PasswordResetTokenScalarWhereWithAggregatesInputObjectSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(
					() => PasswordResetTokenScalarWhereWithAggregatesInputObjectSchema,
				),
				z
					.lazy(
						() => PasswordResetTokenScalarWhereWithAggregatesInputObjectSchema,
					)
					.array(),
			])
			.optional(),
		token: z
			.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
			.optional(),
		userId: z
			.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()])
			.optional(),
		expiresAt: z
			.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.date()])
			.optional(),
		used: z
			.union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()])
			.optional(),
	})
	.strict();
