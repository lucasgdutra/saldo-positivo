import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableBoolFieldUpdateOperationsInputObjectSchema } from './NullableBoolFieldUpdateOperationsInput.schema';
import { NullableIntFieldUpdateOperationsInputObjectSchema } from './NullableIntFieldUpdateOperationsInput.schema';
import { CategoryUpdateManyWithoutUserNestedInputObjectSchema } from './CategoryUpdateManyWithoutUserNestedInput.schema';
import { ExpenseUpdateManyWithoutUserNestedInputObjectSchema } from './ExpenseUpdateManyWithoutUserNestedInput.schema';
import { BalanceUpdateOneWithoutUserNestedInputObjectSchema } from './BalanceUpdateOneWithoutUserNestedInput.schema';
import { PasswordResetTokenUpdateManyWithoutUserNestedInputObjectSchema } from './PasswordResetTokenUpdateManyWithoutUserNestedInput.schema'

export const UserUpdateWithoutRevenuesInputObjectSchema: z.ZodType<Prisma.UserUpdateWithoutRevenuesInput, Prisma.UserUpdateWithoutRevenuesInput> = z.object({
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  password: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  salaryRange: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  usageMotivation: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  customMotivation: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  financialGoals: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  hasDebts: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputObjectSchema)]).nullish(),
  monthlyIncome: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  familySize: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).nullish(),
  financialExperience: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  categories: z.lazy(() => CategoryUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  expenses: z.lazy(() => ExpenseUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  balance: z.lazy(() => BalanceUpdateOneWithoutUserNestedInputObjectSchema).optional(),
  passwordResetTokens: z.lazy(() => PasswordResetTokenUpdateManyWithoutUserNestedInputObjectSchema).optional()
}).strict();
export const UserUpdateWithoutRevenuesInputObjectZodSchema = z.object({
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  password: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  salaryRange: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  usageMotivation: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  customMotivation: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  financialGoals: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  hasDebts: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputObjectSchema)]).nullish(),
  monthlyIncome: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  familySize: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).nullish(),
  financialExperience: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  categories: z.lazy(() => CategoryUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  expenses: z.lazy(() => ExpenseUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  balance: z.lazy(() => BalanceUpdateOneWithoutUserNestedInputObjectSchema).optional(),
  passwordResetTokens: z.lazy(() => PasswordResetTokenUpdateManyWithoutUserNestedInputObjectSchema).optional()
}).strict();
