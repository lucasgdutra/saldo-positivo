import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PasswordResetTokenWhereInputObjectSchema } from './PasswordResetTokenWhereInput.schema'

export const PasswordResetTokenListRelationFilterObjectSchema: z.ZodType<Prisma.PasswordResetTokenListRelationFilter, Prisma.PasswordResetTokenListRelationFilter> = z.object({
  every: z.lazy(() => PasswordResetTokenWhereInputObjectSchema).optional(),
  some: z.lazy(() => PasswordResetTokenWhereInputObjectSchema).optional(),
  none: z.lazy(() => PasswordResetTokenWhereInputObjectSchema).optional()
}).strict();
export const PasswordResetTokenListRelationFilterObjectZodSchema = z.object({
  every: z.lazy(() => PasswordResetTokenWhereInputObjectSchema).optional(),
  some: z.lazy(() => PasswordResetTokenWhereInputObjectSchema).optional(),
  none: z.lazy(() => PasswordResetTokenWhereInputObjectSchema).optional()
}).strict();
