import { z } from 'zod';
import type { Prisma } from '@prisma/client';


export const PasswordResetTokenCreateManyUserInputObjectSchema: z.ZodType<Prisma.PasswordResetTokenCreateManyUserInput, Prisma.PasswordResetTokenCreateManyUserInput> = z.object({
  id: z.string().optional(),
  token: z.string(),
  expiresAt: z.date(),
  used: z.boolean().optional(),
  createdAt: z.date().optional()
}).strict();
export const PasswordResetTokenCreateManyUserInputObjectZodSchema = z.object({
  id: z.string().optional(),
  token: z.string(),
  expiresAt: z.date(),
  used: z.boolean().optional(),
  createdAt: z.date().optional()
}).strict();
