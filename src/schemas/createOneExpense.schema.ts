import { z } from 'zod';
import { ExpenseSelectObjectSchema } from './objects/ExpenseSelect.schema';
import { ExpenseIncludeObjectSchema } from './objects/ExpenseInclude.schema';
import { ExpenseCreateInputObjectSchema } from './objects/ExpenseCreateInput.schema';
import { ExpenseUncheckedCreateInputObjectSchema } from './objects/ExpenseUncheckedCreateInput.schema';

export const ExpenseCreateOneSchema = z.object({ select: ExpenseSelectObjectSchema.optional(), include: ExpenseIncludeObjectSchema.optional(), data: z.union([ExpenseCreateInputObjectSchema, ExpenseUncheckedCreateInputObjectSchema])  })