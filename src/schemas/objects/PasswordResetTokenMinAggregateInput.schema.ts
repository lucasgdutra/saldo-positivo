import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.literal(true).optional(),
  token: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  expiresAt: z.literal(true).optional(),
  used: z.literal(true).optional(),
  createdAt: z.literal(true).optional()
}).strict();
export const PasswordResetTokenMinAggregateInputObjectSchema: z.ZodType<Prisma.PasswordResetTokenMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.PasswordResetTokenMinAggregateInputType>;
export const PasswordResetTokenMinAggregateInputObjectZodSchema = makeSchema();
