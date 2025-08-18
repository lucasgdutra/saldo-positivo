import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const PasswordResetTokenMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PasswordResetTokenMinOrderByAggregateInput, Prisma.PasswordResetTokenMinOrderByAggregateInput> = z.object({
  id: SortOrderSchema.optional(),
  token: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  used: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
export const PasswordResetTokenMinOrderByAggregateInputObjectZodSchema = z.object({
  id: SortOrderSchema.optional(),
  token: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  used: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
