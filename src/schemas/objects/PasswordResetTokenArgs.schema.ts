import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PasswordResetTokenSelectObjectSchema } from './PasswordResetTokenSelect.schema';
import { PasswordResetTokenIncludeObjectSchema } from './PasswordResetTokenInclude.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  select: z.lazy(() => PasswordResetTokenSelectObjectSchema).optional(),
  include: z.lazy(() => PasswordResetTokenIncludeObjectSchema).optional()
}).strict();
export const PasswordResetTokenArgsObjectSchema = makeSchema();
export const PasswordResetTokenArgsObjectZodSchema = makeSchema();
