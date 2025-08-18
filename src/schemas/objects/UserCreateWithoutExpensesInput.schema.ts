import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CategoryCreateNestedManyWithoutUserInputObjectSchema } from './CategoryCreateNestedManyWithoutUserInput.schema';
import { RevenueCreateNestedManyWithoutUserInputObjectSchema } from './RevenueCreateNestedManyWithoutUserInput.schema';
import { BalanceCreateNestedOneWithoutUserInputObjectSchema } from './BalanceCreateNestedOneWithoutUserInput.schema';
import { PasswordResetTokenCreateNestedManyWithoutUserInputObjectSchema } from './PasswordResetTokenCreateNestedManyWithoutUserInput.schema'

export const UserCreateWithoutExpensesInputObjectSchema: z.ZodType<Prisma.UserCreateWithoutExpensesInput, Prisma.UserCreateWithoutExpensesInput> = z.object({
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
  revenues: z.lazy(() => RevenueCreateNestedManyWithoutUserInputObjectSchema).optional(),
  balance: z.lazy(() => BalanceCreateNestedOneWithoutUserInputObjectSchema).optional(),
  passwordResetTokens: z.lazy(() => PasswordResetTokenCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserCreateWithoutExpensesInputObjectZodSchema = z.object({
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
  revenues: z.lazy(() => RevenueCreateNestedManyWithoutUserInputObjectSchema).optional(),
  balance: z.lazy(() => BalanceCreateNestedOneWithoutUserInputObjectSchema).optional(),
  passwordResetTokens: z.lazy(() => PasswordResetTokenCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
