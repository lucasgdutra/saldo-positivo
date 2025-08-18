import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { ExpenseUncheckedUpdateManyWithoutCategoryNestedInputObjectSchema } from './ExpenseUncheckedUpdateManyWithoutCategoryNestedInput.schema'

export const CategoryUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.CategoryUncheckedUpdateInput, Prisma.CategoryUncheckedUpdateInput> = z.object({
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  expenses: z.lazy(() => ExpenseUncheckedUpdateManyWithoutCategoryNestedInputObjectSchema).optional()
}).strict();
export const CategoryUncheckedUpdateInputObjectZodSchema = z.object({
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  expenses: z.lazy(() => ExpenseUncheckedUpdateManyWithoutCategoryNestedInputObjectSchema).optional()
}).strict();
