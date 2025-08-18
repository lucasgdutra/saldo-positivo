import { z } from 'zod';
import { ExpenseSelectObjectSchema } from './objects/ExpenseSelect.schema';
import { ExpenseUpdateManyMutationInputObjectSchema } from './objects/ExpenseUpdateManyMutationInput.schema';
import { ExpenseWhereInputObjectSchema } from './objects/ExpenseWhereInput.schema'

export const ExpenseUpdateManyAndReturnSchema = z.object({ select: ExpenseSelectObjectSchema.optional(), data: ExpenseUpdateManyMutationInputObjectSchema, where: ExpenseWhereInputObjectSchema.optional()  }).strict()