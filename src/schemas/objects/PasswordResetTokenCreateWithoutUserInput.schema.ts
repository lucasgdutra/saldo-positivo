import { z } from 'zod';
import type { Prisma } from '@prisma/client';


export const PasswordResetTokenCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.PasswordResetTokenCreateWithoutUserInput, Prisma.PasswordResetTokenCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  token: z.string(),
  expiresAt: z.date(),
  used: z.boolean().optional(),
  createdAt: z.date().optional()
}).strict();
export const PasswordResetTokenCreateWithoutUserInputObjectZodSchema = z.object({
  id: z.string().optional(),
  token: z.string(),
  expiresAt: z.date(),
  used: z.boolean().optional(),
  createdAt: z.date().optional()
}).strict();
