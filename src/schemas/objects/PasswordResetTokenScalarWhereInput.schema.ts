import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidFilterObjectSchema } from './UuidFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { BoolFilterObjectSchema } from './BoolFilter.schema'

export const PasswordResetTokenScalarWhereInputObjectSchema: z.ZodType<Prisma.PasswordResetTokenScalarWhereInput, Prisma.PasswordResetTokenScalarWhereInput> = z.object({
  AND: z.union([z.lazy(() => PasswordResetTokenScalarWhereInputObjectSchema), z.lazy(() => PasswordResetTokenScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => PasswordResetTokenScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => PasswordResetTokenScalarWhereInputObjectSchema), z.lazy(() => PasswordResetTokenScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  token: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  expiresAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
  used: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional()
}).strict();
export const PasswordResetTokenScalarWhereInputObjectZodSchema = z.object({
  AND: z.union([z.lazy(() => PasswordResetTokenScalarWhereInputObjectSchema), z.lazy(() => PasswordResetTokenScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => PasswordResetTokenScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => PasswordResetTokenScalarWhereInputObjectSchema), z.lazy(() => PasswordResetTokenScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  token: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  expiresAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
  used: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional()
}).strict();
