import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { CategoryOrderByRelationAggregateInputObjectSchema } from './CategoryOrderByRelationAggregateInput.schema';
import { ExpenseOrderByRelationAggregateInputObjectSchema } from './ExpenseOrderByRelationAggregateInput.schema';
import { RevenueOrderByRelationAggregateInputObjectSchema } from './RevenueOrderByRelationAggregateInput.schema';
import { BalanceOrderByWithRelationInputObjectSchema } from './BalanceOrderByWithRelationInput.schema';
import { PasswordResetTokenOrderByRelationAggregateInputObjectSchema } from './PasswordResetTokenOrderByRelationAggregateInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  password: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  salaryRange: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  usageMotivation: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  customMotivation: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  financialGoals: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  hasDebts: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  familySize: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  financialExperience: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  categories: z.lazy(() => CategoryOrderByRelationAggregateInputObjectSchema).optional(),
  expenses: z.lazy(() => ExpenseOrderByRelationAggregateInputObjectSchema).optional(),
  revenues: z.lazy(() => RevenueOrderByRelationAggregateInputObjectSchema).optional(),
  balance: z.lazy(() => BalanceOrderByWithRelationInputObjectSchema).optional(),
  passwordResetTokens: z.lazy(() => PasswordResetTokenOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const UserOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrderByWithRelationInput>;
export const UserOrderByWithRelationInputObjectZodSchema = makeSchema();
