import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  familySize: SortOrderSchema.optional()
}).strict();
export const UserAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.UserAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.UserAvgOrderByAggregateInput>;
export const UserAvgOrderByAggregateInputObjectZodSchema = makeSchema();
