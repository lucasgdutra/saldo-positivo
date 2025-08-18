import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { UuidFilterObjectSchema } from './UuidFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { BoolFilterObjectSchema } from './BoolFilter.schema';
import { UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema'

export const PasswordResetTokenWhereInputObjectSchema: z.ZodType<Prisma.PasswordResetTokenWhereInput, Prisma.PasswordResetTokenWhereInput> = z.object({
  AND: z.union([z.lazy(() => PasswordResetTokenWhereInputObjectSchema), z.lazy(() => PasswordResetTokenWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => PasswordResetTokenWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => PasswordResetTokenWhereInputObjectSchema), z.lazy(() => PasswordResetTokenWhereInputObjectSchema).array()]).optional(),
  token: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  expiresAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
  used: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional()
}).strict();
export const PasswordResetTokenWhereInputObjectZodSchema = z.object({
  AND: z.union([z.lazy(() => PasswordResetTokenWhereInputObjectSchema), z.lazy(() => PasswordResetTokenWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => PasswordResetTokenWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => PasswordResetTokenWhereInputObjectSchema), z.lazy(() => PasswordResetTokenWhereInputObjectSchema).array()]).optional(),
  token: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  expiresAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
  used: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional()
}).strict();
