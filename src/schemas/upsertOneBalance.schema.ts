import { z } from 'zod';
import { BalanceSelectObjectSchema } from './objects/BalanceSelect.schema';
import { BalanceIncludeObjectSchema } from './objects/BalanceInclude.schema';
import { BalanceWhereUniqueInputObjectSchema } from './objects/BalanceWhereUniqueInput.schema';
import { BalanceCreateInputObjectSchema } from './objects/BalanceCreateInput.schema';
import { BalanceUncheckedCreateInputObjectSchema } from './objects/BalanceUncheckedCreateInput.schema';
import { BalanceUpdateInputObjectSchema } from './objects/BalanceUpdateInput.schema';
import { BalanceUncheckedUpdateInputObjectSchema } from './objects/BalanceUncheckedUpdateInput.schema'

export const BalanceUpsertSchema = z.object({ select: BalanceSelectObjectSchema.optional(), include: BalanceIncludeObjectSchema.optional(), where: BalanceWhereUniqueInputObjectSchema, create: z.union([ BalanceCreateInputObjectSchema, BalanceUncheckedCreateInputObjectSchema ]), update: z.union([ BalanceUpdateInputObjectSchema, BalanceUncheckedUpdateInputObjectSchema ])  })