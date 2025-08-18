import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { ExpenseUncheckedUpdateManyWithoutCategoryNestedInputObjectSchema } from './ExpenseUncheckedUpdateManyWithoutCategoryNestedInput.schema'

export const CategoryUncheckedUpdateWithoutUserInputObjectSchema: z.ZodType<Prisma.CategoryUncheckedUpdateWithoutUserInput, Prisma.CategoryUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  expenses: z.lazy(() => ExpenseUncheckedUpdateManyWithoutCategoryNestedInputObjectSchema).optional()
}).strict();
export const CategoryUncheckedUpdateWithoutUserInputObjectZodSchema = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  expenses: z.lazy(() => ExpenseUncheckedUpdateManyWithoutCategoryNestedInputObjectSchema).optional()
}).strict();
