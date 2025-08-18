import { z } from 'zod';
import { BalanceSelectObjectSchema } from './objects/BalanceSelect.schema';
import { BalanceIncludeObjectSchema } from './objects/BalanceInclude.schema';
import { BalanceWhereUniqueInputObjectSchema } from './objects/BalanceWhereUniqueInput.schema'

export const BalanceFindUniqueOrThrowSchema = z.object({ select: BalanceSelectObjectSchema.optional(), include: BalanceIncludeObjectSchema.optional(), where: BalanceWhereUniqueInputObjectSchema })