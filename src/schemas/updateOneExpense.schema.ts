import { z } from 'zod';
import { ExpenseSelectObjectSchema } from './objects/ExpenseSelect.schema';
import { ExpenseIncludeObjectSchema } from './objects/ExpenseInclude.schema';
import { ExpenseUpdateInputObjectSchema } from './objects/ExpenseUpdateInput.schema';
import { ExpenseUncheckedUpdateInputObjectSchema } from './objects/ExpenseUncheckedUpdateInput.schema';
import { ExpenseWhereUniqueInputObjectSchema } from './objects/ExpenseWhereUniqueInput.schema'

export const ExpenseUpdateOneSchema = z.object({ select: ExpenseSelectObjectSchema.optional(), include: ExpenseIncludeObjectSchema.optional(), data: z.union([ExpenseUpdateInputObjectSchema, ExpenseUncheckedUpdateInputObjectSchema]), where: ExpenseWhereUniqueInputObjectSchema  })