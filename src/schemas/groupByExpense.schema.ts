import { z } from 'zod';
import { ExpenseWhereInputObjectSchema } from './objects/ExpenseWhereInput.schema';
import { ExpenseOrderByWithAggregationInputObjectSchema } from './objects/ExpenseOrderByWithAggregationInput.schema';
import { ExpenseScalarWhereWithAggregatesInputObjectSchema } from './objects/ExpenseScalarWhereWithAggregatesInput.schema';
import { ExpenseScalarFieldEnumSchema } from './enums/ExpenseScalarFieldEnum.schema';
import { ExpenseCountAggregateInputObjectSchema } from './objects/ExpenseCountAggregateInput.schema';
import { ExpenseMinAggregateInputObjectSchema } from './objects/ExpenseMinAggregateInput.schema';
import { ExpenseMaxAggregateInputObjectSchema } from './objects/ExpenseMaxAggregateInput.schema';

export const ExpenseGroupBySchema = z.object({ where: ExpenseWhereInputObjectSchema.optional(), orderBy: z.union([ExpenseOrderByWithAggregationInputObjectSchema, ExpenseOrderByWithAggregationInputObjectSchema.array()]).optional(), having: ExpenseScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(ExpenseScalarFieldEnumSchema), _count: z.union([ z.literal(true), ExpenseCountAggregateInputObjectSchema ]).optional(), _min: ExpenseMinAggregateInputObjectSchema.optional(), _max: ExpenseMaxAggregateInputObjectSchema.optional() })