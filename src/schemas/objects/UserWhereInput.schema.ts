import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { BoolNullableFilterObjectSchema } from './BoolNullableFilter.schema';
import { IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { CategoryListRelationFilterObjectSchema } from './CategoryListRelationFilter.schema';
import { ExpenseListRelationFilterObjectSchema } from './ExpenseListRelationFilter.schema';
import { RevenueListRelationFilterObjectSchema } from './RevenueListRelationFilter.schema';
import { BalanceNullableScalarRelationFilterObjectSchema } from './BalanceNullableScalarRelationFilter.schema';
import { BalanceWhereInputObjectSchema } from './BalanceWhereInput.schema';
import { PasswordResetTokenListRelationFilterObjectSchema } from './PasswordResetTokenListRelationFilter.schema'

export const UserWhereInputObjectSchema: z.ZodType<Prisma.UserWhereInput, Prisma.UserWhereInput> = z.object({
  AND: z.union([z.lazy(() => UserWhereInputObjectSchema), z.lazy(() => UserWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => UserWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => UserWhereInputObjectSchema), z.lazy(() => UserWhereInputObjectSchema).array()]).optional(),
  email: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  password: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  salaryRange: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  usageMotivation: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  customMotivation: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  financialGoals: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  hasDebts: z.union([z.lazy(() => BoolNullableFilterObjectSchema), z.boolean()]).nullish(),
  monthlyIncome: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  familySize: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).nullish(),
  financialExperience: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  categories: z.lazy(() => CategoryListRelationFilterObjectSchema).optional(),
  expenses: z.lazy(() => ExpenseListRelationFilterObjectSchema).optional(),
  revenues: z.lazy(() => RevenueListRelationFilterObjectSchema).optional(),
  balance: z.union([z.lazy(() => BalanceNullableScalarRelationFilterObjectSchema), z.lazy(() => BalanceWhereInputObjectSchema)]).nullish(),
  passwordResetTokens: z.lazy(() => PasswordResetTokenListRelationFilterObjectSchema).optional()
}).strict();
export const UserWhereInputObjectZodSchema = z.object({
  AND: z.union([z.lazy(() => UserWhereInputObjectSchema), z.lazy(() => UserWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => UserWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => UserWhereInputObjectSchema), z.lazy(() => UserWhereInputObjectSchema).array()]).optional(),
  email: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  password: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  salaryRange: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  usageMotivation: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  customMotivation: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  financialGoals: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  hasDebts: z.union([z.lazy(() => BoolNullableFilterObjectSchema), z.boolean()]).nullish(),
  monthlyIncome: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  familySize: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).nullish(),
  financialExperience: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  categories: z.lazy(() => CategoryListRelationFilterObjectSchema).optional(),
  expenses: z.lazy(() => ExpenseListRelationFilterObjectSchema).optional(),
  revenues: z.lazy(() => RevenueListRelationFilterObjectSchema).optional(),
  balance: z.union([z.lazy(() => BalanceNullableScalarRelationFilterObjectSchema), z.lazy(() => BalanceWhereInputObjectSchema)]).nullish(),
  passwordResetTokens: z.lazy(() => PasswordResetTokenListRelationFilterObjectSchema).optional()
}).strict();
