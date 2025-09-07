import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema } from './UserArgs.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.boolean().optional(),
  token: z.boolean().optional(),
  userId: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  used: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional()
}).strict();
export const PasswordResetTokenSelectObjectSchema: z.ZodType<Prisma.PasswordResetTokenSelect> = makeSchema() as unknown as z.ZodType<Prisma.PasswordResetTokenSelect>;
export const PasswordResetTokenSelectObjectZodSchema = makeSchema();
