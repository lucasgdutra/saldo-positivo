import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { PasswordResetTokenCountOrderByAggregateInputObjectSchema } from './PasswordResetTokenCountOrderByAggregateInput.schema';
import { PasswordResetTokenMaxOrderByAggregateInputObjectSchema } from './PasswordResetTokenMaxOrderByAggregateInput.schema';
import { PasswordResetTokenMinOrderByAggregateInputObjectSchema } from './PasswordResetTokenMinOrderByAggregateInput.schema'

export const PasswordResetTokenOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.PasswordResetTokenOrderByWithAggregationInput, Prisma.PasswordResetTokenOrderByWithAggregationInput> = z.object({
  id: SortOrderSchema.optional(),
  token: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  used: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  _count: z.lazy(() => PasswordResetTokenCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => PasswordResetTokenMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => PasswordResetTokenMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const PasswordResetTokenOrderByWithAggregationInputObjectZodSchema = z.object({
  id: SortOrderSchema.optional(),
  token: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  used: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  _count: z.lazy(() => PasswordResetTokenCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => PasswordResetTokenMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => PasswordResetTokenMinOrderByAggregateInputObjectSchema).optional()
}).strict();
