import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  token: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  used: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
export const PasswordResetTokenMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PasswordResetTokenMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PasswordResetTokenMinOrderByAggregateInput>;
export const PasswordResetTokenMinOrderByAggregateInputObjectZodSchema = makeSchema();
