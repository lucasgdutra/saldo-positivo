import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CategoryUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './CategoryUncheckedCreateNestedManyWithoutUserInput.schema';
import { ExpenseUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './ExpenseUncheckedCreateNestedManyWithoutUserInput.schema';
import { BalanceUncheckedCreateNestedOneWithoutUserInputObjectSchema } from './BalanceUncheckedCreateNestedOneWithoutUserInput.schema';
import { PasswordResetTokenUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput.schema'

export const UserUncheckedCreateWithoutRevenuesInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutRevenuesInput, Prisma.UserUncheckedCreateWithoutRevenuesInput> = z.object({
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
  categories: z.lazy(() => CategoryUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  expenses: z.lazy(() => ExpenseUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  balance: z.lazy(() => BalanceUncheckedCreateNestedOneWithoutUserInputObjectSchema).optional(),
  passwordResetTokens: z.lazy(() => PasswordResetTokenUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserUncheckedCreateWithoutRevenuesInputObjectZodSchema = z.object({
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
  categories: z.lazy(() => CategoryUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  expenses: z.lazy(() => ExpenseUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  balance: z.lazy(() => BalanceUncheckedCreateNestedOneWithoutUserInputObjectSchema).optional(),
  passwordResetTokens: z.lazy(() => PasswordResetTokenUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
