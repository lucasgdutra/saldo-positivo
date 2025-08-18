import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema'

export const PasswordResetTokenOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.PasswordResetTokenOrderByWithRelationInput, Prisma.PasswordResetTokenOrderByWithRelationInput> = z.object({
  id: SortOrderSchema.optional(),
  token: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  used: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const PasswordResetTokenOrderByWithRelationInputObjectZodSchema = z.object({
  id: SortOrderSchema.optional(),
  token: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  used: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional()
}).strict();
