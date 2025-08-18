import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableBoolFieldUpdateOperationsInputObjectSchema } from './NullableBoolFieldUpdateOperationsInput.schema';
import { NullableIntFieldUpdateOperationsInputObjectSchema } from './NullableIntFieldUpdateOperationsInput.schema';
import { CategoryUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './CategoryUncheckedUpdateManyWithoutUserNestedInput.schema';
import { ExpenseUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './ExpenseUncheckedUpdateManyWithoutUserNestedInput.schema';
import { RevenueUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './RevenueUncheckedUpdateManyWithoutUserNestedInput.schema';
import { BalanceUncheckedUpdateOneWithoutUserNestedInputObjectSchema } from './BalanceUncheckedUpdateOneWithoutUserNestedInput.schema';
import { PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput.schema'

export const UserUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.UserUncheckedUpdateInput, Prisma.UserUncheckedUpdateInput> = z.object({
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
  categories: z.lazy(() => CategoryUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  expenses: z.lazy(() => ExpenseUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  revenues: z.lazy(() => RevenueUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  balance: z.lazy(() => BalanceUncheckedUpdateOneWithoutUserNestedInputObjectSchema).optional(),
  passwordResetTokens: z.lazy(() => PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional()
}).strict();
export const UserUncheckedUpdateInputObjectZodSchema = z.object({
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
  categories: z.lazy(() => CategoryUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  expenses: z.lazy(() => ExpenseUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  revenues: z.lazy(() => RevenueUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  balance: z.lazy(() => BalanceUncheckedUpdateOneWithoutUserNestedInputObjectSchema).optional(),
  passwordResetTokens: z.lazy(() => PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional()
}).strict();
