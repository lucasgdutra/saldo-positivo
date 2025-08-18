import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const UserMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput, Prisma.UserMinOrderByAggregateInput> = z.object({
  id: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  password: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  salaryRange: SortOrderSchema.optional(),
  usageMotivation: SortOrderSchema.optional(),
  customMotivation: SortOrderSchema.optional(),
  financialGoals: SortOrderSchema.optional(),
  hasDebts: SortOrderSchema.optional(),
  monthlyIncome: SortOrderSchema.optional(),
  familySize: SortOrderSchema.optional(),
  financialExperience: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const UserMinOrderByAggregateInputObjectZodSchema = z.object({
  id: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  password: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  salaryRange: SortOrderSchema.optional(),
  usageMotivation: SortOrderSchema.optional(),
  customMotivation: SortOrderSchema.optional(),
  financialGoals: SortOrderSchema.optional(),
  hasDebts: SortOrderSchema.optional(),
  monthlyIncome: SortOrderSchema.optional(),
  familySize: SortOrderSchema.optional(),
  financialExperience: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
