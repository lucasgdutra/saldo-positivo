import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PasswordResetTokenSelectObjectSchema } from './PasswordResetTokenSelect.schema';
import { PasswordResetTokenIncludeObjectSchema } from './PasswordResetTokenInclude.schema'

export const PasswordResetTokenArgsObjectSchema = z.object({
  select: z.lazy(() => PasswordResetTokenSelectObjectSchema).optional(),
  include: z.lazy(() => PasswordResetTokenIncludeObjectSchema).optional()
}).strict();
export const PasswordResetTokenArgsObjectZodSchema = z.object({
  select: z.lazy(() => PasswordResetTokenSelectObjectSchema).optional(),
  include: z.lazy(() => PasswordResetTokenIncludeObjectSchema).optional()
}).strict();
