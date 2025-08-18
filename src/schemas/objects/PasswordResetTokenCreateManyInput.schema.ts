import { z } from 'zod';
import type { Prisma } from '@prisma/client';


export const PasswordResetTokenCreateManyInputObjectSchema: z.ZodType<Prisma.PasswordResetTokenCreateManyInput, Prisma.PasswordResetTokenCreateManyInput> = z.object({
  id: z.string().optional(),
  token: z.string(),
  userId: z.string(),
  expiresAt: z.date(),
  used: z.boolean().optional(),
  createdAt: z.date().optional()
}).strict();
export const PasswordResetTokenCreateManyInputObjectZodSchema = z.object({
  id: z.string().optional(),
  token: z.string(),
  userId: z.string(),
  expiresAt: z.date(),
  used: z.boolean().optional(),
  createdAt: z.date().optional()
}).strict();
