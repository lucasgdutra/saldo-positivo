import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema } from './UserArgs.schema'

export const PasswordResetTokenIncludeObjectSchema: z.ZodType<Prisma.PasswordResetTokenInclude, Prisma.PasswordResetTokenInclude> = z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional()
}).strict();
export const PasswordResetTokenIncludeObjectZodSchema = z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional()
}).strict();
