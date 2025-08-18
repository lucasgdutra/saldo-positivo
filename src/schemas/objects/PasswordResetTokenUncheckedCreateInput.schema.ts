import { z } from 'zod';
import type { Prisma } from '@prisma/client';


export const PasswordResetTokenUncheckedCreateInputObjectSchema: z.ZodType<Prisma.PasswordResetTokenUncheckedCreateInput, Prisma.PasswordResetTokenUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  token: z.string(),
  userId: z.string(),
  expiresAt: z.date(),
  used: z.boolean().optional(),
  createdAt: z.date().optional()
}).strict();
export const PasswordResetTokenUncheckedCreateInputObjectZodSchema = z.object({
  id: z.string().optional(),
  token: z.string(),
  userId: z.string(),
  expiresAt: z.date(),
  used: z.boolean().optional(),
  createdAt: z.date().optional()
}).strict();
