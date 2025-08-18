import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { ExpenseUpdateManyWithoutCategoryNestedInputObjectSchema } from './ExpenseUpdateManyWithoutCategoryNestedInput.schema'

export const CategoryUpdateWithoutUserInputObjectSchema: z.ZodType<Prisma.CategoryUpdateWithoutUserInput, Prisma.CategoryUpdateWithoutUserInput> = z.object({
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  expenses: z.lazy(() => ExpenseUpdateManyWithoutCategoryNestedInputObjectSchema).optional()
}).strict();
export const CategoryUpdateWithoutUserInputObjectZodSchema = z.object({
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  expenses: z.lazy(() => ExpenseUpdateManyWithoutCategoryNestedInputObjectSchema).optional()
}).strict();
