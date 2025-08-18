import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableBoolFieldUpdateOperationsInputObjectSchema } from './NullableBoolFieldUpdateOperationsInput.schema';
import { NullableIntFieldUpdateOperationsInputObjectSchema } from './NullableIntFieldUpdateOperationsInput.schema';
import { CategoryUpdateManyWithoutUserNestedInputObjectSchema } from './CategoryUpdateManyWithoutUserNestedInput.schema';
import { ExpenseUpdateManyWithoutUserNestedInputObjectSchema } from './ExpenseUpdateManyWithoutUserNestedInput.schema';
import { RevenueUpdateManyWithoutUserNestedInputObjectSchema } from './RevenueUpdateManyWithoutUserNestedInput.schema';
import { BalanceUpdateOneWithoutUserNestedInputObjectSchema } from './BalanceUpdateOneWithoutUserNestedInput.schema';
import { PasswordResetTokenUpdateManyWithoutUserNestedInputObjectSchema } from './PasswordResetTokenUpdateManyWithoutUserNestedInput.schema'

export const UserUpdateInputObjectSchema: z.ZodType<Prisma.UserUpdateInput, Prisma.UserUpdateInput> = z.object({
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  password: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  salaryRange: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  usageMotivation: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  customMotivation: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  financialGoals: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  hasDebts: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputObjectSchema)]).nullish(),
  familySize: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).nullish(),
  financialExperience: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  categories: z.lazy(() => CategoryUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  expenses: z.lazy(() => ExpenseUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  revenues: z.lazy(() => RevenueUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  balance: z.lazy(() => BalanceUpdateOneWithoutUserNestedInputObjectSchema).optional(),
  passwordResetTokens: z.lazy(() => PasswordResetTokenUpdateManyWithoutUserNestedInputObjectSchema).optional()
}).strict();
export const UserUpdateInputObjectZodSchema = z.object({
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  password: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  salaryRange: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  usageMotivation: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  customMotivation: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  financialGoals: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  hasDebts: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputObjectSchema)]).nullish(),
  familySize: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).nullish(),
  financialExperience: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  categories: z.lazy(() => CategoryUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  expenses: z.lazy(() => ExpenseUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  revenues: z.lazy(() => RevenueUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  balance: z.lazy(() => BalanceUpdateOneWithoutUserNestedInputObjectSchema).optional(),
  passwordResetTokens: z.lazy(() => PasswordResetTokenUpdateManyWithoutUserNestedInputObjectSchema).optional()
}).strict();
