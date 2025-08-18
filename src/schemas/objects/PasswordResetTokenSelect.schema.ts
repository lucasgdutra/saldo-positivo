import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema } from './UserArgs.schema'

export const PasswordResetTokenSelectObjectSchema: z.ZodType<Prisma.PasswordResetTokenSelect, Prisma.PasswordResetTokenSelect> = z.object({
  id: z.boolean().optional(),
  token: z.boolean().optional(),
  userId: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  used: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional()
}).strict();
export const PasswordResetTokenSelectObjectZodSchema = z.object({
  id: z.boolean().optional(),
  token: z.boolean().optional(),
  userId: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  used: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional()
}).strict();
