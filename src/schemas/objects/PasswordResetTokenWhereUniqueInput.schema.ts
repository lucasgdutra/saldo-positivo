import { z } from 'zod';
import type { Prisma } from '@prisma/client';


export const PasswordResetTokenWhereUniqueInputObjectSchema: z.ZodType<Prisma.PasswordResetTokenWhereUniqueInput, Prisma.PasswordResetTokenWhereUniqueInput> = z.object({
  id: z.string(),
  token: z.string()
}).strict();
export const PasswordResetTokenWhereUniqueInputObjectZodSchema = z.object({
  id: z.string(),
  token: z.string()
}).strict();
