import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ExpenseUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './ExpenseUncheckedCreateNestedManyWithoutUserInput.schema';
import { RevenueUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './RevenueUncheckedCreateNestedManyWithoutUserInput.schema';
import { BalanceUncheckedCreateNestedOneWithoutUserInputObjectSchema } from './BalanceUncheckedCreateNestedOneWithoutUserInput.schema';
import { PasswordResetTokenUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
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
  expenses: z.lazy(() => ExpenseUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  revenues: z.lazy(() => RevenueUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  balance: z.lazy(() => BalanceUncheckedCreateNestedOneWithoutUserInputObjectSchema).optional(),
  passwordResetTokens: z.lazy(() => PasswordResetTokenUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserUncheckedCreateWithoutCategoriesInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCategoriesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateWithoutCategoriesInput>;
export const UserUncheckedCreateWithoutCategoriesInputObjectZodSchema = makeSchema();
