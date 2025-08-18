import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const PasswordResetTokenCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PasswordResetTokenCountOrderByAggregateInput, Prisma.PasswordResetTokenCountOrderByAggregateInput> = z.object({
  id: SortOrderSchema.optional(),
  token: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  used: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
export const PasswordResetTokenCountOrderByAggregateInputObjectZodSchema = z.object({
  id: SortOrderSchema.optional(),
  token: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  used: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
