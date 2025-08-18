import { z } from 'zod';
import { ExpenseSelectObjectSchema } from './objects/ExpenseSelect.schema';
import { ExpenseCreateManyInputObjectSchema } from './objects/ExpenseCreateManyInput.schema'

export const ExpenseCreateManyAndReturnSchema = z.object({ select: ExpenseSelectObjectSchema.optional(), data: z.union([ ExpenseCreateManyInputObjectSchema, z.array(ExpenseCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict()