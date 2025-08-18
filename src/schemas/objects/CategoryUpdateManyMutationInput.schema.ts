import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'

export const CategoryUpdateManyMutationInputObjectSchema: z.ZodType<Prisma.CategoryUpdateManyMutationInput, Prisma.CategoryUpdateManyMutationInput> = z.object({
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const CategoryUpdateManyMutationInputObjectZodSchema = z.object({
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
