import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CategoryCreateNestedManyWithoutUserInputObjectSchema } from './CategoryCreateNestedManyWithoutUserInput.schema';
import { ExpenseCreateNestedManyWithoutUserInputObjectSchema } from './ExpenseCreateNestedManyWithoutUserInput.schema';
import { RevenueCreateNestedManyWithoutUserInputObjectSchema } from './RevenueCreateNestedManyWithoutUserInput.schema';
import { BalanceCreateNestedOneWithoutUserInputObjectSchema } from './BalanceCreateNestedOneWithoutUserInput.schema';
import { PasswordResetTokenCreateNestedManyWithoutUserInputObjectSchema } from './PasswordResetTokenCreateNestedManyWithoutUserInput.schema'

export const UserCreateInputObjectSchema: z.ZodType<Prisma.UserCreateInput, Prisma.UserCreateInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  password: z.string(),
  name: z.string(),
  salaryRange: z.string().nullish(),
  usageMotivation: z.string().nullish(),
  customMotivation: z.string().nullish(),
  financialGoals: z.string().nullish(),
  hasDebts: z.boolean().nullish(),
  familySize: z.number().int().nullish(),
  financialExperience: z.string().nullish(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  categories: z.lazy(() => CategoryCreateNestedManyWithoutUserInputObjectSchema).optional(),
  expenses: z.lazy(() => ExpenseCreateNestedManyWithoutUserInputObjectSchema).optional(),
  revenues: z.lazy(() => RevenueCreateNestedManyWithoutUserInputObjectSchema).optional(),
  balance: z.lazy(() => BalanceCreateNestedOneWithoutUserInputObjectSchema).optional(),
  passwordResetTokens: z.lazy(() => PasswordResetTokenCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserCreateInputObjectZodSchema = z.object({
  id: z.string().optional(),
  email: z.string(),
  password: z.string(),
  name: z.string(),
  salaryRange: z.string().nullish(),
  usageMotivation: z.string().nullish(),
  customMotivation: z.string().nullish(),
  financialGoals: z.string().nullish(),
  hasDebts: z.boolean().nullish(),
  familySize: z.number().int().nullish(),
  financialExperience: z.string().nullish(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  categories: z.lazy(() => CategoryCreateNestedManyWithoutUserInputObjectSchema).optional(),
  expenses: z.lazy(() => ExpenseCreateNestedManyWithoutUserInputObjectSchema).optional(),
  revenues: z.lazy(() => RevenueCreateNestedManyWithoutUserInputObjectSchema).optional(),
  balance: z.lazy(() => BalanceCreateNestedOneWithoutUserInputObjectSchema).optional(),
  passwordResetTokens: z.lazy(() => PasswordResetTokenCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
