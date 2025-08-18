import { z } from 'zod';
import type { Prisma } from '@prisma/client';


export const PasswordResetTokenMinAggregateInputObjectSchema: z.ZodType<Prisma.PasswordResetTokenMinAggregateInputType, Prisma.PasswordResetTokenMinAggregateInputType> = z.object({
  id: z.literal(true).optional(),
  token: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  expiresAt: z.literal(true).optional(),
  used: z.literal(true).optional(),
  createdAt: z.literal(true).optional()
}).strict();
export const PasswordResetTokenMinAggregateInputObjectZodSchema = z.object({
  id: z.literal(true).optional(),
  token: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  expiresAt: z.literal(true).optional(),
  used: z.literal(true).optional(),
  createdAt: z.literal(true).optional()
}).strict();
