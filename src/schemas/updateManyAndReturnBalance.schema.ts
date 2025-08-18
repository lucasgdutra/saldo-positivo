import { z } from 'zod';
import { BalanceSelectObjectSchema } from './objects/BalanceSelect.schema';
import { BalanceUpdateManyMutationInputObjectSchema } from './objects/BalanceUpdateManyMutationInput.schema';
import { BalanceWhereInputObjectSchema } from './objects/BalanceWhereInput.schema'

export const BalanceUpdateManyAndReturnSchema = z.object({ select: BalanceSelectObjectSchema.optional(), data: BalanceUpdateManyMutationInputObjectSchema, where: BalanceWhereInputObjectSchema.optional()  }).strict()