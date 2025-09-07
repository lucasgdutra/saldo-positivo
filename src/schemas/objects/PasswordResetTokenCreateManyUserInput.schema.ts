import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  token: z.string(),
  expiresAt: z.date(),
  used: z.boolean().optional(),
  createdAt: z.date().optional()
}).strict();
export const PasswordResetTokenCreateManyUserInputObjectSchema: z.ZodType<Prisma.PasswordResetTokenCreateManyUserInput> = makeSchema() as unknown as z.ZodType<Prisma.PasswordResetTokenCreateManyUserInput>;
export const PasswordResetTokenCreateManyUserInputObjectZodSchema = makeSchema();
