import { z } from 'zod';
import { ExpenseSelectObjectSchema } from './objects/ExpenseSelect.schema';
import { ExpenseIncludeObjectSchema } from './objects/ExpenseInclude.schema';
import { ExpenseWhereUniqueInputObjectSchema } from './objects/ExpenseWhereUniqueInput.schema';

export const ExpenseFindUniqueSchema = z.object({ select: ExpenseSelectObjectSchema.optional(), include: ExpenseIncludeObjectSchema.optional(), where: ExpenseWhereUniqueInputObjectSchema })