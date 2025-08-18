import { z } from 'zod';
import type { Prisma } from '@prisma/client';


export const PasswordResetTokenUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.PasswordResetTokenUncheckedCreateWithoutUserInput, Prisma.PasswordResetTokenUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  token: z.string(),
  expiresAt: z.date(),
  used: z.boolean().optional(),
  createdAt: z.date().optional()
}).strict();
export const PasswordResetTokenUncheckedCreateWithoutUserInputObjectZodSchema = z.object({
  id: z.string().optional(),
  token: z.string(),
  expiresAt: z.date(),
  used: z.boolean().optional(),
  createdAt: z.date().optional()
}).strict();
