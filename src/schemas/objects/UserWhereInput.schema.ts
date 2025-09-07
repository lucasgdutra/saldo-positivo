import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { BalanceNullableScalarRelationFilterObjectSchema } from "./BalanceNullableScalarRelationFilter.schema";
import { BalanceWhereInputObjectSchema } from "./BalanceWhereInput.schema";
import { BoolNullableFilterObjectSchema } from "./BoolNullableFilter.schema";
import { CategoryListRelationFilterObjectSchema } from "./CategoryListRelationFilter.schema";
import { DateTimeFilterObjectSchema } from "./DateTimeFilter.schema";
import { ExpenseListRelationFilterObjectSchema } from "./ExpenseListRelationFilter.schema";
import { IntNullableFilterObjectSchema } from "./IntNullableFilter.schema";
import { PasswordResetTokenListRelationFilterObjectSchema } from "./PasswordResetTokenListRelationFilter.schema";
import { RevenueListRelationFilterObjectSchema } from "./RevenueListRelationFilter.schema";
import { StringFilterObjectSchema } from "./StringFilter.schema";
import { StringNullableFilterObjectSchema } from "./StringNullableFilter.schema";
import { UuidFilterObjectSchema } from "./UuidFilter.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
			OR: z.lazy(makeSchema).array().optional(),
			NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
			id: z
				.union([z.lazy(() => UuidFilterObjectSchema), z.string()])
				.optional(),
			email: z
				.union([z.lazy(() => StringFilterObjectSchema), z.string()])
				.optional(),
			password: z
				.union([z.lazy(() => StringFilterObjectSchema), z.string()])
				.optional(),
			name: z
				.union([z.lazy(() => StringFilterObjectSchema), z.string()])
				.optional(),
			salaryRange: z
				.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
				.nullish(),
			usageMotivation: z
				.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
				.nullish(),
			customMotivation: z
				.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
				.nullish(),
			financialGoals: z
				.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
				.nullish(),
			hasDebts: z
				.union([z.lazy(() => BoolNullableFilterObjectSchema), z.boolean()])
				.nullish(),
			familySize: z
				.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()])
				.nullish(),
			financialExperience: z
				.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
				.nullish(),
			createdAt: z
				.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()])
				.optional(),
			updatedAt: z
				.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()])
				.optional(),
			categories: z
				.lazy(() => CategoryListRelationFilterObjectSchema)
				.optional(),
			expenses: z.lazy(() => ExpenseListRelationFilterObjectSchema).optional(),
			revenues: z.lazy(() => RevenueListRelationFilterObjectSchema).optional(),
			balance: z
				.union([
					z.lazy(() => BalanceNullableScalarRelationFilterObjectSchema),
					z.lazy(() => BalanceWhereInputObjectSchema),
				])
				.nullish(),
			passwordResetTokens: z
				.lazy(() => PasswordResetTokenListRelationFilterObjectSchema)
				.optional(),
		})
		.strict();
export const UserWhereInputObjectSchema: z.ZodType<Prisma.UserWhereInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserWhereInput>;
export const UserWhereInputObjectZodSchema = makeSchema();
