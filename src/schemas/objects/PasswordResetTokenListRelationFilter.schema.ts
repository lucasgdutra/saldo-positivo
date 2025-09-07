import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PasswordResetTokenWhereInputObjectSchema } from './PasswordResetTokenWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  every: z.lazy(() => PasswordResetTokenWhereInputObjectSchema).optional(),
  some: z.lazy(() => PasswordResetTokenWhereInputObjectSchema).optional(),
  none: z.lazy(() => PasswordResetTokenWhereInputObjectSchema).optional()
}).strict();
export const PasswordResetTokenListRelationFilterObjectSchema: z.ZodType<Prisma.PasswordResetTokenListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.PasswordResetTokenListRelationFilter>;
export const PasswordResetTokenListRelationFilterObjectZodSchema = makeSchema();
