import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BalanceWhereInputObjectSchema } from './BalanceWhereInput.schema';
import { BalanceUpdateWithoutUserInputObjectSchema } from './BalanceUpdateWithoutUserInput.schema';
import { BalanceUncheckedUpdateWithoutUserInputObjectSchema } from './BalanceUncheckedUpdateWithoutUserInput.schema'

export const BalanceUpdateToOneWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.BalanceUpdateToOneWithWhereWithoutUserInput, Prisma.BalanceUpdateToOneWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => BalanceWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => BalanceUpdateWithoutUserInputObjectSchema), z.lazy(() => BalanceUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const BalanceUpdateToOneWithWhereWithoutUserInputObjectZodSchema = z.object({
  where: z.lazy(() => BalanceWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => BalanceUpdateWithoutUserInputObjectSchema), z.lazy(() => BalanceUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
