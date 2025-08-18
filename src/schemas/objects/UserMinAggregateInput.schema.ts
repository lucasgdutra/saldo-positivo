import { z } from 'zod';
import type { Prisma } from '@prisma/client';


export const UserMinAggregateInputObjectSchema: z.ZodType<Prisma.UserMinAggregateInputType, Prisma.UserMinAggregateInputType> = z.object({
  id: z.literal(true).optional(),
  email: z.literal(true).optional(),
  password: z.literal(true).optional(),
  name: z.literal(true).optional(),
  salaryRange: z.literal(true).optional(),
  usageMotivation: z.literal(true).optional(),
  customMotivation: z.literal(true).optional(),
  financialGoals: z.literal(true).optional(),
  hasDebts: z.literal(true).optional(),
  monthlyIncome: z.literal(true).optional(),
  familySize: z.literal(true).optional(),
  financialExperience: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const UserMinAggregateInputObjectZodSchema = z.object({
  id: z.literal(true).optional(),
  email: z.literal(true).optional(),
  password: z.literal(true).optional(),
  name: z.literal(true).optional(),
  salaryRange: z.literal(true).optional(),
  usageMotivation: z.literal(true).optional(),
  customMotivation: z.literal(true).optional(),
  financialGoals: z.literal(true).optional(),
  hasDebts: z.literal(true).optional(),
  monthlyIncome: z.literal(true).optional(),
  familySize: z.literal(true).optional(),
  financialExperience: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
